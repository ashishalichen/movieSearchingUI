export function checkValidData(email, password) {

    const isEmailValid = /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    if (!isEmailValid)
        return 'Email ID is not valid.';
    if (!isPasswordValid)
        return 'Password is Not valid.';

    return isEmailValid && isPasswordValid
}


export function checkValidDataSingUp(name, email, password, confirmPassword) {

    const isNameValid = name && name.length > 5;

    const isEmailValid = /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    if (!isNameValid)
        return 'Name is not valid.'
    if (!isEmailValid)
        return 'Email ID is not valid.';
    if (!isPasswordValid)
        return 'Password is Not valid.';
    if (password !== confirmPassword)
        return 'Password does not match.'

    return isEmailValid && isPasswordValid
}