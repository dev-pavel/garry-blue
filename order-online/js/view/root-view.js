class RootViewObserver extends ObserverInterface {
}

class RootViewComposite extends RootViewObserver {
}

class RootView extends RootViewComposite {
    availableItemsView
    cartItemsView

    cartContainer = document.getElementById('cart-items')
    availableContainer = document.getElementById('available-items')
    cartSummaryContainer = document.getElementById('cart-summary')

    constructor(model) {
        super(model)
        this.model = model
    }

    renderCartItems() {
        const cartItems = this.model.getCartItems()
            .map(cartItem => {
                const menuItemView = new MenuItemView(cartItem, true)
                const cartItemController = new CartItemController(this.model, menuItemView)
                menuItemView.setController(cartItemController)

                return menuItemView
            })

        this.cartContainer.innerHTML = ''
        this.cartItemsView = new ItemsView(cartItems, this.cartContainer)
        this.cartItemsView.render()
    }

    renderAvailableItems() {
        const availableItems = this.model.getAvailableItems()
            .map(cartItem => {
                const menuItemView = new MenuItemView(cartItem, false)
                const availableItemController = new AvailableItemController(this.model, menuItemView)
                menuItemView.setController(availableItemController)

                return menuItemView
            })

        this.availableContainer.innerHTML = ''
        this.availableItemsView = new ItemsView(availableItems, this.availableContainer)
        this.availableItemsView.render()
    }

    renderSummaryView() {
        const cartItems = this.model.getCartItems()
            .map(cartItem => new CartSummaryItemView(cartItem))

        this.cartSummaryContainer.innerHTML = ''
        this.cartSummaryView = new CartSummaryView(cartItems, this.cartSummaryContainer)
        this.cartSummaryView.render()
    }

    render() {
        this.renderCartItems()
        this.renderAvailableItems()
        this.renderSummaryView()
    }

    update() {
        this.render()
    }
}
