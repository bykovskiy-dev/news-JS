import News from './news/news';
import Sources from './sources/sources';
import {
    EverythingDrawCallback,
    IEverythingResponse,
    ISourcesResponse,
    SourcesDrawCallback,
} from '../../types/news-api';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews: EverythingDrawCallback = (data: IEverythingResponse): void => {
        const values: IEverythingResponse['articles'] = data.articles ?? [];
        this.news.draw(values);
    };

    public drawSources: SourcesDrawCallback = (data: ISourcesResponse): void => {
        const values: ISourcesResponse['sources'] = data.sources ?? [];
        this.sources.draw(values);
    };
}

export default AppView;
