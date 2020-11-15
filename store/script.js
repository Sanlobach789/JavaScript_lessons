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
    itemsCount: [[0, 30], [2, 55], [1, 100]],
    containerElement: null,
    orderPrice: 0,
    totalCount: 0,
    showItem(itemFromBasket) {
        let item = this.items[itemFromBasket[0]];
        this.orderPrice += item.price * itemFromBasket[1];
        this.totalCount ++;
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
        };
        for (let order of this.itemsCount){
            this.showItem(order);
        }
        const total = document.createElement('p');
        total.innerHTML = 'В корзине: ' + this.totalCount + ' товаров на сумму ' + this.orderPrice + ' рублей';
        this.containerElement.appendChild(total);
    },

};

catalog.render();
basket.render();

