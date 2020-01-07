import User from '@/models/user';

export class AuthState {
    public user: User | null;
    public status: AuthStatus;

    constructor(user: User | null, status: AuthStatus) {
        this.user = user;
        this.status = status;
    }
}

export class AuthStatus {
    public loggedIn: boolean;

    constructor(loggedIn: boolean) {
        this.loggedIn = loggedIn;
    }
}