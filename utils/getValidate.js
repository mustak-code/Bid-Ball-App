const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const phoneNumberRegex = /^(?:\+88|0088)?01[3-9]\d{8}$/;
export const validateEmail = (email) => emailRegex.test(email);

export const validatePassword = (password) => passwordRegex.test(password);
export const validatePhoneNumber = (phoneNumber) =>
    phoneNumberRegex.test(phoneNumber);
