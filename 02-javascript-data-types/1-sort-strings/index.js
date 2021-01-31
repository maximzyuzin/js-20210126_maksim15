/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let sortArr = [...arr];
    let lenArr = arr.length;

    for (let i = 0; i < lenArr - 1; i++) {
        for (let j = 0; j < lenArr - 1 - i; j++) {

            let strLower1 = sortArr[j].toLowerCase();
            let strLower2 = sortArr[j + 1].toLowerCase();

            if (strLower1.localeCompare(strLower2) === 0) {
                if (sortArr[j].localeCompare(sortArr[j + 1]) < 0) {
                    let temp = sortArr[j + 1];
                    sortArr[j + 1] = sortArr[j];
                    sortArr[j] = temp;
                }
            } else {
                if (sortArr[j].localeCompare(sortArr[j + 1]) > 0) {
                    let temp = sortArr[j + 1];
                    sortArr[j + 1] = sortArr[j];
                    sortArr[j] = temp;
                }
            }
        }
    }

    if (param == 'desc') {
        sortArr = sortArr.reverse();
    }

    return sortArr;
}
