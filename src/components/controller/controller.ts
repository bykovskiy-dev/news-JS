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
        const sourcesRoot: Element = e.currentTarget;

        while (target !== null && target !== sourcesRoot) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId === null) {
                    return;
                }

                const previousSource: string | null = sourcesRoot.getAttribute('data-source');
                this.setActiveSource(sourcesRoot, sourceId);

                if (previousSource !== sourceId) {
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

    private setActiveSource(sourcesRoot: Element, sourceId: string): void {
        sourcesRoot.setAttribute('data-source', sourceId);

        const items: NodeListOf<Element> = sourcesRoot.querySelectorAll('.source__item');
        items.forEach((item: Element) => {
            const isActive: boolean = item.getAttribute('data-source-id') === sourceId;
            item.classList.toggle('source__item--active', isActive);
            if (isActive) {
                item.setAttribute('aria-current', 'true');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                item.removeAttribute('aria-current');
            }
        });
    }
}

export default AppController;
