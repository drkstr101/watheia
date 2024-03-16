import {
  Field,
  FieldEnum,
  FieldList,
  FieldModel,
  FieldObject,
  FieldReference,
  Model,
} from '@watheia/content-model';
import sortBy from 'lodash/sortBy';
import {
  ListFormat,
  ScriptKind,
  ScriptTarget,
  SyntaxKind,
  TypeNode,
  createPrinter,
  createSourceFile,
  factory,
} from 'typescript';

import * as keywords from './keywords';

type FieldType = Field['type'];

const EXPORT_KEYWORD = factory.createModifier(SyntaxKind.ExportKeyword);

const OPTIONAL_TOKEN = factory.createToken(SyntaxKind.QuestionToken);

// const READ_ONLY_MODIFIER = factory.createModifier(SyntaxKind.ReadonlyKeyword);

function createUnion(...nodes: TypeNode[]) {
  return factory.createUnionTypeNode(nodes);
}

function createProperty(name: string, type: TypeNode, required = true) {
  return factory.createPropertySignature(
    undefined,
    name,
    required ? undefined : OPTIONAL_TOKEN,
    type
  );
}

function createLiteral(value: string | number) {
  const literal =
    typeof value === 'string'
      ? factory.createStringLiteral(value, true)
      : factory.createNumericLiteral(value);
  return factory.createLiteralTypeNode(literal);
}

function createMetadataProperty(model: Model) {
  const properties = [createProperty('modelType', createLiteral(model.type))];
  // append id prop for data/page types
  if (model.type === 'data' || model.type === 'page') {
    properties.push(createProperty('id', keywords.STRING));
  }

  // append urlPath prop for page types
  if (model.type === 'page') {
    properties.push(createProperty('urlPath', keywords.STRING));
  }

  return createProperty('__metadata', factory.createTypeLiteralNode(properties));
}

function createObjectType(field: FieldObject): TypeNode {
  return factory.createTypeLiteralNode(field.fields.map(fieldTransformer));
}

function createEnumType(field: FieldEnum): TypeNode {
  return factory.createUnionTypeNode(
    field.options.map((f) => {
      if (typeof f === 'string') {
        return createLiteral(f);
      } else if (typeof f === 'number') {
        return createLiteral(f);
      }

      return createLiteral(f.value);
    })
  );
}

function createModelType(field: FieldModel): TypeNode {
  return factory.createUnionTypeNode(
    field.models.map((name) => factory.createTypeReferenceNode(name))
  );
}

function createReferenceType(field: FieldReference): TypeNode {
  return factory.createUnionTypeNode(
    field.models.map((name) => factory.createTypeReferenceNode(name))
  );
}

function createListType(field: FieldList): TypeNode {
  // since we do not actually need a name to determine a field's type, we can
  // simulate one here to reuse our field type transformer code on the list items
  const items = { name: 'UNSPECIFIED', ...field.items };
  return factory.createArrayTypeNode(getFieldType(items));
}

function getFieldType(field: Field): TypeNode {
  switch (field.type) {
    case 'boolean':
      return keywords.BOOLEAN;
    case 'color':
      return createUnion(keywords.STRING, keywords.NUMBER);
    case 'cross-reference':
      return keywords.UNKNOWN;
    case 'date':
      return keywords.DATE;
    case 'datetime':
      return keywords.DATE;
    case 'enum':
      return createEnumType(field);
    case 'file':
      return keywords.UNKNOWN;
    case 'html':
      return keywords.STRING;
    case 'image':
      return keywords.STRING;
    case 'json':
      return keywords.UNKNOWN;
    case 'list':
      return createListType(field);
    case 'markdown':
      return keywords.STRING;
    case 'model':
      return createModelType(field);
    case 'number':
      return keywords.NUMBER;
    case 'object':
      return createObjectType(field);
    case 'reference':
      return createReferenceType(field);
    case 'richText':
      return keywords.STRING;
    case 'string':
      return keywords.STRING;
    case 'slug':
      return keywords.STRING;
    case 'style':
      // type: Record<string, Record<string, unkown>>
      return factory.createTypeReferenceNode('Record', [
        keywords.STRING,
        factory.createTypeReferenceNode('Record', [keywords.STRING, keywords.UNKNOWN]),
      ]);
    case 'text':
      return keywords.STRING;
    case 'url':
      return keywords.STRING;
    default:
      throw new Error(`Unsupported field detected: ${field}`);
  }
}

function modelTransformer(model: Model) {
  const __metadata = createMetadataProperty(model);
  const type = createProperty('type', createLiteral(model.name));
  const fields = (model.fields ?? []).map(fieldTransformer);
  return factory.createInterfaceDeclaration([EXPORT_KEYWORD], model.name, undefined, undefined, [
    __metadata,
    type,
    ...fields,
  ]);
}

function fieldTransformer(field: Field) {
  return createProperty(field.name, getFieldType(field), !!field.required);
}

export function generateModelTypes(models: Model[]) {
  const nodes = factory.createNodeArray(sortBy(models, (m) => m.name).map(modelTransformer));
  const sourceFile = createSourceFile(
    'placeholder.ts',
    '',
    ScriptTarget.ESNext,
    true,
    ScriptKind.TS
  );

  return createPrinter().printList(ListFormat.MultiLine, nodes, sourceFile);
}
