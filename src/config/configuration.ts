import { get } from 'env-var';

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
  origin?: string;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface ImportConfig {
  url: string;
}

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  import: ImportConfig;
}

const config: Config = {
  nest: {
    port: get('PORT').default(8000).asIntPositive(),
  },
  cors: {
    enabled: get('CORS_ENABLED').default('true').asBoolStrict(),
    origin: get('CORS_ORIGIN').default('*').asString(),
  },
  swagger: {
    enabled: get('SWAGGER_ENABLED').default('true').asBoolStrict(),
    title: get('SWAGGER_TITLE').default('Book Store').asString(),
    description: get('SWAGGER_DESCRIPTION').default('The Swagger API for Book Store').asString(),
    version: get('SWAGGER_VERSION').default('1.0').asString(),
    path: get('SWAGGER_PATH').default('swagger').asString(),
  },
  import: {
    url: get('IMPORT_ENDPOINT_URL').required().asUrlString(),
  },
};

export default (): Config => config;
