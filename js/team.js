const setParentErrorMessage = (element, message) => {
  const parent = element.closest(".contact-form-item");
  if (!parent) return;
  if (message) {
    parent.setAttribute("data-after", message);
    parent.classList.add("error");
    return;
  }
  parent.classList.remove("error");
  parent.setAttribute("data-after", "");
  return;
};
const form = document.getElementById("contact-form");
const btnSubmit = form.querySelector("#btn-submit");
const inputName = form.querySelector("#input-name");
const inputPhone = form.querySelector("#input-phone");
const inputEmail = form.querySelector("#input-email");
const inputMessage = form.querySelector("#input-message");
const inputAddress = form.querySelector("#input-address");

btnSubmit.addEventListener("mouseup", (e) => {
  const name = inputName?.value?.trim();
  const phone = inputPhone?.value?.trim();
  const email = inputEmail?.value?.trim();
  const message = inputMessage?.value?.trim();
  const address = inputAddress?.value?.trim();
  function isVietnamesePhoneNumber(number) {
    return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
  }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  let nameError = name ? "" : "Vui lòng nhập tên";
  let phoneError = phone ? "" : "Vui lòng nhập số điện thoại";
  let emailError = email ? "" : "Vui lòng nhập email";
  let messageError = message ? "" : "Vui lòng nhập nội dung";
  let addressError = address ? "" : "Vui lòng nhập địa chỉ";

  if (email && !validateEmail(email)) emailError = "Email không đúng định dạng";
  if (phone && !isVietnamesePhoneNumber(phone))
    phoneError = "Số điện thoại không đúng";

  setParentErrorMessage(inputName, nameError);
  setParentErrorMessage(inputPhone, phoneError);
  setParentErrorMessage(inputEmail, emailError);
  setParentErrorMessage(inputMessage, messageError);
  setParentErrorMessage(inputAddress, addressError);
  if (
    !nameError &&
    !phoneError &&
    !emailError &&
    !messageError &&
    !addressError
  ) {
    // Tạo một div mới cho popup
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "1000";

    // Thêm nội dung vào popup
    popup.innerHTML = `
          <h2>Gửi thành công</h2>
          <p>Chúng tôi sẽ liên hệ với bạn sớm!</p>
          <button id="close-popup">Đóng</button>
        `;

    // Thêm popup vào trang
    document.body.appendChild(popup);
    document.getElementById("overlay").style.display = "block";
    // Reset each input field individually
    inputName.value = "";
    inputPhone.value = "";
    inputEmail.value = "";
    inputMessage.value = "";
    inputAddress.value = "";
    // Thêm sự kiện click cho nút đóng
    document.getElementById("close-popup").addEventListener("click", () => {
      document.body.removeChild(popup);
      document.getElementById("overlay").style.display = "none";
    });
  }
});
