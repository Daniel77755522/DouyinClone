import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secure-secret-key';

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const hashString = (str) => {
    return CryptoJS.SHA256(str).toString();
};
