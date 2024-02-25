class CartSummaryItemView extends CompositeInterface {
    constructor(menuItem) {
        super();
        this.menuItem = menuItem
    }

    getQuantity() {
        return this.menuItem.quantity
    }

    getPrice() {
        return this.menuItem.price
    }

    render() {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between lh-sm';

        const divContainer = document.createElement('div');

        const title = document.createElement('h6');
        title.className = 'my-0';
        title.textContent = this.menuItem.title;

        const description = document.createElement('small');
        description.className = 'text-muted';
        description.textContent = this.menuItem.description;

        divContainer.appendChild(title);
        divContainer.appendChild(description);

        const price = document.createElement('span');
        price.className = 'text-muted';
        price.textContent = `${this.menuItem.quantity} * $${this.menuItem.price}`;

        listItem.appendChild(divContainer);
        listItem.appendChild(price);

        return listItem
    }
}