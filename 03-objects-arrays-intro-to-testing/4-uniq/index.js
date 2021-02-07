/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    switch (arr) {
        case undefined:
            return [];
    }

    let newArr = [];

    const setValue = new Set(arr);
    newArr = Array.from(setValue);

    return newArr;

    // Либо вместо строк 12-17 написать одной строкой:
    // return Array.from(new Set(arr));
}