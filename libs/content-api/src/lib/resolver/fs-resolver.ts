import type { Asset, Assets, Document, Logger, Model, User } from '@watheia/content-model';
import path from 'path';
import { version } from '../../../package.json';

import { ASSET_FILE_EXTENSIONS } from '@stackbit/sdk';
import { readDirRecursivelyWithExtensions } from '@stackbit/utils';
import { readFilesFromDirectory } from '../utils';
import {
  AssetContext,
  DocumentContext,
  convertAsset,
  convertDocument,
  getAssetDir,
} from './content-converter';

export type ContentResolverOptions = {
  /**
   * @type boolean
   * A boolean flag indicating if the content source is running in local
   * development mode using the `stackbit dev` command (true), or if it is
   * running in Stackbit cloud project (false).
   */
  localDev: boolean;
  /**
   * The root path of the project. Used to resolve relative paths in the
   * `contentDirs` option.
   */
  rootPath: string;

  /**
   * Array of content directories. Each directory is searched recursively
   * for content files.
   */
  contentDirs: string[];

  /**
   * Array of model objects used at this content source's schema.
   */
  models: Model[];

  /**
   * Array of locale objects to enable field-level localization.
   * One of the objects must be defined as `default: true`.
   */
  // locales?: Locale[];

  // /**
  //  * Assets loading and behavior configuration.
  //  */
  assetsConfig?: Assets;

  /**
   * @type Logger
   * A logger object used to log messages to the terminal console. Messages
   * logged with this logger will be shown in the console when running
   * `stackbit dev`. Use the `--log-level` argument to configure the log
   * levels printed by `stackbit dev`.
   *
   * Use this logger to debug the content source when working locally with
   * `stackbit dev`
   *
   * @example:
   * stackbit dev --log-level debug
   **/
  logger: Logger;
};

export class LocalContentResolver {
  private rootPath: string;
  private contentDirs: string[];
  private models: Model[];
  // private locales: Locale[];
  private assetsConfig?: Assets;
  private localDev!: boolean;

  private logger!: Logger;

  constructor(options: ContentResolverOptions) {
    this.rootPath = options.rootPath;
    this.contentDirs = options.contentDirs;
    this.models = options.models;
    // this.locales = options.locales ?? [];
    this.assetsConfig = options.assetsConfig;
    this.logger = options.logger.createLogger({ label: 'content-api' });
    this.localDev = options.localDev;
  }

  getVersion(): string {
    return version;
  }

  getEnvironment(): 'main' | 'preview' {
    return this.localDev ? 'preview' : 'main';
  }

  getModelByName(modelName: string): Model<unknown> | undefined {
    return this.models.find((m) => m.name === modelName);
  }

  getUrl(): string {
    return process.env['URL'] ?? process.env['VERCEL_URL'] ?? 'http://localhost:4200';
  }

  async getDocuments(): Promise<Document<DocumentContext>[]> {
    const documents: Document<DocumentContext>[] = [];
    for (const contentDir of this.contentDirs) {
      const contentDirPath = path.join(this.rootPath, contentDir);
      console.log('contentDirPath = ', contentDirPath);
      await readFilesFromDirectory(
        contentDirPath,
        this.logger,
        async (filePath, fullFilePath, data) => {
          console.log(`${fullFilePath} =>`, data);
          const document = await convertDocument({
            filePath: path.join(contentDir, filePath),
            fullFilePath,
            data,
            getModelByName: this.getModelByName.bind(this),
            assetsConfig: this.assetsConfig,
            // fileIdKey: this.fileIdKey,
            logger: this.logger,
          });
          if (!document) {
            this.logger.warn('Error converting file to document: ' + filePath);
            return;
          }
          documents.push(document);
        }
      );
    }
    return documents;
  }

  async getAssets(): Promise<Asset<AssetContext>[]> {
    if (!this.assetsConfig) {
      return [];
    }
    const assetsDir = getAssetDir(this.assetsConfig);
    const absAssetsDir = path.join(this.rootPath, assetsDir);
    const assetFilePaths = await readDirRecursivelyWithExtensions(
      absAssetsDir,
      ASSET_FILE_EXTENSIONS
    );
    const assets: Asset<AssetContext>[] = [];
    for (const assetFilePath of assetFilePaths) {
      assets.push(
        await convertAsset({
          assetFilePath: path.join(assetsDir, assetFilePath),
          absProjectDir: this.rootPath,
          assetsConfig: this.assetsConfig,
        })
      );
    }
    return assets;
  }

  async hasAccess(options: {
    userContext?: User;
  }): Promise<{ hasConnection: boolean; hasPermissions: boolean }> {
    return {
      hasConnection: true,
      hasPermissions: true,
    };
  }
}
