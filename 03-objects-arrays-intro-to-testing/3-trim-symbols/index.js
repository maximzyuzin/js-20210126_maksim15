/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    switch (size) {
        case 0:
            return '';
        case undefined:
            return string;
    }

    let newStr = '';
    let currentSym = '';
    let countSym = 0;

    for (const sym of string) {
        if (sym === currentSym) {
            if (countSym < size) {
                countSym = countSym + 1;
                newStr = newStr + sym;
            }
        } else {
            currentSym = sym;
            countSym = 1;
            newStr = newStr + sym;
        }
    }

    return newStr;
}