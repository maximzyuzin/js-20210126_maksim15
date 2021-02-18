import fetchJson from './utils/fetch-json.js';

const urlServer = 'https://course-js.javascript.ru';

export default class ColumnChart {
    subElements = {};
    chartHeight = 50;
    data = [];

    constructor({
        url = '',
        range = {
            from: new Date(),
            to: new Date(),
        },
        label = '',
        link = ''
    } = {}) {
        this.url = url;
        this.range = range;
        this.label = label;
        this.link = link;

        this.render();
    }

    getColumnHeader(data, label) {
        const value = data.reduce((sum, current) => sum + current, 0);

        return (label === 'sales') ? `$${value}` : value;
    }

    getColumnBody(data) {
        const maxValue = Math.max(...data);
        const scale = this.chartHeight / maxValue;

        return data
            .map(item => {
                const percent = (item / maxValue * 100).toFixed(0);

                return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
            })
            .join('');
    }

    getLink() {
        return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
    }

    get template() {
        return `
        <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
          <div class="column-chart__title">
            Total ${this.label}
            ${this.getLink()}
          </div>
          <div class="column-chart__container">
             <div data-element="header" class="column-chart__header">
             </div>
            <div data-element="body" class="column-chart__chart">
            </div>
          </div>
        </div>
      `;
    }

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.template;

        this.element = element.firstElementChild;

        this.subElements = this.getSubElements(this.element);

        this.update(this.range.from, this.range.to);
    }

    getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;
            return accum;
        }, {});
    }

    async update(from, to) {
        const urlAll = new URL(this.url, urlServer);
        urlAll.searchParams.set('from', from.toISOString());
        urlAll.searchParams.set('to', to.toISOString());

        const response = await fetchJson(urlAll);

        this.data = Object.values(response);

        this.element.classList.remove('column-chart_loading');

        this.subElements.header.innerHTML = this.getColumnHeader(this.data, this.label);
        this.subElements.body.innerHTML = this.getColumnBody(this.data);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.subElements = {};
    }
}