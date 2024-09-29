import { UserService } from './user.service';
export declare class AppController {
    private readonly userService;
    constructor(userService: UserService);
    login(username: string, password: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
