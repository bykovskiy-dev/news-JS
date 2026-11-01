import News from './news/news';
import Sources from './sources/sources';
import { IEverythingResponse, ISourcesResponse } from '../../types/news-api';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IEverythingResponse): void {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISourcesResponse): void {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
