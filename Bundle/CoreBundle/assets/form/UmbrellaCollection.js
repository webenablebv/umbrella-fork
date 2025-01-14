import dragula from 'dragula';

export default class UmbrellaCollection extends HTMLElement {

    constructor() {
        super();

        this._prototype = this.dataset.prototype;
        this._prototype_name = this.dataset.prototypeName
        this.index = parseInt(this.dataset.index)
        this.maxLength = parseInt(this.dataset.maxLength)
        this.sortable = this.dataset.sortable === 'true'

        // If the parent has child umbrella collections we always take the last element because this is the correct button from the nodelist
        const addButtons = this.querySelectorAll('.js-add-item');
        this.addAction = addButtons[addButtons.length - 1];

        this.deleteActions = this.querySelectorAll('.js-del-item')

        const containers = this.querySelectorAll('.js-item-container');

        if (containers.length > 0) {

            this.itemsContainer = containers[0];
        }

        // console.log(this.itemsContainer);

        // this.itemsContainer = this.querySelector('.js-item-container')
    }

    connectedCallback() {
        this._updateAddAction();

        if (this.addAction) {
            this.addAction.addEventListener('click', e => {
                e.preventDefault();
                this.addRow();
            })
        }

        this.deleteActions.forEach(e => e.addEventListener('click', e => {
            e.preventDefault();
            this.deleteRow(e.target.closest('.js-item'));
        }))

        if (this.sortable) {
            // console.log(this.itemsContainer);
            dragula({
                containers: [this.itemsContainer],
                moves: function (el, source, handle, sibling) {
                    let hasCorrectParent = handle.closest('tbody') == source;
                    // return handle.classList.contains('js-drag-handle') || handle.parentNode.classList.contains('js-drag-handle');
                    return handle.classList.contains('js-drag-handle') || handle.parentNode.classList.contains('js-drag-handle') && hasCorrectParent;
                },
                mirrorContainer: this.itemsContainer
            });
        }
    }

    deleteRow(row) {
        row.remove()
        this._updateAddAction()
    }

    addRow() {
        this.index += 1;
        const regexp = new RegExp(this._prototype_name, 'g');

        const template = document.createElement('tbody')
        template.innerHTML = this._prototype.replace(regexp, this.index.toString())

        const rowElement = template.firstChild
        const delAction = rowElement.querySelector('.js-del-item')

        if (delAction) {
            delAction.addEventListener('click', (e) => {
                e.preventDefault()
                this.deleteRow(rowElement)
            })
        }

        this.dataset.index = this.index.toString()
        this.itemsContainer.appendChild(rowElement)
        this._updateAddAction()
    }

    count() {
        return this.itemsContainer.querySelectorAll('.js-item').length
    }

    _updateAddAction() {
        if (this.maxLength > 0) {
            this.addAction.classList.toggle('d-none', this.count() >= this.maxLength)
        }
    }
}
