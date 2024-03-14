import { Field, Model } from '@watheia/content-model';
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

const EXPORT_KEYWORD = factory.createModifier(SyntaxKind.ExportKeyword);

const OPTIONAL_TOKEN = factory.createToken(SyntaxKind.QuestionToken);

// const READ_ONLY_MODIFIER = factory.createModifier(SyntaxKind.ReadonlyKeyword);

function union(...nodes: TypeNode[]) {
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

function getFieldType(field: Field): TypeNode {
  switch (field.type) {
    case 'boolean':
      return keywords.BOOLEAN;
    case 'color':
      return union(keywords.STRING, keywords.NUMBER);
    case 'cross-reference':
      return keywords.UNKNOWN;
    case 'date':
      return keywords.DATE;
    case 'datetime':
      return keywords.DATE;
    case 'enum':
      return keywords.UNKNOWN;
    case 'file':
      return keywords.UNKNOWN;
    case 'html':
      return keywords.STRING;
    case 'image':
      return keywords.STRING;
    case 'json':
      return keywords.UNKNOWN;
    case 'list':
      return keywords.UNKNOWN;
    case 'markdown':
      return keywords.STRING;
    case 'model':
      return keywords.UNKNOWN;
    case 'number':
      return keywords.NUMBER;
    case 'object':
      return keywords.UNKNOWN;
    case 'reference':
      return keywords.UNKNOWN;
    case 'richText':
      return keywords.STRING;
    case 'string':
      return keywords.STRING;
    case 'slug':
      return keywords.STRING;
    case 'style':
      return keywords.UNKNOWN;
    case 'text':
      return keywords.STRING;
    case 'url':
      return keywords.STRING;
    default:
      throw new Error(`Unsupported field detected: ${field}`);
  }
}

export function generateModelTypes(models: Model[]) {
  // transform field to property node
  const fieldTransformer = (field: Field) => {
    return createProperty(field.name, getFieldType(field), !!field.required);
  };

  // transform model to interface node
  const modelTransformer = (model: Model) => {
    const __metadata = createProperty(
      '__metadata',
      factory.createTypeLiteralNode([createProperty('modelType', createLiteral(model.type))])
    );
    const type = createProperty('type', createLiteral(model.name));
    const fields = (model.fields ?? []).map(fieldTransformer);
    return factory.createInterfaceDeclaration(
      [EXPORT_KEYWORD],
      model.name,
      undefined,
      undefined,
      [__metadata, type, ...fields]
    );
  };

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
