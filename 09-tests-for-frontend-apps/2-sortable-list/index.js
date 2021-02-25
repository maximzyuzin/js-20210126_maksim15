export default class SortableList {
   element;
   dragElement;
   placeholderElement;

   constructor({ items = [] } = {}) {
      this.items = items;

      this.render();
      this.initEventListeners();
   }

   render() {
      const element = document.createElement('UL');
      element.classList.add('sortable-list');

      this.items.forEach(item => item.classList.add('sortable-list__item'));
      element.append(...this.items);

      this.element = element;

      return this.element;
   }

   initEventListeners() {
      this.element.addEventListener('pointerdown', this.dragStart);
      this.element.addEventListener('pointerdown', this.deleteItem);
   }

   dragStart = (event) => {
      event.preventDefault();
      if (event.which !== 1) return;

      const elem = event.target.closest('.sortable-list__item');

      if ('grabHandle' in event.target.dataset) {
         this.getDragElement(elem, event);
      }
   }

   getDragElement(elem, event) {
      this.dragElement = elem;

      const size = this.dragElement.getBoundingClientRect();
      this.shiftX = event.clientX - size.left;
      this.shiftY = event.clientY - size.top;

      this.placeholderElement = this.createPlaceholderElement(size);

      this.dragElement.classList.add('sortable-list__item_dragging');
      this.dragElement.style.width = `${size.width}px`;
      this.dragElement.style.height = `${size.height}px`;

      this.dragElement.replaceWith(this.placeholderElement);

      this.element.append(this.dragElement);

      this.moveAt(event);

      document.addEventListener('pointermove', this.moveDragElement);
      document.addEventListener('pointerup', this.dragStop);
   }

   createPlaceholderElement(size) {
      const elem = document.createElement('DIV');
      elem.classList.add('sortable-list__placeholder');
      elem.style.width = `${size.width}px`;
      elem.style.height = `${size.height}px`;

      return elem;
   }

   moveAt(event) {
      this.dragElement.style.left = event.clientX - this.shiftX + 'px';
      this.dragElement.style.top = event.clientY - this.shiftY + 'px';
   }

   moveDragElement = (event) => {
      this.moveAt(event);

      const prevElem = this.placeholderElement.previousElementSibling;
      const nextElem = this.placeholderElement.nextElementSibling;

      if (prevElem) {
         const middlePrevElem = prevElem.getBoundingClientRect().top + prevElem.getBoundingClientRect().height / 2;

         if (event.clientY < middlePrevElem)
            return prevElem.before(this.placeholderElement);
      }

      if (nextElem) {
         const middleNextElem = nextElem.getBoundingClientRect().top + nextElem.getBoundingClientRect().height / 2;

         if (event.clientY > middleNextElem)
            return nextElem.after(this.placeholderElement);
      }
   }

   dragStop = () => {
      this.dragElement.style.cssText = '';
      this.dragElement.classList.remove('sortable-list__item_dragging');
      this.placeholderElement.replaceWith(this.dragElement);

      this.removeEventListeners();
   }

   removeEventListeners() {
      document.removeEventListener('pointermove', this.moveDragElement);
      document.removeEventListener('pointerup', this.dragStop);
   }

   deleteItem(event) {
      event.preventDefault();
      if (event.which !== 1) return;

      const elem = event.target.closest('.sortable-list__item');

      if ('deleteHandle' in event.target.dataset) {
         elem.remove();
      }
   }

   remove() {
      this.element.remove();
   }

   destroy() {
      this.remove();
      this.removeEventListeners();
      this.dragElement = null;
      this.placeholderElement = null;
   }
}