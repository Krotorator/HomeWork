/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
    const cookiesExist = parseCookies();

    if (addNameInput.value != '' || addValueInput.value != '') {
        listTable.innerHTML = '';
        for (const name in cookiesExist) {
            addCookie(name, cookiesExist[name]);
        }
    }

    addNameInput.value = '';
    addValueInput.value = '';
});

window.addEventListener('load', () => {
    if (document.cookie) {
        const cookies = parseCookies();

        for (const name in cookies) {
            addCookie(name, cookies[name]);
        }
    }
});

function addCookie(name, value) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const deleteBtn = document.createElement('button');

    td1.innerText = name;
    td2.innerText = value;
    deleteBtn.innerText = 'Delete this cookie';
    tr.append(td1, td2, deleteBtn);
    listTable.append(tr);
    deleteBtn.addEventListener('click', () => {
        deleteCookie(name);
        deleteBtn.parentElement.remove();
    });
}

function deleteCookie(cookieName) {
    var cookieDate = new Date(); // Текущая дата и время

    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = cookieName += '=; expires=' + cookieDate.toGMTString();
}

function parseCookies() {
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    return cookies;
}
