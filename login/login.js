const form1 = document.querySelector('.container .form1');
const form2 = document.querySelector('.container .form2');
const dangNhap = document.querySelector('.container .text .dang-nhap');
const dangKy = document.querySelector('.container .text .dang-ky');
const dangKyNgayBtn = document.querySelector('.dang-ky-ngay button');
// Truy vấn đến icon eye hide/show
const iconEyeHide = document.querySelector('.icon-mat-hide');
const iconEyeShow = document.querySelector('.icon-mat-show');
const form2EyeHide = document.querySelector('.form2-icon-mat-hide');
const form2EyeShow = document.querySelector('.form2-icon-mat-show');
const form2EyeHideRePass = document.querySelector('.form2-icon-mat-hide-re-pass');
const form2EyeShowRePass = document.querySelector('.form2-icon-mat-show-re-pass');
// Truy vấn đến input
const phone_dang_nhap = document.querySelector('.phone-dang-nhap');
const password_dang_nhap = document.querySelector('.password-dang-nhap');
const fullName = document.querySelector('.fullName');
const phone = document.querySelector('.phone');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const re_password = document.querySelector('.re-password');
// Truy vấn đến thẻ p text-error phần đăng nhập
const phone_dang_nhap_error = document.querySelector('.form1 .phone-dang-nhap-error');
const password_dang_nhap_error = document.querySelector('.form1 .password-dang-nhap-error');
// Truy vấn đến thẻ p text-error phần đăng ký
const nameLogin_error = document.querySelector('.nameLogin-error');
const phoneLogin_error = document.querySelector('.phoneLogin-error');
const emailLogin_error = document.querySelector('.emailLogin-error');
const passLogin_error = document.querySelector('.passLogin-error');
const rePassLogin_error = document.querySelector('.rePassLogin-error');

// Truy vấn nút đăng nhập, đăng ký
const dangNhapBtn = document.querySelector('.dang-nhap-btn');
const dangKyBtn = document.querySelector('.dang-ky-btn');

// Hàm get type password
function getTypePassword(paramValue) {
    paramValue.type = paramValue.type === 'text' ? 'password' : 'text';
}
// icon Eye show password dang nhap
iconEyeHide.addEventListener('click', () => {
    iconEyeHide.style.display = 'none';
    iconEyeShow.style.display = 'block';
    getTypePassword(password_dang_nhap);
})
// icon Eye hide password dang nhap
iconEyeShow.addEventListener('click', () => {
    iconEyeHide.style.display = 'block';
    iconEyeShow.style.display = 'none';
    getTypePassword(password_dang_nhap);
})
// icon Eye show password dang ky
form2EyeHide.addEventListener('click', () => {
    form2EyeHide.style.display = 'none';
    form2EyeShow.style.display = 'block';
    getTypePassword(password);
})
// icon Eye hide pass
form2EyeShow.addEventListener('click', () => {
    form2EyeHide.style.display = 'block';
    form2EyeShow.style.display = 'none';
    getTypePassword(password);
})

// icon Eye show password
form2EyeHideRePass.addEventListener('click', () => {
    form2EyeHideRePass.style.display = 'none';
    form2EyeShowRePass.style.display = 'block';
    getTypePassword(re_password);
})
// icon Eye hide pass
form2EyeShowRePass.addEventListener('click', () => {
    form2EyeHideRePass.style.display = 'block';
    form2EyeShowRePass.style.display = 'none';
    getTypePassword(re_password);
})

// Layout Đăng nhập
dangNhap.addEventListener('click', () => {
    dangNhap.classList.add('white');
    dangKy.classList.remove('white');
    form2.style.display = 'none';
    form1.style.display = 'block';
})
// Layout Đăng Ký
dangKy.addEventListener('click', () => {
    dangNhap.classList.remove('white');
    dangKy.classList.add('white');
    form1.style.display = 'none';
    form2.style.display = 'block';
})
// Đăng ký ngay button event
dangKyNgayBtn.addEventListener('click', () => {
    dangNhap.classList.remove('white');
    dangKy.classList.add('white');
    form1.style.display = 'none';
    form2.style.display = 'block';
})

// Sự kiện ấn nút đăng nhập
dangNhapBtn.addEventListener('click', () => {
    if (validateDangNhap()) {
        password_dang_nhap_error.innerHTML = '';
    }
})
// Sự kiện ấn nút đăng ký
dangKyBtn.addEventListener('click', () => {
    if(validateDangKy()) {
        rePassLogin_error.innerHTML = 'Mật khẩu đã khớp'
    }
})

