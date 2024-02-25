class RootModel extends ObservableInterface {
    cartItems = []
    availableItems = []

    constructor(cartItems, availableItems) {
        super();
        this.cartItems = cartItems
        this.availableItems = availableItems
    }

    addToCart(itemId, quantity) {
        const itemIndex = this.availableItems.findIndex(availableItem => availableItem.id === itemId)
        this.availableItems[itemIndex].quantity = quantity
        this.cartItems.push(this.availableItems[itemIndex])
        this.availableItems.splice(itemIndex, 1)
        this.notifyObservers()
    }

    removeFromCart(itemId) {
        const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === itemId)
        this.cartItems[itemIndex].quantity = DEFAULT_QUANTITY
        this.availableItems.push(this.cartItems[itemIndex])
        this.cartItems.splice(itemIndex, 1)
        this.notifyObservers()
    }

    changeQuantityInCart(itemId, quantity) {
        const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === itemId)
        this.cartItems[itemIndex].quantity = quantity
        this.notifyObservers()
    }

    getCartItems() {
        return this.cartItems
    }

    getAvailableItems() {
        return this.availableItems
    }
}