import AppLoader from './appLoader';
import { IEverythingResponse, ISourcesResponse } from '../../types/news-api';

class AppController extends AppLoader {
    getSources(callback: (data: ISourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback as (data: unknown) => void
        );
    }

    getNews(e: Event, callback: (data: IEverythingResponse) => void): void {
        if (!(e.currentTarget instanceof Element)) {
            return;
        }

        let target: Element | null = e.target instanceof Element ? e.target : null;
        const newsContainer = e.currentTarget;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback as (data: unknown) => void
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