// Kiểm tra password
function testUppercase(val) {
    let text = val.value.trim();
    uppercase = false;
    for(let i = 0; i < text.length; i ++) {
        if (text[i] === text[i].toUpperCase()) {
            uppercase = true;
            break;
        } else {
            uppercase = false;
        }
    }
    return uppercase;
}
function testLowercase(val) {
    let text = val.value.trim();
    lowercase = false;
    for(let i = 0; i < text.length; i ++) {
        if (text[i] === text[i].toLowerCase()) {
            lowercase = true;
            break;
        } else {
            lowercase = false;
        }
    }
    return lowercase;
}
function testNumber(val) {
    let text = val.value.trim();
    number = false;
    for(let i = 0; i < text.length; i ++) {
        if (!isNaN(text[i])) {
            number = true;
            break;
        } else {
            number = false;
        }
    }
    return number;
}
function testLength(val) {
    let text = val.value.trim();
    length = false;
    for(let i = 0; i < text.length; i ++){
        if (text.length >= 8) {
            length = true;
            break;
        } else {
            length = false;
        }
    }
    return length;
}
// End kiểm tra password
// ---------------------------------------------------------------------
function validateDangNhap() {
    let result = true;
    if (phone_dang_nhap.value.trim() === '') {
        phone_dang_nhap_error.innerHTML = 'Chưa nhập số điện thoại';
        result = false;
    }
    else if (!Number(phone_dang_nhap.value)) {
        phone_dang_nhap_error.innerHTML = 'Số điện thoại phải là số';
        result = false;
    }
    else if (password_dang_nhap.value.trim() === '') {
        phone_dang_nhap_error.innerHTML = '';
        password_dang_nhap_error.innerHTML = 'Chưa nhập mật khẩu';
        result = false;
    }
    else if (!testUppercase(password_dang_nhap)) {
        password_dang_nhap_error.innerHTML = 'Phải có 1 ký tự in hoa';
        result = false;
    }
    else if (!testLowercase(password_dang_nhap)) {
        password_dang_nhap_error.innerHTML = 'Phải có 1 ký tự thường';
        result = false;
    }
    else if (!testNumber(password_dang_nhap)) {
        password_dang_nhap_error.innerHTML = 'Phải có 1 số';
        result = false;
    }
    else if (!testLength(password_dang_nhap)) {
        password_dang_nhap_error.innerHTML = 'Phải từ 8 ký tự trở lên';
        result = false;
    }
    return result;
}

// Hàm Validate form
function validateDangKy() {
    let result = true;
    if (fullName.value.trim() === '') {
        nameLogin_error.innerHTML = 'Chưa nhập tên';
        result = false;
    }
    else if (phone.value.trim() === '') {
        nameLogin_error.innerHTML = '';
        phoneLogin_error.innerHTML = 'Chưa nhập số điện thoại';
        result = false;
    }
    else if (!Number(phone.value)) {
        phoneLogin_error.innerHTML = 'Số điện thoại phải là số';
        result = false;
    }
    else if (!validateEmail()) {
        phoneLogin_error.innerHTML = '';
        result = false;
    }
    else if (password.value.trim() === '') {
        emailLogin_error.innerHTML = ''
        passLogin_error.innerHTML = 'Chưa nhập mật khẩu';
        result = false;
    }
    else if (!testUppercase(password)) {
        passLogin_error.innerHTML = 'Phải có 1 ký tự in hoa';
        result = false;
    }
    else if (!testLowercase(password)) {
        passLogin_error.innerHTML = 'Phải có 1 ký tự thường';
        result = false;
    }
    else if (!testNumber(password)) {
        passLogin_error.innerHTML = 'Phải có 1 số';
        result = false;
    }
    else if (!testLength(password)) {
        passLogin_error.innerHTML = 'Phải từ 8 ký tự trở lên';
        result = false;
    }
    else if (re_password.value.trim() === '') {
        passLogin_error.innerHTML = '';
        rePassLogin_error.innerHTML = 'Vui lòng nhập lại mật khẩu'
        result = false;
    }
    else if (re_password.value !== password.value) {
        rePassLogin_error.innerHTML = 'Mật khẩu chưa khớp nhau'
        result = false;
    }
    return result;
}

function validateEmail() {
    let result = true;
    if (email.value === '') {
        emailLogin_error.innerHTML = 'Chưa nhập email'
        result = false;
    }
    else if (email.value.includes("@") === false || email.value.includes(".") === false) {
        emailLogin_error.innerHTML = 'Email phải có 1 ký tự [@] và 1 dấu [.]'
        result = false;
    }
    else if (email.value.charAt(0) === "@"|| email.value.charAt(email.value.length-1) === "@") {
        emailLogin_error.innerHTML = '[@] không được ở vị trí đầu hoặc cuối'
        result = false;
    }
    else if (email.value.charAt(0) === "."|| email.value.charAt(email.value.length-1) === ".") {
        emailLogin_error.innerHTML = 'Dấu [.] không được ở vị trí đầu hoặc cuối'
        result = false;
    }
    return result;
}

// forget-pass-popup
const forgetPopup = document.querySelector('.forget-pass-popup');
const forget_close = document.querySelector('.forget-pass-popup-container .close');
const forget_overlay = document.querySelector('.forget-pass-popup-overlay');
const forget_input = document.querySelector('.forget-input input');
const forget_input_text_error = document.querySelector('.forget-input .forget-input-text-error');
const forget_submit = document.querySelector('.forget-submit input');
const forget_pass = document.querySelector('.form1 .forget-pass');
forget_pass.addEventListener('click', () => {
    forgetPopup.classList.add('forget-pass-popup-open');
})
forget_close.addEventListener('click', () => {
    forgetPopup.classList.remove('forget-pass-popup-open');
})
forget_overlay.addEventListener('click', () => {
    forgetPopup.classList.remove('forget-pass-popup-open');
})
// Event forget submit input click
forget_submit.addEventListener('click', () => {
    if (validateForgetSubmit()) {
        forget_input_text_error.innerHTML = 'Mật khẩu sẽ được gửi qua tin nhắn!';
        forget_input_text_error.style.color = '#028109';
    }
})

function validateForgetSubmit() {
    let result = true;
    if (forget_input.value.trim() === '') {
        forget_input_text_error.style.color = '#d70018';
        forget_input_text_error.innerHTML = 'Chưa nhập số điện thoại';
        result = false;
    }
    else if (!Number(forget_input.value)) {
        forget_input_text_error.style.color = '#d70018';
        forget_input_text_error.innerHTML = 'Số điện thoại phải là số';
        result = false;
    }
    return result;
}