let fruits = [
    {id: 1, title: 'Яблоки', text: 'Это яблоки', price: 20, img: 'http://placehold.it/286x150'},
    {id: 2, title: 'Груши', text: 'Это груши', price: 25, img: 'http://placehold.it/286x150'},
    {id: 3, title: 'Мандарины', text: 'Это мандарины', price: 30, img: 'http://placehold.it/286x150'},
    {id: 4, title: 'Апельсины', text: 'А это апельсины', price: 40, img: 'http://placehold.it/286x150'}
]

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '500px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() { 
            priceModal.close()
        }},
    ]
})

const toHTML = fruit => `
<div class="col">
    <div class="card" style="width: 18rem;">
        <img src=${fruit.img} class="card-img-top" alt="${fruit.title}">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <p class="card-text">${fruit.text}</p>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
        </div>
    </div>
</div>
`


function renderCards() {
const html = fruits.map(toHTML).join('')
   document.querySelector('#fruits').innerHTML = html
}

renderCards()

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {

        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open();
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Удалить фрукт: <strong>${fruit.title}$</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            renderCards(fruits);

        }).catch(() => {

        })
        
    }
})
