const ulNode = document.querySelector('.cart-item');
const giaUuDai = document.querySelector('.total-payment .gia-uu-dai');
const giaGoc = document.querySelector('.total-payment .gia-goc');
const promotionMoney = document.querySelector('.promotion-money input');
const promotionCode = document.querySelector('.promotion-code input');
const promotionCodeBtn = document.querySelector('.promotion-code .btn');
const codeError = document.querySelector('.promotion-code .code-error');
const cartInfoTitle = document.querySelector('.cart-info-title');

const dollar = new Intl.NumberFormat('en-US');
let cartList = [];
// Tạo mã thành viên
const codeMemberObj = {
    MB001: 300000,
    MB002: 500000,
    MB003: 700000,
    MB004: 1000000,
    MB005: 2000000,
}
window.addEventListener('load', () => {
    const productJson = localStorage.getItem('key');
    if (productJson === null) {
        cartList = [];
    } else {
        cartList = JSON.parse(productJson);
        cartList.forEach(item => {
            if (item.checked === true) {
                const liNode = document.createElement('li');
                liNode.classList.add('cart-content');
                ulNode.appendChild(liNode);
                liNode.innerHTML = `
                    <div class="name-product-box">
                        <p class="name-product">${item.name}</p>
                        <span class="thanh-tien">${dollar.format(item.price.giaSale * item.quantity)}đ</span>
                    </div>
                    <div class="quantity-product">
                        <span class="quantity">${dollar.format(item.price.giaSale)} đ x ${item.quantity}</span>
                    </div>
                `
            }
        })
        // Hiển thị Tiền thanh toán
        paymentMoney(cartList);
        // Event promotionCodeBtn click
        promotionCodeBtn.addEventListener('click', () => {
            getCodeMember();
            paymentMoney(cartList);
        })
    }
})
// Hàm lấy mã thành viên
function getCodeMember() {
    if (promotionCode.value === '') {
        codeError.classList.remove('open');
        alert('Vui lòng nhập mã thành viên.');
        promotionMoney.value = '0';
        giaGoc.style.display = 'none';
    } else {
        if (codeMemberObj[promotionCode.value] === undefined) {
            promotionMoney.value = '0';
            codeError.classList.add('open');
            giaGoc.style.display = 'none';
        } else {
            promotionMoney.value = codeMemberObj[promotionCode.value];
            giaGoc.style.display = 'block';
            codeError.classList.remove('open');
        }
    }
}
// Hàm Hiển thị Tiền thanh toán
function paymentMoney(paramArr) {
    let payment = paramArr.reduce(function (acc, item) {
        if (item.checked === true) {
            return acc + (item.price.giaSale * item.quantity);
        } else {
            return acc;
        }
    }, 0)
    giaUuDai.textContent = `${dollar.format(payment - promotionMoney.value)} đ`;
    giaGoc.textContent = `${dollar.format(payment)} đ`;
}
// Truy vấn đến các input nhập text
const fullName = document.querySelector('.fullName');
const address = document.querySelector('.address');
const phone = document.querySelector('.phone');
const email = document.querySelector('.email');
// Truy vấn đến thẻ p text-error
const name_error = document.querySelector('.name-error');
const address_error = document.querySelector('.address-error');
const phone_error = document.querySelector('.phone-error');
const email_error = document.querySelector('.email-error');
// Event click Thanh Toán button
const orderBtn = document.querySelector('.order');
orderBtn.addEventListener('click', () => {
    if (validateInput()) {
        email_error.innerHTML = '';
    }
})

function validateInput() {
    let result = true;
    if (fullName.value.trim() === '') {
        name_error.innerHTML = 'Chưa nhập tên';
        result = false;
    } 
    else if (address.value.trim() === '') {
        name_error.innerHTML = '';
        address_error.innerHTML = 'Chưa nhập địa chỉ';
        result = false;
    }
    else if (phone.value.trim() === '') {
        address_error.innerHTML = '';
        phone_error.innerHTML = 'Chưa nhập số điện thoại';
        result = false;
    }
    else if (!Number(phone.value)) {
        phone_error.innerHTML = 'Số điện thoại phải là số';
        result = false;
    }
    else if (!validateEmail()) {
        phone_error.innerHTML = '';
        phoneLogin_error.innerHTML = '';
        result = false;
    }
    return result;
}

function validateEmail() {
    let result = true;
    if (email.value === '') {
        email_error.innerHTML = 'Chưa nhập email'
        result = false;
    }
    else if (email.value.includes("@") === false || email.value.includes(".") === false) {
        email_error.innerHTML = 'Email phải có 1 ký tự [@] và 1 dấu [.]'
        result = false;
    }
    else if (email.value.charAt(0) === "@"|| email.value.charAt(email.value.length-1) === "@") {
        email_error.innerHTML = '[@] không được ở vị trí đầu hoặc cuối'
        result = false;
    }
    else if (email.value.charAt(0) === "."|| email.value.charAt(email.value.length-1) === ".") {
        email_error.innerHTML = 'Dấu [.] không được ở vị trí đầu hoặc cuối'
        result = false;
    }
    return result;
}

