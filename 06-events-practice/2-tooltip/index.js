class Tooltip {
    static singleInstance;

    constructor() {
        if (!Tooltip.singleInstance) {
            Tooltip.singleInstance = this;
        } else {
            return Tooltip.singleInstance;
        }
    }

    render(textTooltip) {
        const element = document.createElement('DIV');
        element.className = 'tooltip';
        element.innerHTML = textTooltip;
        
        this.element = element;
        document.body.append(this.element);
    }

    initialize() {
        document.addEventListener('pointerover', this.startTooltip);
        document.addEventListener('pointerout', this.stopTooltip);
    }

    startTooltip = (event) => {
        const element = event.target.closest('[data-tooltip]');
        if (element) {
            this.render(element.dataset.tooltip);
            document.addEventListener('pointermove', this.moveTooltip);
        }
    }

    stopTooltip = () => {
        if (this.element) {
            this.remove();
        }
    }

    moveTooltip = (event) => {
        this.element.style.left = `${event.clientX + 15}px`;
        this.element.style.top = `${event.clientY + 15}px`;
    }

    remove() {
        if (this.element) {
            this.element.remove();
            this.element = null;
            document.removeEventListener('pointermove', this.moveTooltip);
        }
    }

    destroy() {
        this.remove();
        document.removeEventListener('pointerover', this.startTooltip);
        document.removeEventListener('pointerout', this.stopTooltip);
        document.removeEventListener('pointermove', this.moveTooltip);
    }    
}

const tooltip = new Tooltip();

export default tooltip;