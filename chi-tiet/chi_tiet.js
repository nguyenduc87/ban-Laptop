import productList from "../dung-chung/data.js";
const dollar = new Intl.NumberFormat('en-DE');
let cartProductList = [];

const productName = document.querySelector('.product-name');
const gia_ban = document.querySelector('.product-content .product-price .gia-ban');
const tra_gop_thang = document.querySelector('.product-content .product-price .tra-gop-thang');
const promotion = document.querySelector('.promotion .promotion1');
const slideList = document.querySelector('.slide-show .slider .list');
const slideDots = document.querySelector('.slide-show .slider .dots');
const technical_UlNode = document.querySelector('.technical ul');
//Cart number
const cartNumber = document.querySelector('.cart .cart-number');

window.addEventListener('load', () => {
    renderProduct(productList);
    // Xử lý hiển thị quantity trên icon giỏ hàng
    const productJson = localStorage.getItem('key');
    if (productJson === null) {
        cartProductList = [];
    } else {
        cartProductList = JSON.parse(productJson);
        updateCartNumber(cartProductList);
    }
})

// Lấy query String
const queryString = window.location.search;
// Lấy parameter từ query String
const urlParams = new URLSearchParams(queryString);
const idValue = urlParams.get('id');

// Event click MUA NGAY để thêm sản phẩm vào giỏ hàng
const buyNow = document.querySelector('.container-buy-now');
buyNow.addEventListener('click', () => {
    productList.forEach(item => {
        if (Number(idValue) === item.id) {
            const productJson = localStorage.getItem('key');
            if (productJson === null) {
                addNewProduct(cartProductList, item);
            } else {
                cartProductList = JSON.parse(productJson);
                let flag = true;
                for(let i = 0; i < cartProductList.length; i ++) {
                    if (item.id === cartProductList[i].id) {
                        // Cập nhật số lượng sản phẩm đã tồn tại
                        cartProductList[i].quantity += 1;
                        // Lưu vào local Storage
                        localStorage.setItem('key', JSON.stringify(cartProductList));
                        // Thông báo sản phẩm đã tồn tại
                        alert('Sản phẩm đã có trong giỏ hàng.');
                        // bật cờ hiệu và thoát khỏi vòng lặp
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    addNewProduct(cartProductList, item);
                }
            }
            // Cập nhật quantity trên icon giỏ hàng
            updateCartNumber(cartProductList);
        }
    })
})
// Hàm thêm sản phẩm mới
function addNewProduct(paramArr, paramRest) {
    const product = {
        ...paramRest,
        quantity : 1,
        checked: true
    }
    // Thêm vào mảng giỏ hàng
    paramArr.push(product);
    // Lưu vào local Storage
    localStorage.setItem('key', JSON.stringify(paramArr));
    // Thông báo thêm thành công
    alert('Đã thêm vào giỏ hàng.');
}
// Cập nhật number của icon cart
function updateCartNumber(paramArr) {
    let numberCart = paramArr.reduce(function(acc, item) {
        return acc + item.quantity;
    }, 0)
    cartNumber.innerHTML = `${numberCart}`;
}
// Hàm renderProduct
function renderProduct(paramArr) {
    paramArr.forEach(item => {
        if (item.id === Number(idValue)) {
            productName.innerHTML = `
                <h1>${item.name}</h1>
            `
            promotion.innerHTML = `
                <input class="check1" type="radio" name="check" checked id="inp1">
                <label for="inp1">Giảm ngay <strong>${Math.round((item.price.giaSale / item.price.giaChuaSale) * 100 - 100)}%</strong> áp dụng đến 20/10</label>
            `
            gia_ban.innerHTML = `
                <span class="gia-sale">${dollar.format(item.price.giaSale)}đ</span>
                <span class="gia-goc">${dollar.format(item.price.giaChuaSale)}đ</span>
            `
            const inp1 = document.querySelector('#inp1');
            const inp2 = document.querySelector('#inp2');
            // Ấn nút giảm %
            inp1.addEventListener('click', () => {
                gia_ban.innerHTML = `
                <span class="gia-sale">${dollar.format(item.price.giaSale)}đ</span>
                <span class="gia-goc">${dollar.format(item.price.giaChuaSale)}đ</span>
                `
                // Ẩn phần text trả góp 0% cho 12 tháng
                tra_gop_thang.innerHTML = ``;
            })
            // Ấn nút trả góp 0%
            inp2.addEventListener('click', () => {
                const giaSale = document.querySelector('.gia-sale');
                const giaGoc = document.querySelector('.gia-goc');
                if (giaGoc.textContent === '') {
                    giaSale.textContent = dollar.format(item.price.giaChuaSale) + 'đ';
                } else {
                    giaSale.textContent = giaGoc.textContent;
                    giaGoc.textContent = '';
                }
                // Hiển thị phần text trả góp 0% cho 12 tháng
                tra_gop_thang.innerHTML = `
                <div class="text">Trả góp 0% từ</div>
                <div class="tien-gop-thang">${dollar.format(Math.round(item.price.giaChuaSale / 12))}đ/tháng</div>
                `
            })
            
            slideList.innerHTML = `
                <div class="item"><img src="${item.list_img[0]}" alt=""></div>
                <div class="item"><img src="${item.list_img[1]}" alt=""></div>
                <div class="item"><img src="${item.list_img[2]}" alt=""></div>
                <div class="item"><img src="${item.list_img[3]}" alt=""></div>
                <div class="item"><img src="${item.list_img[4]}" alt=""></div>
            `
            slideDots.innerHTML = `
                <li class="active"><img src="${item.list_img[0]}" alt=""></li>
                <li class=""><img src="${item.list_img[1]}" alt=""></li>
                <li class=""><img src="${item.list_img[2]}" alt=""></li>
                <li class=""><img src="${item.list_img[3]}" alt=""></li>
                <li class=""><img src="${item.list_img[4]}" alt=""></li>
            `
            technical_UlNode.innerHTML = `
                <li>
                    <p>Loại card đồ họa</p>
                    <div>${item.technical_info.card}</div>
                </li>
                <li>
                    <p>Loại CPU</p>
                    <div>${item.technical_info.cpu}</div>
                </li>
                <li>
                    <p>Dung lượng RAM</p>
                    <div>${item.technical_info.ram}</div>
                </li>
            `
            // Slide show
            const list = document.querySelector('.slider .list');
            const items = document.querySelectorAll('.slider .list .item');
            const btnPrev = document.querySelector('.slide-container .buttons .prev');
            const btnNext = document.querySelector('.slide-container .buttons .next');
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
            // Render technical Popup
            //1. Vi xử lý & đồ họa
            const card_graphic = document.querySelector('.item-description .card_graphic');
            const cpu = document.querySelector('.item-description .cpu');
            card_graphic.innerHTML = `${item.technical_popup.card}`;
            cpu.innerHTML = `${item.technical_popup.cpu}`;
            //2. RAM & Ổ cứng
            const dung_luong_ram = document.querySelector('.item-description .dung-luong_ram');
            const loai_ram = document.querySelector('.item-description .loai_ram');
            const hardDisk = document.querySelector('.item-description .hardDisk');
            dung_luong_ram.innerHTML = `${item.technical_popup.ram}`;
            loai_ram.innerHTML = `${item.technical_popup.ram_ddr}`
            hardDisk.innerHTML = `${item.technical_popup.hard_disk}`;
            //3. Thông số khác
            const chatLieuVo = document.querySelector('.item-description .chat-lieu-vo');
            const chatLieuNen = document.querySelector('.item-description .chat-lieu-nen');
            chatLieuVo.innerHTML = `${item.technical_popup.chat_lieu}`;
            chatLieuNen.innerHTML = `${item.technical_popup.chat_lieu_tam_nen}`;
            //4. Màn hình
            const monitorCamUng = document.querySelector('.item-description .monitor-cam-ung');
            const monitorSize = document.querySelector('.item-description .monitor-size');
            const monitorPhanGiai = document.querySelector('.item-description .monitor-phan-giai');
            monitorCamUng.innerHTML = `${item.technical_popup.monitor_cam_ung}`;
            monitorSize.innerHTML = `${item.technical_popup.monitor_size}`;
            monitorPhanGiai.innerHTML = `${item.technical_popup.do_phan_giai}`;
            //5. Công nghệ âm thanh và Pin
            const amThanh = document.querySelector('.item-description .am-thanh');
            const pin = document.querySelector('.item-description .pin');
            amThanh.innerHTML = `${item.technical_popup.am_thanh}`;
            pin.innerHTML = `${item.technical_popup.pin}`;
            //6. Kích thước và trọng lượng
            const kichThuoc = document.querySelector('.item-description .kich-thuoc');
            const trongLuong = document.querySelector('.item-description .trong-luong');
            kichThuoc.innerHTML = `${item.technical_popup.kich_thuoc}`;
            trongLuong.innerHTML = `${item.technical_popup.trong_luong}`;
            //7. Giao tiếp & kết nối
            const webcam = document.querySelector('.item-description .webcam');
            const heDieuHanh = document.querySelector('.item-description .he-dieu-hanh');
            const wifi = document.querySelector('.item-description .wifi');
            const bluetooth = document.querySelector('.item-description .bluetooth');
            webcam.innerHTML = `${item.technical_popup.webcam}`;
            heDieuHanh.innerHTML = `${item.technical_popup.he_dieu_hanh}`;
            wifi.innerHTML = `${item.technical_popup.wifi}`;
            bluetooth.innerHTML = `${item.technical_popup.bluetooth}`;
        }

    })
}

// Technical infomation Popup
const technicalPopup = document.querySelector('.technical-popup');
const cauHinhBtn = document.querySelector('.cau-hinh button');
cauHinhBtn.addEventListener('click', () => {
    technicalPopup.classList.add('open');
})
const technicalPopupClose = document.querySelector('.technical-popup-close');
technicalPopupClose.addEventListener('click', () => {
    technicalPopup.classList.remove('open');
})

const btnDong = document.querySelector('.technical-popup-footer');
btnDong.addEventListener('click', () => {
    technicalPopup.classList.remove('open');
})
const technicalPopupOverlay = document.querySelector('.technical-popup-overlay');
technicalPopupOverlay.addEventListener('click', () => {
    technicalPopup.classList.remove('open');
})