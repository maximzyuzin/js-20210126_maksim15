/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let sortArr = [...arr];
    let restCompare = 0;

    sortArr.sort(function (str1, str2) {
        if (param === 'desc') {
            restCompare = str1.localeCompare(str2, 'ru-en', { caseFirst: 'lower' }) * (-1);
        } else {
            restCompare = str1.localeCompare(str2, 'ru-en', { caseFirst: 'upper' });
        }
        return restCompare;
    });

    return sortArr;
}
