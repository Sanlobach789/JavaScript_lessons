"use strict"


const items = [
    {
        id: 0,
        name: 'Помидор',
        price: 30,
        inStock: 100 //В наличие
    },
    {
        id: 1,
        name: 'Огурец',
        price: 20,
        inStock: 150 //В наличие
    },
    {
        id: 2,
        name: 'Арбуз',
        price: 50,
        inStock: 200 //В наличие
    }
];

const catalog = {
    items,

    containerElement: null,

    showItem(item) {
        let itemName = document.createElement('h3');
        itemName.classList.add('itemHeading');
        itemName.innerHTML = item.name;
        this.containerElement.appendChild(itemName);
        let itemPrice = document.createElement('p');
        itemPrice.classList.add('itemPrice');
        itemPrice.innerHTML = 'Цена: ' + item.price;
        this.containerElement.appendChild(itemPrice);
        let itemInStock = document.createElement('p');
        itemInStock.classList.add('itemInStock');
        itemInStock.innerHTML = 'В наличие: ' + item.inStock;
        this.containerElement.appendChild(itemInStock);

        const idForInput = item.id;

        let addToCart = document.createElement('div');
        addToCart.classList.add('addToCart');
        addToCart.innerHTML = '<form class="form-inline">\n' +
            '  <label class="sr-only" for="inlineFormInputName2">Количество</label>\n' +
            '  <input type="text" data-item-id="' + idForInput + '" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Количество">\n' +
            '\n' +
            '  <button type="button" data-item-id="' + idForInput + '" class="basket-button btn btn-primary mb-2">Добавить в корзину</button>\n' +
            '</form>';
        this.containerElement.appendChild(addToCart);
    },

    render() {
        this.containerElement = document.querySelector("#catalog");
        const title = document.createElement('h1');
        title.innerHTML = 'КАТАЛОГ';
        this.containerElement.appendChild(title);
        this.containerElement.style.border = '1px solid black';
        for (let item of items) {
            this.showItem(item)
        }
    }
}

const basket = {
    items,
    itemsCount: [],
    containerElement: null,

    showItem(itemInBasket) {
        let item = this.items[itemInBasket[0]];

        let itemName = document.createElement('h3');
        itemName.classList.add('itemHeading');
        itemName.innerHTML = item.name;
        this.containerElement.appendChild(itemName);
        let itemPrice = document.createElement('p');
        itemPrice.classList.add('itemPrice');
        itemPrice.innerHTML = 'Цена: ' + item.price;
        this.containerElement.appendChild(itemPrice);
        let itemCount = document.createElement('p');
        itemCount.classList.add('itemCount');
        itemCount.setAttribute('data-item-id', item.id);
        itemCount.innerHTML = 'Количество: ' + itemInBasket[1];
        this.containerElement.appendChild(itemCount);

        let delFromBasket = document.createElement('div');
        console.log(item.id);
        delFromBasket.innerHTML = `
            <button type="button" data-item-id="${item.id}" class="delFromBasket btn btn-danger">Удалить из корзины</button>
        `;
        this.containerElement.appendChild(delFromBasket);

    },

    render() {
        this.containerElement = document.getElementById('basket');
        this.containerElement.innerHTML = '';

        if (this.itemsCount.length === 0) {
            const emptyBasket = document.createElement('h3');
            emptyBasket.innerHTML = 'Корзина пуста';
            this.containerElement.appendChild(emptyBasket);
        }


        let orderSum = 0;

        for (let order of this.itemsCount) {

            const itemId = +order[0];
            const count = +order[1];
            orderSum += this.items[itemId].price * count;

            this.showItem(order);

        }


        const total = document.createElement('p');
        total.innerHTML = 'В корзине: ' + this.itemsCount.length + ' товаров на сумму ' + orderSum + ' рублей';
        this.containerElement.appendChild(total);
        this.containerClickHandler();
    },

    containerClickHandler() {
        const basketButton = document.querySelectorAll('.basket-button');


        basketButton.forEach(element => {
            element.onclick = (event) => {
                if (event.target.classList.contains('basket-button')) {
                    const button = event.target;
                    const productId = parseInt(button.getAttribute('data-item-id'));
                    const itemCount = parseInt(document.querySelector('input[data-item-id="' + productId + '"]').value);
                    const item = this.items.find(element => element.id === productId);
                    this.addToBasket(item, itemCount);

                }
            }
        })

        const delFromBasket = document.querySelectorAll('.delFromBasket');
        delFromBasket.forEach(element => {
            element.onclick = (event) => {
                if (event.target.classList.contains('delFromBasket')) {
                    const button = event.target;
                    const productId = +button.getAttribute('data-item-id');
                    const item = this.items.find(element => element.id === productId);
                    this.delFromBasket(item);

                }
            }
        })

    }
    ,

    addToBasket(item, count) {
        const basketItemExistIndex = this.itemsCount.findIndex((basketItem) => basketItem[0] === item.id);
        if (basketItemExistIndex > -1) {
            const basketItem = this.itemsCount[basketItemExistIndex];
            basketItem[1] += count;

        } else {
            this.itemsCount.push([item.id, count]);
        }
        this.render();
    },

    delFromBasket(item) {
        const basketItemExistIndex = this.itemsCount.findIndex((basketItem) => basketItem[0] === item.id);
        if (basketItemExistIndex > -1) {
            this.itemsCount.splice(basketItemExistIndex, 1)
            this.render();
        }
    }
}

catalog.render();
basket.render();

