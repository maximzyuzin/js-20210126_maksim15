/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    let newObj = {};
    let arrs = Object.entries(obj);

    for (let arr of arrs) {
        let key = arr[0];
        let value = arr[1];

        for (let i = 0; i < fields.length; i++) {
            if (fields[i] === key) {
                newObj[key] = value;
            }
        }
    }
    return newObj;
}