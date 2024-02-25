
class ControllerInterface {
    handleSubmit() {
        throw ERRORS.MUST_BE_IMPLEMENTED
    }

    handleInputChange() {
        throw ERRORS.MUST_BE_IMPLEMENTED
    }
}

class CartItemController extends ControllerInterface {
    constructor(model, view) {
        super()
        this.model = model
        this.view = view
    }

    handleSubmit(menuItemId) {
        this.model.removeFromCart(menuItemId)
    }

    handleInputChange(menuItemId, quantity) {
        let qnt = quantity

        if(!qnt) {
            if(confirm('Do you want to delete this item?')) {
                this.model.removeFromCart(menuItemId)
                return
            }
            qnt = 1
        }

        if (/^\d*$/.test(qnt)) {
            this.model.changeQuantityInCart(menuItemId, qnt)
            this.view.setInputValid()
        } else {
            this.view.setInputInvalid()
        }
    }
}

class AvailableItemController extends ControllerInterface {
    constructor(model, view) {
        super()
        this.model = model
        this.view = view
    }

    handleSubmit(menuItemId, quantity) {
        if (!!quantity && /^\d*$/.test(quantity)) {
            this.model.addToCart(menuItemId, quantity)
        } else {
            this.view.setInputInvalid()
        }
    }

    handleInputChange() {
        this.view.setInputValid()
    }
}