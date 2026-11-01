import './sources.css';
import { ISource } from '../../../types/news-api';

class Sources {
    draw(data: ISource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl = sourceClone.querySelector('.source__item-name');
            const itemEl = sourceClone.querySelector('.source__item');
            if (!nameEl || !itemEl) {
                return;
            }

            nameEl.textContent = item.name;
            itemEl.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
