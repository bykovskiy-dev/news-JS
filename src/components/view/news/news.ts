import './news.css';
import { IArticle } from '../../../types/news-api';

class News {
    draw(data: IArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem = newsClone.querySelector('.news__item');
            const photoEl = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            const authorEl = newsClone.querySelector('.news__meta-author');
            const dateEl = newsClone.querySelector('.news__meta-date');
            const titleEl = newsClone.querySelector('.news__description-title');
            const sourceEl = newsClone.querySelector('.news__description-source');
            const contentEl = newsClone.querySelector('.news__description-content');
            const readMoreEl = newsClone.querySelector('.news__read-more a');

            if (!newsItem || !photoEl || !authorEl || !dateEl || !titleEl || !sourceEl || !contentEl || !readMoreEl) {
                return;
            }

            if (idx % 2) newsItem.classList.add('alt');

            photoEl.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            authorEl.textContent = item.author || item.source.name;
            dateEl.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            titleEl.textContent = item.title;
            sourceEl.textContent = item.source.name;
            contentEl.textContent = item.description;
            readMoreEl.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
