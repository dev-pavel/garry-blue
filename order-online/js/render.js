(async () => {
    const menuItemsJSON = await fetch('./js/menu-items.json');

    const menuItems = (await menuItemsJSON.json()).map(({id, title, description, price, imageURL}) => new MenuItem(id, title, description, price, imageURL))

    const rootModel = new RootModel([], menuItems)
    const rootView = new RootView(rootModel)

    rootView.render()
})()