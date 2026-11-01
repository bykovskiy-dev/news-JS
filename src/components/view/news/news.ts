import './news.css';
import newsPlaceholder from '../../../assets/news-placeholder.svg';
import { IArticle, NewsCardArticle } from '../../../types/news-api';

class News {
    private static readonly MAX_ITEMS = 10;

    public draw(data: IArticle[]): void {
        const newsContainer: Element | null = document.querySelector('.news');
        if (newsContainer === null) {
            return;
        }

        newsContainer.innerHTML = '';

        if (data.length === 0) {
            const emptyMessage: HTMLParagraphElement = document.createElement('p');
            emptyMessage.className = 'news__empty';
            emptyMessage.textContent = 'Have no news';
            newsContainer.appendChild(emptyMessage);
            return;
        }

        const news: NewsCardArticle[] =
            data.length >= News.MAX_ITEMS ? data.filter((_, idx) => idx < News.MAX_ITEMS) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: Element | null = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) {
            return;
        }

        news.forEach((item: NewsCardArticle, idx: number) => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const newsItem: Element | null = newsClone.querySelector('.news__item');
            const photoEl: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            const authorEl: Element | null = newsClone.querySelector('.news__meta-author');
            const dateEl: Element | null = newsClone.querySelector('.news__meta-date');
            const titleEl: Element | null = newsClone.querySelector('.news__description-title');
            const sourceEl: Element | null = newsClone.querySelector('.news__description-source');
            const contentEl: Element | null = newsClone.querySelector('.news__description-content');
            const readMoreEl: Element | null = newsClone.querySelector('.news__read-more a');

            if (
                newsItem === null ||
                photoEl === null ||
                authorEl === null ||
                dateEl === null ||
                titleEl === null ||
                sourceEl === null ||
                contentEl === null ||
                readMoreEl === null
            ) {
                return;
            }

            if (idx % 2) {
                newsItem.classList.add('alt');
            }

            photoEl.style.backgroundImage = `url(${item.urlToImage ?? newsPlaceholder})`;
            authorEl.textContent = item.author ?? item.source.name;
            dateEl.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            titleEl.textContent = item.title;
            sourceEl.textContent = item.source.name;
            contentEl.textContent = item.description;
            readMoreEl.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.appendChild(fragment);
    }
}

export default News;
