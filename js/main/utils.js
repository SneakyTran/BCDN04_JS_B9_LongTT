/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo check limit of input
 * @param {Number} inputLength
 * @param {Number} min
 * @param {Number} max
 * @returns 1:valid / 0:invalid
 */
 function isValidLength(input, min, max) {
    return input >= min && input <= max ? 1 : 0;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Check the input string is empty or not
 * @param {string} str
 * @returns 1:is empty / 0: not empty
 */
function isEmpty(str) {
    return str === "" ? 1 : 0;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Message empty input
 * @param {String} str
 * @returns message
 */
function messageEmpty(str) {
    return str + MESSAGE_EMPTY;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Message limited input value
 * @param {*} inputStr
 * @param {*} min
 * @param {*} max
 * @returns message
 */
function messageLimitCharater(inputStr, min, max) {
    return (
        inputStr + MESSAGE_LIMIT_BEGIN + min + "-" + max + MESSAGE_STRING_CHAR
    );
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo check inputStr is contain only numbers or not
 * @param {String} inputStr
 * @returns 1: true / 0: false
 */
function isNumber(inputStr) {
    var regex = /^\d+$/;
    return inputStr.match(regex) ? 1 : 0;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Message the input string must contain only number
 * @param {String} inputStr
 * @returns message
 */
function messageContainOnlyNumber(inputStr) {
    return inputStr + MESSAGE_NUMBER_ONLY;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Check the input string contain only characters or not
 * @param {String} inputStr
 * @returns 1: true  0: false
 */
function isCharacter(inputStr) {
    var regex = /^[a-zA-Z]+$/;
    return inputStr.match(regex) ? 1 : 0;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Message the input string must be contain only character
 * @param {String} inputStr
 * @returns message
 */
function messageContainOnlyCharacter(inputStr) {
    return inputStr + MESSAGE_CHARACTER_ONLY;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo check inputEmail is a email or not
 * @param {String} inputEmail
 * @returns 1: valid email  2: invalid email
 */
function isValidEmail(inputEmail) {
    var regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return inputEmail.match(regex) ? 1 : 0;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Message if input email is invalid
 * @param {String} inputStr
 * @returns message
 */
function messageInValidEmail(inputStr) {
    return inputStr + MESSAGE_INVALID;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo check password is valid or invalid
 * @param {*} inputPassword
 * @returns 1: valid  0:invalid
 */
function isValidPassword(inputPassword) {
    var regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    return inputPassword.match(regex) ? 1 : 0;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo message if password is invalid
 * @param {String} inputPassword
 * @returns message
 */
function messageInvalidPassword(inputPassword) {
    return inputPassword + MESSAGE_PASSWORD;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo check Date format mm/dd/yyyy
 * @param {String} inputDate
 * @returns 1: valid  0: invalid
 */
function isValidDate(inputStr) {
    var regex =
        /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
    return inputStr.match(regex) ? 1 : 0;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Message Date format mm/dd/yyyy
 * @param {String} inputDate
 * @returns message
 */
function messageInvalidDate(inputDate) {
    return inputDate + MESSAGE_DATE_FORMAT;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo message if limit of input is invalid
 * @param {Number} inputNumber
 * @param {Number} min
 * @param {Number} max
 * @returns message
 */
function messageLimit(inputNumber, min, max) {
    return inputNumber + MESSAGE_LIMIT_BEGIN + min + "-" + max;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo check role is valid or not
 * @param {String} inputRole
 * @returns 1: valid   0:invalid
 */
function isValidRole(inputRole) {
    return inputRole == "X" ? 0 : 1;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo message if role is invalid
 * @param {String} inputRole
 */
function messageInvalidRole(inputRole) {
    return MESSAGE_ROLE + inputRole;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo toggle display of message span
 * @param {String} id
 * @param {Number} value
 */
function toggleMessage(id, value) {
    if (value == 1) {
        document.getElementById(id).style.display = "block";
    } else if (value == 0) {
        document.getElementById(id).style.display = "none";
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo check the account inputed is exists or not
 * @param {String} empAccount
 * @returns 1: exist  0: not exist
 */
function isExistAccount(empAccount) {
    if (listEmployee.length > 0) {
        return listEmployee.some(function (element) {
            return element.account === empAccount;
        });
    } else {
        return 0;
    }
}

function isValidAccountAndPassword(employee) {
    return listEmployee.some(function (emp) {
        return (
            emp.password == employee.password && emp.account == employee.account
        );
    });
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo message existed account
 * @param {String} empAccount
 * @returns
 */
function messageExistAccount(empAccount) {
    return empAccount + MESSAGE_EXIST_ACCOUNT;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo message if account is not exist
 * @param {String} empAccount
 * @returns message
 */
function messageNotExistAccount(empAccount) {
    return empAccount + MESSAGE_NOT_EXIST_ACCOUNT;
}