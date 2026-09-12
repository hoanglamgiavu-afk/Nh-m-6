"use strict";

const form = document.getElementById("registerForm");
const formStatus = document.getElementById("formStatus");

const fields = {
    fullName: {
        input: document.getElementById("fullName"),
        error: document.getElementById("fullNameError")
    },
    email: {
        input: document.getElementById("email"),
        error: document.getElementById("emailError")
    },
    interest: {
        input: document.getElementById("interest"),
        error: document.getElementById("interestError")
    }
};

function setError(fieldName, message) {
    const field = fields[fieldName];

    field.input.classList.add("invalid");
    field.error.textContent = message;
}

function clearError(fieldName) {
    const field = fields[fieldName];

    field.input.classList.remove("invalid");
    field.error.textContent = "";
}

function validateForm() {
    let isValid = true;

    Object.keys(fields).forEach(clearError);

    const fullName = fields.fullName.input.value.trim();
    const email = fields.email.input.value.trim();
    const interest = fields.interest.input.value;

    if (fullName.length < 2) {
        setError("fullName", "Vui lòng nhập họ và tên hợp lệ.");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        setError("email", "Vui lòng nhập đúng định dạng email.");
        isValid = false;
    }

    if (!interest) {
        setError("interest", "Vui lòng chọn nội dung bạn quan tâm.");
        isValid = false;
    }

    return isValid;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    formStatus.classList.remove("show");
    formStatus.textContent = "";

    if (!validateForm()) {
        return;
    }

    const submitButton = form.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Đang gửi...";

    // Mô phỏng gửi dữ liệu đến hệ thống.
    setTimeout(function () {
        formStatus.textContent =
            "✓ Đăng ký thành công! Hồ sơ của bạn đang được duyệt.";

        formStatus.classList.add("show");

        form.reset();

        submitButton.disabled = false;
        submitButton.innerHTML = "Gửi đăng ký <span>→</span>";
    }, 800);
});

Object.values(fields).forEach(function (field) {
    field.input.addEventListener("input", function () {
        field.input.classList.remove("invalid");
        field.error.textContent = "";
    });

    field.input.addEventListener("change", function () {
        field.input.classList.remove("invalid");
        field.error.textContent = "";
    });
});
