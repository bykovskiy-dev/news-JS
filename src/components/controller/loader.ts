import {
    ApiEndpoint,
    ApiQueryParams,
    ApiResponseByEndpoint,
    HttpMethod,
    ReadonlyApiCredentials,
} from '../../types/news-api';

interface GetRespParams<E extends ApiEndpoint> {
    endpoint: E;
    options?: ApiQueryParams;
}

type ResponseCallback<TResponse> = (data: TResponse) => void;

class Loader {
    private readonly baseLink: string;
    private readonly options: ReadonlyApiCredentials;

    public constructor(baseLink: string, options: ReadonlyApiCredentials) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<E extends ApiEndpoint>(
        { endpoint, options = {} }: GetRespParams<E>,
        callback: ResponseCallback<ApiResponseByEndpoint[E]> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: ApiQueryParams, endpoint: ApiEndpoint): string {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            const value: string | undefined = urlOptions[key];
            if (value !== undefined) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<TResponse>(
        method: HttpMethod,
        endpoint: ApiEndpoint,
        callback: ResponseCallback<TResponse>,
        options: ApiQueryParams = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<TResponse>)
            .then((data: TResponse) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
