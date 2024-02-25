class ItemsView extends CompositeInterface {
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
        this.children.forEach(child => {
            this.nodeToRender.appendChild(child.render())
        })
    }
}
