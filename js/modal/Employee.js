const BOSS_SALARY_RATE = 3;
const MANAGER_SALARY_RATE = 2;
const RANK_EMP_192 = "Xuất sắc";
const RANK_EMP_176 = "Giỏi";
const RANK_EMP_160 = "Khá";
const RANK_EMP_UNDER_160 = "Trung bình";

class Employee {
    constructor(
        _account,
        _fullName,
        _email,
        _password,
        _dateBeginWork,
        _basicSalary,
        _role,
        _timeWork
    ) {
        this.account = _account;
        this.fullName = _fullName;
        this.email = _email;
        this.password = _password;
        this.dateBeginWork = _dateBeginWork;
        this.basicSalary = _basicSalary;
        this.role = _role;
        this.timeWork = _timeWork;
    }
}
