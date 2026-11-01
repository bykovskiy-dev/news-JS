import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { EverythingDrawCallback } from '../../types/news-api';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesEl: Element | null = document.querySelector('.sources');
        if (sourcesEl === null) {
            return;
        }

        const onNewsLoaded: EverythingDrawCallback = (data) => this.view.drawNews(data);

        sourcesEl.addEventListener('click', (e: Event) => this.controller.getNews(e, onNewsLoaded));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
