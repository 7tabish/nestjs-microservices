export declare class AppService {
    private userClient;
    private productClient;
    private readonly logger;
    constructor();
    login(username: string, password: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getProducts(): import("rxjs").Observable<any>;
}
