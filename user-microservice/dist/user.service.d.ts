export declare class UserService {
    private users;
    constructor();
    private loadUsers;
    authenticate(username: string, password: string): Promise<boolean>;
}
