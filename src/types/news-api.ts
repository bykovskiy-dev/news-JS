export type ApiStatus = 'ok' | 'error';

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
