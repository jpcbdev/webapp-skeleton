import cookies from 'js-cookie';

export class CookieStorageUtil {

    static getProfile(): any {
        const value = cookies.get(`${process.env.PROFILE}`) as string;
        return value ? JSON.parse(value) : {};
    }

    static setProfile(user: object): void {
        cookies.set(`${process.env.PROFILE}`, JSON.stringify(user));
    }

    static getToken(): string | null {
        const value = cookies.get(`${process.env.AUTHENTICATE}`);
        return value ?? null;
    }

    static setToken(authenticate: string): void {
        cookies.set(`${process.env.AUTHENTICATE}`, authenticate);
    }

    static remove(): void {
        cookies.remove(`${process.env.AUTHENTICATE}`);
        cookies.remove(`${process.env.PROFILE}`);
        window.location.href = '/';
    }

    static isAuthenticated(): boolean {
        const token = this.getToken();
        return token != null ;
    }

}