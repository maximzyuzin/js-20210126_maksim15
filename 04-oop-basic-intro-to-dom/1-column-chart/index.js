export default class ColumnChart {
    constructor({ data = [], label = '', value = 0, link = '' } = {}) {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;
        this.chartHeight = 50;
        this.element = this.render();
    }

    render() {
        let bodyChart = '';
        let classChart = '';

        if (this.data.length) {
            classChart = 'column-chart';

            const maxValue = Math.max(...this.data);
            const scale = this.chartHeight / maxValue;
            let value = 0;
            let percent = 0;

            for (const item of this.data) {
                value = Math.floor(item * scale);
                percent = (item / maxValue * 100).toFixed(0);
                bodyChart = `${bodyChart}<div style="--value: ${value}" data-tooltip="${percent}%"></div>`
            }
        } else {
            classChart = 'column-chart column-chart_loading';
        }

        let linkChart = '';
        if (this.link) linkChart = `<a href="${this.link}" class="column-chart__link">View all</a>`;

        const dashboardChart = document.createElement('DIV');

        dashboardChart.innerHTML = `
        <div class="${classChart}" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                Total ${this.label}
                ${linkChart}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.value}</div>
                <div data-element="body" class="column-chart__chart">
                ${bodyChart}
                </div>
            </div>
        </div>
        `;
        this.dashboardChart = dashboardChart.firstElementChild;

        return this.dashboardChart;
    }

    update(newData) {
        this.data = newData;
        this.render();
    }

    destroy() {
        this.remove();
    }

    remove() {
        this.element.remove();
    }
}
