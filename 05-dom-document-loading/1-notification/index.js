export default class NotificationMessage {
    static component = null;

    constructor(message = '', {
        duration = 0,
        type = ''
    } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        this.render();
    }

    render() {
        const element = document.createElement('DIV');
        element.innerHTML = this.template;
        this.element = element.firstElementChild;
    }

    get template() {
        return `
        <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.message}
                </div>
                </div>
        </div>
        `;
    }

    show(targetElement) {
        if (NotificationMessage.component) NotificationMessage.component.remove();

        if (targetElement) targetElement.append(this.element);
        else document.body.append(this.element);

        NotificationMessage.component = this.element;

        setTimeout(() => this.remove(), this.duration);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        NotificationMessage.component = null;
    }
}