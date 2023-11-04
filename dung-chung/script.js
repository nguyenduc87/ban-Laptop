import productList from "./data.js";
const dollar = new Intl.NumberFormat('en-DE');

// Popup nav danh muc
const navPopup = document.querySelector('.nav-popup');
const navClose = document.querySelector('.nav-close')
const navPopupOverlay = document.querySelector('.nav-popup-overlay');
// const phoneUserPopup = document.querySelector('.phone-user-popup');

const danhMuc = document.querySelector('.category');
danhMuc.addEventListener('click', () => {
    navPopup.classList.add('nav-popup-open');
})
navClose.addEventListener('click', () => {
    navPopup.classList.remove('nav-popup-open');
})
navPopupOverlay.addEventListener('click', () => {
    navPopup.classList.remove('nav-popup-open');
})

// Search Popup
const searchInput = document.querySelector('.search .input');
const searchPopupOverlay = document.querySelector('.search-popup .search-popup-overlay');
const searchPopup = document.querySelector('.search-popup');
const ulNode = document.querySelector('.search-popup-container .list-popup');
let array = [];
// Sự kiện focus
searchInput.addEventListener('focus', () => {
    searchPopup.classList.add('search-popup-open');
    if (array.length === 0) {
        let get4EleArr = get4Element();
        renderProducts(get4EleArr);
    } 
    else if(searchInput.value.length > 0 && searchInput.value.length < 3){
        ulNode.innerHTML = '';
    } 
    else if (searchInput.value.length >= 3) {
        ulNode.innerHTML = '';
        let searchArr = searchProduct(productList);
        renderProducts(searchArr);
    }
    else {
        ulNode.innerHTML = '';
        let get4EleArr = get4Element();
        renderProducts(get4EleArr);
    }
})
// Sự kiện click
searchPopupOverlay.addEventListener('click', () => {
    searchPopup.classList.remove('search-popup-open');
    searchInput.value = '';
    ulNode.innerHTML = '';
})
// Sự kiện input
searchInput.addEventListener('input', () => {
    ulNode.innerHTML = ``;
    let seachArr = searchProduct(productList);
    if (seachArr.length === 0 || (searchInput.value.length < 3 && searchInput.value.length >= 1)) {
        ulNode.innerHTML = '';
    } else if (searchInput.value.length === 0) {
        ulNode.innerHTML = '';
        let get4EleArr = get4Element();
        renderProducts(get4EleArr);
    } else {
        renderProducts(seachArr);
    }
})
// Hàm get random item from array
function getRandomItem(arr) {
    // get random index
    const randomIndex = Math.floor(Math.random() * arr.length); // -> vi tri
    // get random item
    const item = arr[randomIndex];
    return item;
}
// Hàm get random 4 element from productList
function get4Element() {
    while(array.length < 4) {
        let target = getRandomItem(productList);
        while(true) {
            let result = array.find(item => item.id === target.id);
            if (result === undefined) {
                array.push(target);
                break;
            } else {
                target = getRandomItem(productList);
            }
        }
    }
    return array;
}
// Hàm tìm kiếm sản phẩm theo tên
function searchProduct(paramArr) {
    let listArr = paramArr.filter(value => {
        let textValue = value.name.toUpperCase();
        let inputValue = searchInput.value.toUpperCase() || searchMobileInput.value.toUpperCase();
        return textValue.includes(inputValue);
    })
    return listArr;
}

// Hàm renderProducts
function renderProducts(paramArr) {
    paramArr.forEach(item => {
        const liNode = document.createElement('li');
        ulNode.appendChild(liNode);
        liNode.innerHTML = `
            <a href="./chi-tiet/chi_tiet.html?id=${item.id}">
                <img src="${item.image}" alt="">
                <span>${item.search_name}<br>${dollar.format(item.price.giaSale)}đ</span>
            </a>
        `
    })
}

// Search mobile Popup
const searchMobilePopup = document.querySelector('.search-mobile-popup');
const popupClose = document.querySelector('.popup-close');
const searchMobileContainer = document.querySelector('.search-mobile-container');
const searchPopupContainer = document.querySelector('.search-mobile .search-popup-container');
const ulSearchMobile = document.querySelector('.search-mobile .search-popup-container .list-popup');
const searchMobileInput = document.querySelector('.search-mobile .search-mobile-input');
const searchMobileBtn = document.querySelector('.search-mobile .btn');
//Sự kiện click button
searchMobileBtn.addEventListener('click', () => {
    searchMobilePopup.classList.add('search-mobile-popup-open');
    searchMobileContainer.classList.toggle('active');
})
//Sự kiện click button close
popupClose.addEventListener('click', () => {
    searchMobilePopup.classList.remove('search-mobile-popup-open');
    searchMobileContainer.classList.remove('active');
    searchPopupContainer.classList.remove('open');
    searchMobileInput.value = '';
    ulSearchMobile.innerHTML = '';
})
// Sự kiện focus
searchMobileInput.addEventListener('focus', () => {
    searchPopupContainer.classList.add('open');
    if (array.length === 0) {
        let get4EleArr = get4Element();
        renderProductsMobile(get4EleArr);
    } 
    else if(searchMobileInput.value.length > 0 && searchMobileInput.value.length < 3){
        ulSearchMobile.innerHTML = '';
    } 
    else if (searchMobileInput.value.length >= 3) {
        ulSearchMobile.innerHTML = '';
        let searchArr = searchProduct(productList);
        renderProductsMobile(searchArr);
    }
    else {
        ulSearchMobile.innerHTML = '';
        let get4EleArr = get4Element();
        renderProductsMobile(get4EleArr);
    }
})
// Sự kiện input
searchMobileInput.addEventListener('input', () => {
    ulSearchMobile.innerHTML = ``;
    let seachArr = searchProduct(productList);
    if (seachArr.length === 0 || (searchMobileInput.value.length < 3 && searchMobileInput.value.length >= 1)) {
        ulSearchMobile.innerHTML = '';
    } else if (searchMobileInput.value.length === 0) {
        ulSearchMobile.innerHTML = '';
        let get4EleArr = get4Element();
        renderProductsMobile(get4EleArr);
    } else {
        renderProductsMobile(seachArr);
    }
})

// Hàm renderProducts Mobile
function renderProductsMobile(paramArr) {
    paramArr.forEach(item => {
        const liNode = document.createElement('li');
        ulSearchMobile.appendChild(liNode);
        liNode.innerHTML = `
            <a href="./Chi-tiet/chi_tiet.html?id=${item.id}">
                <img src="${item.image}" alt="">
                <span>${item.search_name}<br>${dollar.format(item.price.giaSale)}đ</span>
            </a>
        `
    })
}


// Scroll event header sticky
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    let scrollValue = window.scrollY;
    // console.log(scrollValue)
    if (scrollValue > 100) {
        header.classList.add('is-sticky');
    } else if (scrollValue === 0) {
        header.classList.remove('is-sticky');
    }
})






    

