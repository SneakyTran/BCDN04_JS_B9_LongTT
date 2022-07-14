//todo ====================VALIDATION=========================
const ACCOUNT_LENGTH_MIN = 4;
const ACCOUNT_LENGTH_MAX = 6;
const PASSWORD_LENGTH_MIN = 6;
const PASSWORD_LENGTH_MAX = 10;
const SALARY_MIN = 1e6;
const SALARY_MAX = 20e6;
const TIME_WORK_MIN = 80;
const TIME_WORK_MAX = 200;

const STATUS_ADD_FUNCTION = 1;
const STATUS_UPDATE_FUNCTION = 2;

var listEmployee = getDataFromLocalStorage();
if (listEmployee.length > 0) {
    displayAllEmployee(null, 1);
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo get data from local storage
 * @returns
 */
function getDataFromLocalStorage() {
    let listEmployee = localStorage.getItem("emp");
    console.log("first");
    if (listEmployee) {
        return (listEmployee = JSON.parse(localStorage.getItem("emp")));
    } else {
        return [];
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo save list employee to local storage
 */
function saveToLocalStorage() {
    if (listEmployee.length > 0) {
        localStorage.setItem("emp", JSON.stringify(listEmployee));
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo convert role due to value of select input
 * @returns role
 */
function getRole(role) {
    switch (role) {
        case "B":
            return "Sếp";

        case "M":
            return "Trưởng phòng";

        case "E":
            return "Nhân viên";

        default:
            return;
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo calculate total salary base on their role
 * @returns total salary
 */
function totalSalary(role, basicSalary) {
    switch (role) {
        case "B":
            return basicSalary * BOSS_SALARY_RATE;

        case "M":
            return basicSalary * MANAGER_SALARY_RATE;

        case "E":
            return basicSalary;

        default:
            return 0;
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo define the rank of employee due to time working
 * @returns empRank
 */
function getRank(timeWork) {
    if (timeWork >= 192) {
        return RANK_EMP_192;
    } else if (timeWork >= 176) {
        return RANK_EMP_176;
    } else if (timeWork >= 160) {
        return RANK_EMP_160;
    } else {
        return RANK_EMP_UNDER_160;
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Validate Employee that inputed from form input by users
 * @param {Employee} employee
 * @param {Number} status => 1: add new     2: update
 * @returns 1: valid Employee    0: invalid Employee
 */
function isValidInput(employee, status) {
    var isValid = [0, 0, 0, 0, 0, 0, 0, 0];
    var index = 0;
    //check account
    if (isEmpty(employee.account)) {
        document.getElementById("tbTKNV").innerHTML =
            messageEmpty(STRING_ACCOUNT);
        toggleMessage("tbTKNV", 1);
    } else if (!isNumber(employee.account)) {
        document.getElementById("tbTKNV").innerHTML =
            messageContainOnlyNumber(STRING_ACCOUNT);
        toggleMessage("tbTKNV", 1);
    } else if (
        !isValidLength(
            employee.account.length,
            ACCOUNT_LENGTH_MIN,
            ACCOUNT_LENGTH_MAX
        )
    ) {
        document.getElementById("tbTKNV").innerHTML = messageLimitCharater(
            STRING_ACCOUNT,
            ACCOUNT_LENGTH_MIN,
            ACCOUNT_LENGTH_MAX
        );
        toggleMessage("tbTKNV", 1);
    } else if (isExistAccount(employee.account) && status == 1) {
        document.getElementById("tbTKNV").innerHTML =
            messageExistAccount(STRING_ACCOUNT);
        toggleMessage("tbTKNV", 1);
    } else if (!isExistAccount(employee.account) && status == 2) {
        document.getElementById("tbTKNV").innerHTML =
            messageNotExistAccount(STRING_ACCOUNT);
        toggleMessage("tbTKNV", 1);
    } else {
        isValid[index] = 1;
        index++;
        toggleMessage("tbTKNV", 0);
    }

    //check fullName
    if (isEmpty(employee.fullName)) {
        document.getElementById("tbTen").innerHTML =
            messageEmpty(STRING_FULLNAME);
        toggleMessage("tbTen", 1);
    } else if (!isCharacter(employee.fullName)) {
        document.getElementById("tbTen").innerHTML =
            messageContainOnlyCharacter(STRING_FULLNAME);
        toggleMessage("tbTen", 1);
    } else {
        isValid[index] = 1;
        index++;
        toggleMessage("tbTen", 0);
    }

    //check email
    if (isEmpty(employee.email)) {
        document.getElementById("tbEmail").innerHTML =
            messageEmpty(STRING_EMAIL);
        toggleMessage("tbEmail", 1);
    } else if (!isValidEmail(employee.email)) {
        document.getElementById("tbEmail").innerHTML =
            messageInValidEmail(STRING_EMAIL);
        toggleMessage("tbEmail", 1);
    } else {
        isValid[index] = 1;
        index++;
        toggleMessage("tbEmail", 0);
    }

    //check password
    if (isEmpty(employee.password)) {
        document.getElementById("tbMatKhau").innerHTML =
            messageEmpty(STRING_PASSWORD);
        toggleMessage("tbMatKhau", 1);
    } else if (
        !isValidLength(
            employee.password.length,
            PASSWORD_LENGTH_MIN,
            PASSWORD_LENGTH_MAX
        )
    ) {
        document.getElementById("tbMatKhau").innerHTML = messageLimitCharater(
            STRING_PASSWORD,
            PASSWORD_LENGTH_MIN,
            PASSWORD_LENGTH_MAX
        );
        toggleMessage("tbMatKhau", 1);
    } else if (!isValidPassword(employee.password)) {
        document.getElementById("tbMatKhau").innerHTML =
            messageInvalidPassword(STRING_PASSWORD);
        toggleMessage("tbMatKhau", 1);
    } else {
        isValid[index] = 1;
        index++;
        toggleMessage("tbMatKhau", 0);
    }

    //check begin work date
    if (isEmpty(employee.dateBeginWork)) {
        document.getElementById("tbNgay").innerHTML = messageEmpty(
            STRING_DATE_BEGIN_WORK
        );
        toggleMessage("tbNgay", 1);
    } else if (!isValidDate(employee.dateBeginWork)) {
        document.getElementById("tbNgay").innerHTML = messageInvalidDate(
            STRING_DATE_BEGIN_WORK
        );
        toggleMessage("tbNgay", 1);
    } else {
        isValid[index] = 1;
        index++;
        toggleMessage("tbNgay", 0);
    }

    //check basic salary
    if (isEmpty(employee.basicSalary)) {
        document.getElementById("tbLuongCB").innerHTML =
            messageEmpty(STRING_BASIC_SALARY);
        toggleMessage("tbLuongCB", 1);
    } else if (
        !isValidLength(Number(employee.basicSalary), SALARY_MIN, SALARY_MAX)
    ) {
        document.getElementById("tbLuongCB").innerHTML = messageLimit(
            STRING_BASIC_SALARY,
            SALARY_MIN,
            SALARY_MAX
        );
        toggleMessage("tbLuongCB", 1);
    } else {
        isValid[index] = 1;
        index++;
        toggleMessage("tbLuongCB", 0);
    }

    //check role
    if (!isValidRole(employee.role)) {
        document.getElementById("tbChucVu").innerHTML =
            messageInvalidRole(STRING_ROLE);
        toggleMessage("tbChucVu", 1);
    } else {
        isValid[index] = 1;
        index++;
        toggleMessage("tbChucVu", 0);
    }

    //check time work
    if (isEmpty(employee.timeWork)) {
        document.getElementById("tbGiolam").innerHTML =
            messageEmpty(STRING_TIME_WORK);
        toggleMessage("tbGiolam", 1);
    } else if (
        !isValidLength(Number(employee.timeWork), TIME_WORK_MIN, TIME_WORK_MAX)
    ) {
        document.getElementById("tbGiolam").innerHTML = messageLimit(
            STRING_TIME_WORK,
            TIME_WORK_MIN,
            TIME_WORK_MAX
        );
        toggleMessage("tbGiolam", 1);
    } else {
        isValid[index] = 1;
        index++;
        toggleMessage("tbGiolam", 0);
    }

    for (let i = 0; i < isValid.length; i++) {
        if (isValid[i] == 0) {
            return 0;
        }
    }
    return 1;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Add new employee
 * @returns 1: add successfully   0: add unsuccessfully
 */
function addEmployee() {
    var account = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var datePicker = document.getElementById("datepicker").value.toString();
    var basicSalary = document.getElementById("luongCB").value;
    var role = document.getElementById("chucvu").value;
    var timeWork = document.getElementById("gioLam").value;
    var employee = new Employee(
        account,
        fullName,
        email,
        password,
        datePicker,
        basicSalary,
        role,
        timeWork
    );
    if (isValidInput(employee, STATUS_ADD_FUNCTION)) {
        listEmployee.push(employee);
        localStorage.setItem("employees", listEmployee);
        displayNewEmployee(employee);
        saveToLocalStorage();
        return 1;
    } else {
        return 0;
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo create new cell
 * @param {String} strText
 * @returns newCellNode
 */
function createCellTextNode(strText) {
    var newCellNode = document.createElement("td");
    newCellNode.innerHTML = strText;
    return newCellNode;
}

/**
 * Author: Sneaky
 * Date Created: 14/07/2022
 * todo create checkbox cell
 * @param {String} empAccount
 * @returns checkbox node
 */
function createCellDeleteCheckbox(employee) {
    var newCellNode = document.createElement("td");
    var newCheckboxNode = document.createElement("input");
    newCheckboxNode.setAttribute("type", "checkbox");
    newCheckboxNode.value = employee.account;
    newCellNode.append(newCheckboxNode);
    var newEditNode = document.createElement("i");
    newEditNode.classList.add("icon--delete", "fa", "fa-edit");
    newEditNode.setAttribute("data-toggle", "modal");
    newEditNode.setAttribute("data-target", "#myModal");
    newEditNode.onclick = function () {
        document.getElementById("tknv").value = employee.account;
        document.getElementById("name").value = employee.fullName;
        document.getElementById("email").value = employee.email;
        document.getElementById("password").value = employee.password;
        document.getElementById("datepicker").value = employee.dateBeginWork;
        document.getElementById("luongCB").value = employee.basicSalary;
        document.getElementById("chucvu").value = employee.role;
        document.getElementById("gioLam").value = employee.timeWork;
    };
    var newToolTip = document.createElement("span");
    newToolTip.classList.add("tooltiptext");
    newToolTip.innerHTML = "Edit";
    newEditNode.append(newToolTip);
    newCellNode.append(newEditNode);
    return newCellNode;
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Create new row that contain employee value
 * @param {Employee} employee
 */
function createRowNode(employee) {
    var newRowNode = document.createElement("tr");
    newRowNode.classList.add("myRow");
    newRowNode.append(createCellTextNode(employee.account));
    newRowNode.append(createCellTextNode(employee.fullName));
    newRowNode.append(createCellTextNode(employee.email));
    newRowNode.append(createCellTextNode(employee.dateBeginWork));
    newRowNode.append(createCellTextNode(getRole(employee.role)));
    newRowNode.append(
        createCellTextNode(totalSalary(employee.role, employee.basicSalary))
    );
    newRowNode.append(createCellTextNode(getRank(employee.timeWork)));
    newRowNode.append(createCellDeleteCheckbox(employee));
    document.getElementById("tableDanhSach").append(newRowNode);
}

/**
 * Author: Sneaky
 * Date Created: 14/07/2022
 * todo Delete content of employee
 */
function clearTable() {
    var newTbody = document.createElement("tbody");
    newTbody.id = "tableDanhSach";
    var oldTbody = document.getElementById("tableDanhSach");
    oldTbody.parentNode.replaceChild(newTbody, oldTbody);
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo display all employee to the employee table
 */
function displayAllEmployee(filterList, status) {
    if (status == 1) {
        if (listEmployee.length > 0) {
            listEmployee.forEach((emp) => {
                createRowNode(emp);
            });
        }
    } else if (status == 2) {
        if (filterList.length > 0) {
            filterList.forEach((emp) => {
                createRowNode(emp);
            });
        }
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo update the emp table after adding new emp
 * @param {Employee} employee
 */
function displayNewEmployee(employee) {
    if (employee != null) {
        createRowNode(employee);
    }
}

/**
 * Author: Sneaky
 * Date Created: 14/07/2022
 * todo delete employee
 */
function deleteEmp() {
    var checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            listEmployee.splice(i, 1);
        }
    }
    clearTable();
    displayAllEmployee(null, 1);
    saveToLocalStorage();
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * @param {String} account
 * @returns index
 */
function getIndexByAccount(account) {
    if (listEmployee.length > 0) {
        for (let i = 0; i < listEmployee.length; i++) {
            if (account == listEmployee[i].account) {
                return i;
            }
        }
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo update employee
 */
function updateEmp() {
    var account = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var datePicker = document.getElementById("datepicker").value.toString();
    var basicSalary = document.getElementById("luongCB").value;
    var role = document.getElementById("chucvu").value;
    var timeWork = document.getElementById("gioLam").value;
    var employee = new Employee(
        account,
        fullName,
        email,
        password,
        datePicker,
        basicSalary,
        role,
        timeWork
    );
    if (isValidInput(employee, STATUS_UPDATE_FUNCTION)) {
        var index = getIndexByAccount(account);
        listEmployee[index] = employee;
        clearTable();
        displayAllEmployee(null, 1);
        saveToLocalStorage();
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo filter rank of employee
 */
function findEmployee() {
    var inputSearch = document.getElementById("searchName").value;
    if (inputSearch === "") {
        clearTable();
        displayAllEmployee(null, 1);
    } else if (
        inputSearch.toLowerCase() == RANK_EMP_192.toLowerCase() ||
        inputSearch.toLowerCase() == RANK_EMP_176.toLowerCase() ||
        inputSearch.toLowerCase() == RANK_EMP_160.toLowerCase() ||
        inputSearch.toLowerCase() == RANK_EMP_UNDER_160.toLowerCase()
    ) {
        var filter = listEmployee.filter(function (emp) {
            return (
                getRank(emp.timeWork).toLowerCase() == inputSearch.toLowerCase()
            );
        });
        clearTable();
        displayAllEmployee(filter, 2);
    } else {
        alert("Không tìm thấy xếp hạng " + inputSearch);
    }
}

document.getElementById("btnTimNV").onclick = findEmployee;
document.getElementById("btnDelete").onclick = deleteEmp;
document.getElementById("btnThemNV").onclick = addEmployee;
document.getElementById("btnCapNhat").onclick = updateEmp;

//todo =====================UNIT TEST=========================
// console.log(isEmpty("abc"));
// console.log(isEmpty("0"));
// console.log(isEmpty("0 1"));
// console.log(isEmpty(" "));
// console.log(isEmpty(""));
//OK

// console.log(isValidLength(5, 4, 6));
// console.log(isValidLength(1, 4, 6));
// console.log(isValidLength(0, 4, 6));
// console.log(isValidLength(-1, 4, 6));
// console.log(isValidLength(1111, 4, 6));
// console.log(isValidLength(4, 4, 6));
// console.log(isValidLength(6, 4, 6));
//OK

// console.log(isNumber(" 123 "));
// console.log(isNumber("-123"));
// console.log(isNumber("abc123"));
// console.log(isNumber("123a"));
// console.log(isNumber(" a 1 a "));
// console.log(isNumber(" "));
// console.log(isNumber("1 "));
// console.log(isNumber("12"));
//OK

// console.log(isCharacter("abc"));
// console.log(isCharacter(" bc"));
// console.log(isCharacter(" b "));
// console.log(isCharacter("$acc"));
// console.log(isCharacter("a@bc"));
// console.log(isCharacter("1abc"));
// console.log(isCharacter("-abc"));
// console.log(isCharacter("''"));
//OK

// console.log(isValidEmail(" "));
// console.log(isValidEmail("aasd "));
// console.log(isValidEmail("!&^!@@ "));
// console.log(isValidEmail("abc@ "));
// console.log(isValidEmail("abasc@1234 "));
// console.log(isValidEmail("@asd.com"));
// console.log(isValidEmail(" @asd.com"));
// console.log(isValidEmail("a @asd.com"));
// console.log(isValidEmail(" a@asd.com"));
// console.log(isValidEmail("abcd@asd.com"));
//OK

// console.log(isValidPassword(" "));
// console.log(isValidPassword(" A 1 c@ "));
// console.log(isValidPassword(" A a c@ "));
// console.log(isValidPassword("aabc"));
// console.log(isValidPassword("aAbc"));
// console.log(isValidPassword("aA@1c"));
// console.log(isValidPassword("A 2123c @"));
// console.log(isValidPassword("aA1 c"));
//OK

// console.log(isValidDate("abc"));
// console.log(isValidDate(" "));
// console.log(isValidDate("abc  "));
// console.log(isValidDate("31/12/2022"));
// console.log(isValidDate("12/31/2022"));
// console.log(isValidDate("12/31/2022 "));
// console.log(isValidDate(" 12/31/2022"));
// console.log(isValidDate(" 12 /31/2022"));
// console.log(isValidDate("1 2/31/2022"));
// console.log(isValidDate("12/31 /2022"));
// console.log(isValidDate("2022/31/12"));
// console.log(isValidDate("2022/12/31"));
// console.log(isValidDate("2022/12/31"));
//OK

// console.log(
//     isValidInput(
//         new Employee(
//             "1234",
//             "abc",
//             "abc@gmail.com",
//             "Av@12345",
//             "12/31/2022",
//             1000000,
//             "B",
//             200
//         )
//     )
// );
