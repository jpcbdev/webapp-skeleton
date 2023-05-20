export const REGEX_MALICIOUS_PATTERN = /[\!\#\$\%\^\&\*\)\(\+\=\<\>\{\}\[\]\\\:\;\|\~\`\_\-]/igm;
export const REGEX_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const REGEX_CARD_EXPIRATION_PATTERN = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
export const REGEX_USERNAME_PASSWORD_PATTERN = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;