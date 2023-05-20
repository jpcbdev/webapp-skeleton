import Toastify from 'toastify-js';

export class Notification {

    static showSuccess(message: string) {
        Toastify({
            text: message,
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: 'top',
            position: 'center',
            stopOnFocus: true,
            className: 'toastify',
            style: {
                background: '#2ECC71ff',
            },
            onClick: function () { }
        }).showToast();
    }

    static showError(message: string) {
        Toastify({
            text: message,
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: 'top',
            position: 'center',
            stopOnFocus: true,
            className: 'toastify',
            style: {
                background: 'red',
            },
            onClick: function () { }
        }).showToast();
    }

}