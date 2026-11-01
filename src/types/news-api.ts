export enum ApiStatus {
    Ok = 'ok',
    Error = 'error',
}

export enum HttpMethod {
    GET = 'GET',
}

export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface ISource {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface ISourcesResponse {
    status: ApiStatus;
    sources: ISource[];
}

export interface IArticleSource {
    id: string | null;
    name: string;
}

export interface IArticle {
    source: IArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content?: string | null;
}

export interface IEverythingResponse {
    status: ApiStatus;
    totalResults: number;
    articles: IArticle[];
}

export type ApiResponseByEndpoint = {
    [ApiEndpoint.Sources]: ISourcesResponse;
    [ApiEndpoint.Everything]: IEverythingResponse;
};

export type ApiQueryParams = Partial<Record<string, string>>;

export type ReadonlyApiCredentials = Readonly<{
    apiKey: string;
}>;

export type NewsCardArticle = Pick<
    IArticle,
    'title' | 'description' | 'url' | 'urlToImage' | 'author' | 'publishedAt' | 'source'
>;

export type SourcesDrawCallback = (data: ISourcesResponse) => void;
export type EverythingDrawCallback = (data: IEverythingResponse) => void;

export type ApiErrorStatus = 401 | 404;
