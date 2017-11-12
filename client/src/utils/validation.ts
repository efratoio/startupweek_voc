// Taken from http://emailregex.com/
const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // tslint:disable-line

export function validateEMail(email: string): boolean {
    return Boolean(email.match(emailValidationRegex));
}

export function validateUsername(username: string): boolean {
    return username.length >= 1;
}

export function validatePassword(password: string): boolean {
    return password.length >= 1;
}

export function validateCategory(category: string): boolean {
    return true;
}

export function validateAmount(amount: string): boolean {
    return parseInt(amount) !== NaN;
}
