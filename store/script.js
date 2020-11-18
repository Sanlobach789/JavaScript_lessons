"use strict"


const items = [
    {
        name: 'Помидор',
        price: 30,
        inStock: 100 //В наличие
    },
    {
        name: 'Огурец',
        price: 20,
        inStock: 150 //В наличие
    },
    {
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

        let addToCart = document.createElement('div');
        addToCart.classList.add('addToCart');
        addToCart.innerHTML = '<form class="form-inline">\n' +
            '  <label class="sr-only" for="inlineFormInputName2">Количество</label>\n' +
            '  <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Количество">\n' +
            '\n' +
            '  <button id = "btnToCart" type="submit" class="btn btn-primary mb-2">Добавить в корзину</button>\n' +
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
    itemsCount: [[0, 30]],
    containerElement: null,
    orderPrice: 0,
    totalCount: 0,

    showItem(itemFromBasket) {
        let item = this.items[itemFromBasket[0]];
        this.orderPrice += item.price * itemFromBasket[1];
        this.totalCount++;
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
        itemCount.innerHTML = 'Количество: ' + itemFromBasket[1];
        this.containerElement.appendChild(itemCount);

        let delFromBasket = document.createElement('h3');
        delFromBasket.classList.add('itemHeading');
        delFromBasket.innerHTML = '<button type="button" class="btn btn-danger">Удалить из корзины</button>';
        this.containerElement.appendChild(delFromBasket);

    },

    render() {
        this.containerElement = document.querySelector("#basket");
        const title = document.createElement('h1');
        title.innerHTML = 'КОРЗИНА';
        this.containerElement.appendChild(title);
        this.containerElement.style.border = '1px solid black';
        if (this.itemsCount.length === 0) {
            const emptyBasket = document.createElement('h3');
            emptyBasket.innerHTML = 'Корзина пуста';
            this.containerElement.appendChild(emptyBasket);
        }
        ;
        for (let order of this.itemsCount) {
            this.showItem(order);
        }
        const total = document.createElement('p');
        total.innerHTML = 'В корзине: ' + this.totalCount + ' товаров на сумму ' + this.orderPrice + ' рублей';
        this.containerElement.appendChild(total);
    },

    containerClickHandler(event) {
        if (event.target.id === 'btnToCart') {

            this.addToBasket();
        }
        ;

    },

    addToBasket(item, count) {

    },

};

catalog.render();
basket.render();

