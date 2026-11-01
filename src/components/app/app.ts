import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IEverythingResponse } from '../../types/news-api';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesEl = document.querySelector('.sources');
        if (!sourcesEl) {
            return;
        }

        sourcesEl.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: IEverythingResponse) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
