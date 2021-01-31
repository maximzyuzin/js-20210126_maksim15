/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    let newObj = {};
    let arrs = Object.entries(obj);

    let i = 0;
    let j = 0;

    while (i < arrs.length) {
        while (j <= fields.length) {
            if (fields[j] === arrs[i][0]) {
                arrs.splice(i, 1);
                if (fields.length - 1 === j) {
                    break;
                } else {
                    j = j + 1;
                    break;
                }
            } else {
                i = i + 1;
                break;
            }
        }
    }

    if (arrs.length !== 0) {
        for (let k = 0; k < arrs.length; k++) {
            newObj[arrs[k][0]] = arrs[k][1];
        }
    }

    return newObj;
}