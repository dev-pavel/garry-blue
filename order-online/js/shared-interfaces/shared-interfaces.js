const DEFAULT_QUANTITY = 1

const ERRORS = {
    MUST_BE_IMPLEMENTED: new Error('You must implement this method!')
}

class MenuItem {
    id = ''
    title = ''
    description = ''
    price = 0
    quantity = DEFAULT_QUANTITY
    imageURL = ''

    constructor(id, title, description, price, imageURL) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.imageURL = imageURL
    }
}

class ObservableInterface {
    observers = new Set()

    addObserver(observer) {
        this.observers.add(observer)
    }

    removeObserver(observer) {
        this.observers.delete(observer)
    }

    notifyObservers(newState) {
        this.observers.forEach(observer => {
            observer.update(newState)
        })
    }
}

class ObserverInterface {
    constructor(observable) {
        this.subject = observable
        this.subject.addObserver(this)
    }

    update(newState) {
        throw ERRORS.MUST_BE_IMPLEMENTED
    }
}

class CompositeInterface {
    children = null

    addChild(composite) {
        throw ERRORS.MUST_BE_IMPLEMENTED
    }

    render() {
        throw ERRORS.MUST_BE_IMPLEMENTED
    }
}