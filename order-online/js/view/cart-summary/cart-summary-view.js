class CartSummaryView extends CompositeInterface {
    children = []

    constructor(menuItems = [], nodeToRender) {
        super();
        this.nodeToRender = nodeToRender
        menuItems.forEach(menuItem => this.addChild(menuItem))
    }

    addChild(composite) {
        this.children.push(composite)
    }

    render() {
        const cartHeader = document.createElement('h4');
        cartHeader.className = 'd-flex justify-content-between align-items-center mb-3';

        const cartTitle = document.createElement('span');
        cartTitle.className = 'text-primary';
        cartTitle.textContent = 'Your cart';

        const itemsCountBadge = document.createElement('span');
        itemsCountBadge.className = 'badge bg-primary rounded-pill';
        itemsCountBadge.textContent = this.children.length;

        cartHeader.appendChild(cartTitle);
        cartHeader.appendChild(itemsCountBadge);

        const cartSummaryList = document.createElement('ul');
        cartSummaryList.className = 'list-group mb-3';
        cartSummaryList.id = 'cart-summary';

        const totalListItem = document.createElement('li');
        totalListItem.className = 'list-group-item d-flex justify-content-between';

        const totalTextSpan = document.createElement('span');
        totalTextSpan.textContent = 'Total';

        const totalAmountStrong = document.createElement('strong');
        totalAmountStrong.textContent = this.children.reduce((prev, current) => +current.getQuantity() * current.getPrice() + prev, 0).toFixed(2)

        totalListItem.appendChild(totalTextSpan);
        totalListItem.appendChild(totalAmountStrong);

        cartSummaryList.appendChild(totalListItem);

        const fragment = document.createDocumentFragment();

        fragment.appendChild(cartHeader);
        fragment.appendChild(cartSummaryList);

        this.nodeToRender.appendChild(fragment)

        this.children.forEach(child => {
            cartSummaryList.prepend(child.render())
        })
    }
}