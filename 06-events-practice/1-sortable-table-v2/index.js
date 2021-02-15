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

        this.addEventsHeader(this.subElements.header);

        this.sortDefault();
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
                    <span data-element="arrow" class="sortable-table__sort-arrow">
                        <span class="sort-arrow"></span>
                    </span>
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
                        return (template) ? template(item[id]) : `<div class="sortable-table__cell">${item[id]}</div>`;
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

    sortDefault() {
        const fieldDefault = this.header.find(item => item.sortable === true);
        const orderDefault = 'asc';
        this.sort(fieldDefault.id, orderDefault);
    }

    sort(fieldValue, orderValue) {
        const arr = [...this.data];
        const columnHeader = this.header.find(item => item.id === fieldValue);
        if (!columnHeader.sortable) return;

        const direction = (orderValue === 'asc') ? 1 : (-1);

        const { sortType, customSorting } = columnHeader;

        const dataSort = arr.sort((str1, str2) => {
            switch (sortType) {
                case 'number':
                    return direction * (str1[fieldValue] - str2[fieldValue]);
                case 'string':
                    return direction * str1[fieldValue].localeCompare(str2[fieldValue], 'ru-en', { caseFirst: 'upper' });
                case 'custom':
                    return direction * customSorting(str1, str2);
                default:
                    return direction * (str1[fieldValue] - str2[fieldValue]);
            }
        });

        this.subElements.body.innerHTML = this.getBody(dataSort);

        // На заголовок столбца (header), по которому проходит сортировка,
        // добавляется в атрибут data-order="" значение сортировки - asc или desc
        const allColumns = this.subElements.header.querySelectorAll('[data-order]');

        for (const currentColumn of allColumns) {
            if (currentColumn.dataset.id === columnHeader.id) currentColumn.dataset.order = orderValue;
            else currentColumn.dataset.order = '';
        }
    }

    addEventsHeader(header) {
        header.addEventListener('pointerdown', (event) => {
            const cellHeader = event.target.closest('[data-sortable="true"]');
            if (cellHeader) {
                const fieldValue = cellHeader.dataset.id;
                const orderValue = (cellHeader.dataset.order === 'desc') ? 'asc' : 'desc';
                this.sort(fieldValue, orderValue);
            }
        });
    }

    remove() {
        this.element.remove()
    }

    destroy() {
        this.remove();
        this.subElements = {};
    }
}