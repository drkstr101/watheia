import { factory, SyntaxKind } from 'typescript';

export const BOOLEAN = factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);

export const DATE = factory.createTypeReferenceNode('Date');

export const NUMBER = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);

export const STRING = factory.createKeywordTypeNode(SyntaxKind.StringKeyword);

export const UNKNOWN = factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
