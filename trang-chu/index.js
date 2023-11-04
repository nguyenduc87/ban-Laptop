import hotSaleProductList from "/dung-chung/data.js";

const wrapperNode = document.querySelector('.wrapper');
const ulNode = document.querySelector('.carousel');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
let cartProductList = [];
const dollar = new Intl.NumberFormat('en-DE');

//Cart number
const cartNumber = document.querySelector('.cart .cart-number');

// Load sản phẩm 
window.addEventListener('load', () => {
    renderImageHotSale();
    // Xử lý hiển thị quantity trên icon giỏ hàng
    const productJson = localStorage.getItem('key');
    if (productJson === null) {
        cartProductList = [];
    } else {
        cartProductList = JSON.parse(productJson);
        updateCartNumber(cartProductList);
    }
});

btnRight.addEventListener('click', () => {
    const widthCardNode = document.querySelector('.card').offsetWidth;
    wrapperNode.scrollLeft += widthCardNode;

})
btnLeft.addEventListener('click', () => {
    const widthCardNode = document.querySelector('.card').offsetWidth;
    wrapperNode.scrollLeft -= widthCardNode;
})
// Cập nhật number của icon cart
function updateCartNumber(paramArr) {
    let numberCart = paramArr.reduce(function(acc, item) {
        return acc + item.quantity;
    }, 0)
    cartNumber.innerHTML = `${numberCart}`;
}
// Hàm render hình ảnh hot sale
function renderImageHotSale() {
    hotSaleProductList.slice(4, 16).forEach(item => {
        const liNode = document.createElement('li');
        ulNode.appendChild(liNode);
        liNode.classList.add('card');
        liNode.innerHTML = `
        <div class="percent">${Math.round((item.price.giaSale / item.price.giaChuaSale) * 100 - 100)}%</div>
        <a href="./chi-tiet/chi_tiet.html?id=${item.id}">
            <div class="img">
                <img src="${item.image}" alt="img">
            </div>
        </a>
        <a href="./chi-tiet/chi_tiet.html?id=${item.id}">
            <h2>${item.name}</h2>
        </a>
        <div class="price">
            <div class="gia-chua-sale">${dollar.format(item.price.giaChuaSale)}đ</div>
            <div class="gia-sale">${dollar.format(item.price.giaSale)}đ</div>
        </div>
        <div class="heart">
            <svg class="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </div>
        `
    })
}


    

