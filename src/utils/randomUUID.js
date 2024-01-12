function generateUUID() {
    let crypto = window.crypto || window.msCrypto;

    // Создаем массив из 4 случайных чисел типа Uint32
    let array = new Uint32Array(4);
    crypto.getRandomValues(array);

    // Преобразуем каждое число в 8 шестнадцатеричных цифр и объединяем
    let uuid = '';
    for (let i = 0; i < array.length; i++) {
        uuid += array[i].toString(16).padStart(8, '0');
    }

    // Добавляем разделители в нужные места
    uuid = uuid.substr(0, 8) + '-' + uuid.substr(8, 4) + '-' + uuid.substr(12, 4) + '-' + uuid.substr(16, 4) + '-' + uuid.substr(20);

    return uuid;
}

let randomUUID = generateUUID();

export default generateUUID;