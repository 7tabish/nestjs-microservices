import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
export declare class AppController {
    private readonly appService;
    private readonly jwtService;
    private readonly logger;
    constructor(appService: AppService, jwtService: JwtService);
    login(username: string, password: string): Promise<any>;
    products(): import("rxjs").Observable<any>;
}
