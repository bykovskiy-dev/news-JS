import Loader from './loader';
import { PROXY_API_BASE_URL } from '../../config/api-config';
import { ReadonlyApiCredentials } from '../../types/news-api';

class AppLoader extends Loader {
    public constructor() {
        const apiUrl: string = process.env.API_URL || PROXY_API_BASE_URL;
        const credentials: ReadonlyApiCredentials = {
            apiKey: process.env.API_KEY ?? '',
        };

        super(apiUrl, credentials);
    }
}

export default AppLoader;
