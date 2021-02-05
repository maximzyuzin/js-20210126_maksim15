/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const pathArr = path.split('.');

    return function (obj) {
        let value = null;

        for (const item of pathArr) {
            value = obj[item];
            if (value === undefined) {
                return;
            }
            obj = value;
        }
        return value;
    };
}