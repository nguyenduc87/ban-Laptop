import productList from "../dung-chung/data.js";

const ulNode = document.querySelector('.products-list');
const cartNumber = document.querySelector('.cart .cart-number');
const dollar = new Intl.NumberFormat('en-DE');
let cartProductList = [];
// Slide show
const list = document.querySelector('.slider .list');
const items = document.querySelectorAll('.slider .list .item'); // lay tat ca item
const btnPrev = document.querySelector('.slider .buttons .prev');
const btnNext = document.querySelector('.slider .buttons .next');
const liNode = document.querySelectorAll('.slider .dots li');  // lay tat ca li
let index = 1;
let length = items.length - 1;

// Ấn nút Next
btnNext.addEventListener('click', () => {
    if (index + 1 > length) {
        index = 0;
    } else {
        index += 1;
    }
    reloadSlider();
})
// Ấn nút Prev
btnPrev.addEventListener('click', () => {
    if (index - 1 < 0) {
        index = length;
    } else {
        index -= 1;
    }
    reloadSlider();
})
// Set time
let refreshSilder = setInterval(() => {btnNext.click()}, 4000);
// Hàm load image
function reloadSlider() {
    let checkLeft = items[index].offsetLeft;
    list.style.left = -checkLeft + 'px';
    // Remove class active firstLi
    const firstLiNode = document.querySelector('.slider .dots li.active');
    firstLiNode.classList.remove('active');
    // add class active mỗi li
    liNode[index].classList.add('active');
    // Clear SetInterVal
    clearInterval(refreshSilder);
    refreshSilder = setInterval(() => {btnNext.click()}, 4000);
}
// Active các nút li theo slide
liNode.forEach((li, key) => {
    li.addEventListener('click', () => {
        index = key;
        reloadSlider();
    })
})

// Back to top scrollTo
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    let scrollValue = window.scrollY;
    // console.log(scrollValue)
    if (scrollValue > 400) {
        backToTop.classList.add('back-to-top-open');
    } else {
        backToTop.classList.remove('back-to-top-open');
    }
})
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

// Ẩn hiện nội dung câu hỏi khi click vào câu hỏi
const questionTitle = document.querySelectorAll('.question-text-title');
const textWrapper = document.querySelectorAll('.text-wrapper');
const spanArrow = document.querySelectorAll('.question-text-title span');
questionTitle.forEach((element, index) => {
    questionClick(element, index);
});
function questionClick(paramElement, paramIndex) {
    paramElement.addEventListener('click', () => {
        // Xét tồn tại class open có chưa. Nếu có -> Xóa
        let hasClassOpen = textWrapper[paramIndex].classList.contains('open');
        if (hasClassOpen) {
            textWrapper[paramIndex].classList.remove('open');
            spanArrow[paramIndex].style.transform = 'rotate(0)';
        } else {
            // Xóa class open của tất cả node textWrapper
            for (let i = 0; i < textWrapper.length; i += 1) {
                textWrapper[i].classList.remove('open');
                spanArrow[i].style.transform = 'rotate(0)';
            }
            // Thêm class open vào node hiện tại
            textWrapper[paramIndex].classList.add('open');
            spanArrow[paramIndex].style.transform = 'rotate(90deg)';
        }
    })
}
// Hàm load sản phẩm từ query string
function loadProducts() {
    // Lấy query String
    const queryString = window.location.search;
    // Lấy parameter từ query String
    const urlParams = new URLSearchParams(queryString);
    const needValue = urlParams.get('need');
    const brandValue = urlParams.get('brand');
    let result = [];
    // Lọc data theo nhu cầu và theo hãng
    if (needValue !== null) {
        result = productList.filter(function(item) {
            if (item.need === needValue) {
                return true;
            }
            return false;
        })

    } else if (brandValue !== null) {
        result = productList.filter(function(item) {
            if (item.brand === brandValue) {
                return true;
            }
            return false;
        })
    } else {
        loadData(productList);
    }
    // Load sản phẩm từ result
    loadData(result);
}
// Load các sản phẩm từ hàm loadProducts()
window.addEventListener('load',
    loadProducts(), 
    loadNumberIconCart()
);
// Load hiển thị quantity trên icon giỏ hàng
function loadNumberIconCart() {
    window.addEventListener('load', () => {
        const productJson = localStorage.getItem('key');
        if (productJson === null) {
            cartProductList = [];
        } else {
            cartProductList = JSON.parse(productJson);
            updateCartNumber(cartProductList);
        }
    })
}
// Hàm load data
function loadData(paramArr) {
    window.addEventListener('load', () => {
        renderProductList(paramArr);
    })
}
// Cập nhật number của icon cart
function updateCartNumber(paramArr) {
    let numberCart = paramArr.reduce(function (acc, item) {
        return acc + item.quantity;
    }, 0)
    cartNumber.innerHTML = `${numberCart}`;
}
// Hàm render sản phẩm
function renderProductList(paramArr) {
    paramArr.forEach(item => {
        const liNode = document.createElement('li');
        ulNode.appendChild(liNode);
        liNode.classList.add('product-item');
        liNode.innerHTML = `
            <div class="percent">${Math.round((item.price.giaSale / item.price.giaChuaSale) * 100 - 100)}%</div>
            <a href="/ban-Laptop/chi-tiet/chi_tiet.html?id=${item.id}">
                <div class="img">
                    <img src="${item.image}" alt="img">
                </div>
            </a>
            <a href="/ban-Laptop/chi-tiet/chi_tiet.html?id=${item.id}">
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










