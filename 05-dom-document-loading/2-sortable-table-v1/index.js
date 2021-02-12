export default class SortableTable {
    subElements = {};

    constructor(header, {
        data = []
    } = {}) {
        this.header = header;
        this.data = data;

        this.render();
    }

    render() {
        const element = document.createElement('DIV');
        element.innerHTML = this.template;
        this.element = element.firstElementChild;

        this.subElements = this.getSubElements(this.element);
    }

    get template() {
        return `
        <div data-element="productsContainer" class="products-list__container">
            <div class="sortable-table">

                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.getHeader(this.header)}
                </div>

                <div data-element="body" class="sortable-table__body">
                    ${this.getBody(this.data)}
                </div>

                <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

                <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                    <div>
                        <p>No products satisfies your filter criteria</p>
                        <button type="button" class="button-primary-outline">Reset all filters</button>
                    </div>
                </div>

            </div>
        </div>
        `;
    }

    getHeader(dataHeader) {
        return dataHeader
            .map(({
                id = '',
                title = '',
                sortable = false
            }) => {
                return `
                <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="">
                    <span>${title}</span>
                </div>
                `;
            })
            .join('');
    }

    getBody(dataBody) {
        return dataBody
            .map(item => {
                const rowsBody = this.header
                    .map(({
                        id = '',
                        template = null
                    }) => {
                        if (template) return template(item[id]);
                        return `<div class="sortable-table__cell">${item[id]}</div>`;
                    })
                    .join('');
                return `
                <a href="/products/${item["id"]}" class="sortable-table__row">
                    ${rowsBody}
                </a>
                `;
            })
            .join('');
    }

    getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');
        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;
            return accum;
        }, {});
    }

    sort(fieldValue, orderValue) {
        const header = this.header.find(item => item.id === fieldValue);
        if (!header.sortable) return;

        const direction = (orderValue === 'asc') ? 1 : (-1);

        const optionSort = {
            string: (str1, str2) => str1.localeCompare(str2, 'ru-en', { caseFirst: 'upper' }),
            number: (str1, str2) => str1 - str2
        }

        const formulaSort = optionSort[header.sortType];

        const dataSort = [...this.data].sort((string1, string2) =>
            formulaSort(string1[fieldValue], string2[fieldValue]) * direction);

        this.subElements.body.innerHTML = this.getBody(dataSort);

        // На заголовок столбца (header), по которому проходит сортировка,
        // добавляется в атрибут data-order="" значение сортировки - asc или desc
        const columns = this.subElements.header.querySelectorAll('[data-order]');

        for (const column of columns) {
            if (column.dataset.id === header.id) column.dataset.order = orderValue;
            else column.dataset.order = '';
        }
    }

    remove() {
        this.element.remove()
    }

    destroy() {
        this.remove();
        this.subElements = {};
    }
}