import AppLoader from './appLoader';
import { ApiEndpoint, EverythingDrawCallback, SourcesDrawCallback } from '../../types/news-api';

class AppController extends AppLoader {
    public getSources(callback: SourcesDrawCallback): void {
        super.getResp(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: EverythingDrawCallback): void {
        if (!(e.currentTarget instanceof Element)) {
            return;
        }

        let target: Element | null = e.target instanceof Element ? e.target : null;
        const newsContainer: Element = e.currentTarget;

        while (target !== null && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: ApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
