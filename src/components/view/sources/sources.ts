import './sources.css';
import { ISource } from '../../../types/news-api';

class Sources {
    public draw(data: ISource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: Element | null = document.querySelector('#sourceItemTemp');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            return;
        }

        data.forEach((item: ISource) => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl: Element | null = sourceClone.querySelector('.source__item-name');
            const itemEl: Element | null = sourceClone.querySelector('.source__item');
            if (nameEl === null || itemEl === null) {
                return;
            }

            nameEl.textContent = item.name;
            itemEl.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer: Element | null = document.querySelector('.sources');
        if (sourcesContainer !== null) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
