class MenuItemView extends CompositeInterface {
    element

    constructor(menuItem, isInCart) {
        super();
        this.menuItem = menuItem
        this.isInCart = isInCart
    }

    setController(controller) {
        this.controller = controller
    }

    setInputInvalid() {
        const input = this.element.querySelector('input.quantity')
        input.classList.add('is-invalid')
    }

    setInputValid() {
        const input = this.element.querySelector('input.quantity')
        input.classList.remove('is-invalid')
    }

    render() {
        const outerDiv = document.createElement('div');
        outerDiv.className = 'col-6';

        const cardDiv = document.createElement('form');
        cardDiv.className = 'card mb-3';
        outerDiv.appendChild(cardDiv);

        const img = document.createElement('img');
        img.src = this.menuItem.imageURL;
        img.height = '200'
        img.style.objectFit = 'cover'
        img.className = 'card-img-top';
        img.alt = this.menuItem.title;
        cardDiv.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardDiv.appendChild(cardBody);

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = `${this.menuItem.title} ($${this.menuItem.price})`;
        cardBody.appendChild(cardTitle);

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = this.menuItem.description;
        cardBody.appendChild(cardText);

        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group mb-3';
        cardBody.appendChild(inputGroup);

        const inputGroupText = document.createElement('span');
        inputGroupText.className = 'input-group-text';
        inputGroupText.textContent = 'Qty';
        inputGroup.appendChild(inputGroupText);

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control quantity';
        input.placeholder = 'Quantity';
        input.name = 'quantity';
        input.value = this.menuItem.quantity
        inputGroup.appendChild(input);

        input.addEventListener('change', (e) => {
            this.controller.handleInputChange(this.menuItem.id, +e.target.value)
        })

        const button = document.createElement('button');
        button.className = `btn btn-${this.isInCart ? 'danger' : 'primary'} w-100`;
        button.textContent = this.isInCart ? 'Remove' : 'Add to Cart';
        button.type = 'submit'
        cardBody.appendChild(button);

        cardDiv.addEventListener('submit', (e) => {
            e.preventDefault()
            const quantity = e.target.elements['quantity'].value

            this.controller.handleSubmit(this.menuItem.id, quantity)
        })

        this.element = outerDiv
        return outerDiv
    }
}