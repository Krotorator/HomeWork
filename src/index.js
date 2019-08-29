/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
// function forEach(array, fn) {
//     for (var i = 0; i < array.length; i++) {
//         elem = array[i];
//         index = i;
//         fn(elem, index, array);
//     }
// }

function forEach(array, fn) {
    let elem, index, arr;

    for (var i = 0; i < array.length; i++) {
        elem = array[i];
        index = i;
        arr = array;
        fn(elem, index, arr);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let elem, index, arr;
    let newArr = [];

    for (var i = 0; i < array.length; i++) {
        elem = array[i];
        index = i;
        arr = array;
        newArr.push(fn(elem, index, arr));
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
    let elem, index, arr, start, accum;

    if (!initial) {
        accum = array[0];
        start = 1;
    } else if (initial) {
        accum = initial;
        start = 0;
    }

    for (var i = start; i < array.length; i++) {
        index = i;
        elem = array[i];
        arr = array;
        accum = fn(accum, elem, index, arr);
    }

    return accum;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arrOfKeys = [];

    for (let key in obj) {
        if (key) {
            arrOfKeys.push(key.toUpperCase());
        }
    }

    return arrOfKeys;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let start = from || 0;
    let end = to;
    let newArr = [];

    if (end < 0) {
        end = array.length - Math.abs(to);
    } else if (end > array.length) {
        end = array.length;
    }
    if (start < 0 && array.length + start < array.length) {
        start = array.length + start;
    }
    if (start < 0 && array.length + start < array.length) {
        start = 0;
    }
    if (end < start) {
        return (newArr = []);
    }
    for (var i = start; i < end; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, val) {
            if (typeof val == 'number') {
                return (target[prop] = val * val);
            }

            return (target[prop] = val + val);
        }
    });
}

export { forEach, map, reduce, upperProps, slice, createProxy };
