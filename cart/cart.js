const emptyCartContent = document.querySelector('.empty-cart-content');
const cartContainer = document.querySelector('.cart-container');
const cartNumber = document.querySelector('.cart .cart-number');
const paymentPrice = document.querySelector('.payment .payment-price');
const cartPay = document.querySelector('.cart-pay');
const cartBuyNowBtn = document.querySelector('.cart-buy-now .btn-action');
let cartList = [];

const dollar = new Intl.NumberFormat('en-US');

window.addEventListener('load', () => {
    const productJson = localStorage.getItem('key');
    if (productJson === null) {
        cartList = [];
        showEmptyCart();
    } else {
        cartList = JSON.parse(productJson);
        // Cập nhật quantity icon giỏ hàng
        updateCartNumber(cartList);
        // Render product
        cartList.forEach(item => {
            const ulNode = document.createElement('ul');
            cartContainer.appendChild(ulNode);
            ulNode.classList.add('cart-body');
            ulNode.innerHTML = `
            <li class="cart-item">
                <div class="item-img">
                    <a href="/ban-Laptop/chi-tiet/chi_tiet.html?id=${item.id}">
                        <img src="${item.image}" alt="">
                    </a>
                    <div class="item-check">
                        <input type="checkbox" checked> 
                    </div>
                </div>
                <div class="item-content">
                    <div class="title">
                        <a href="/ban-Laptop/chi-tiet/chi_tiet.html?id=${item.id}">
                            <p class="name-product">${item.name}</p>
                        </a>
                        <div class="delete-icon">
                            <i class='bx bx-trash'></i>
                        </div>
                    </div>
                    <div class="quantity-price">
                        <div class="price">
                            <div class="gia-ban">
                                <span class="gia-sale">${dollar.format(item.price.giaSale)}đ</span><br>
                                <span class="gia-goc">${dollar.format(item.price.giaChuaSale)}đ</span>
                            </div>
                        </div>
                        <div class="quantity">
                            <div class="btn-input">
                                <button class="btn-down">-</button>
                                <input class="inp" type="text" value="${item.quantity}" readonly>
                                <button class="btn-up">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `
            // Event quantity input
            const input = ulNode.querySelector('.btn-input .inp');
            const checkbox = ulNode.querySelector('.item-check input');
            const btnDown = ulNode.querySelector('.btn-down');
            const btnUp = ulNode.querySelector('.btn-up');
            btnDown.addEventListener('click', () => {
                input.value = Number(input.value) - 1;
                if (Number(input.value) < 1) {
                    input.value = 1;
                    alert('Số lượng tối thiểu là 1');
                    item.quantity = Number(input.value);
                    localStorage.setItem('key', JSON.stringify(cartList));
                    paymentMoney(cartList);
                    updateCartNumber(cartList);
                } else {
                    item.quantity = Number(input.value);
                    localStorage.setItem('key', JSON.stringify(cartList));
                    paymentMoney(cartList);
                    updateCartNumber(cartList);
                }
            })
            btnUp.addEventListener('click', () => {
                input.value = Number(input.value) + 1;
                item.quantity = Number(input.value);
                localStorage.setItem('key', JSON.stringify(cartList));
                paymentMoney(cartList);
                updateCartNumber(cartList);
            })

            // Event delete button
            const deleteNode = ulNode.querySelector('.delete-icon');
            deleteNode.addEventListener('click', () => {
                let choice = confirm(`Bạn muốn xóa sản phẩm ${item.name}`);
                if (choice) {
                    let viTri = -1;
                    for (let i = 0; i < cartList.length; i++) {
                        if (item.id === cartList[i].id) {
                            ulNode.innerHTML = '';
                            ulNode.classList.remove('cart-body');
                            viTri = i;
                            break;
                        }
                    }
                    cartList.splice(viTri, 1);
                    localStorage.setItem('key', JSON.stringify(cartList));
                    // Cập nhật number của icon cart
                    updateCartNumber(cartList);
                    // Hiển thị Tiền thanh toán
                    paymentMoney(cartList);
                    // Hiển thị empty cart nếu mảng rỗng
                    if (cartList.length === 0) {
                        showEmptyCart();
                    }
                }
            })
            // Event click input checkbox
            checkbox.addEventListener('click', () => {
                item.checked = checkbox.checked;
                localStorage.setItem('key', JSON.stringify(cartList));
                paymentMoney(cartList);
                if (paymentPrice.textContent === `0đ`) {
                    cartBuyNowBtn.classList.add('disabled');
                    cartBuyNowBtn.disabled = true;
                }else {
                    cartBuyNowBtn.classList.remove('disabled');
                    cartBuyNowBtn.disabled = false;
                }
            })
        })
        // Hiển thị Tiền thanh toán
        const ulNode = document.querySelector('.cart-body');
        const checkbox = ulNode.querySelector('.item-check input');
        cartList.forEach(item => {
            item.checked = checkbox.checked;
            localStorage.setItem('key', JSON.stringify(cartList));
            paymentMoney(cartList);
        })
        // Hiển thị empty cart nếu mảng rỗng
        if (cartList.length === 0) {
            showEmptyCart();
        }
    }
})
// Hàm Cập nhật number của icon cart
function updateCartNumber(paramArr) {
    let numberCart = paramArr.reduce(function (acc, item) {
        return acc + item.quantity;
    }, 0)
    cartNumber.innerHTML = `${numberCart}`;
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
    paymentPrice.textContent = `${dollar.format(payment)}đ`;
}
// Hiển thị empty cart và ẩn thanh toán
function showEmptyCart() {
    emptyCartContent.style.display = 'block';
    cartPay.style.display = 'none';
}