"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AppController = AppController_1 = class AppController {
    constructor(appService, jwtService) {
        this.appService = appService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AppController_1.name);
    }
    async login(username, password) {
        try {
            const userServiceResponse = await this.appService.login(username, password);
            if (userServiceResponse.success) {
                this.logger.log("login successfull, generating JWT");
                const token = await this.jwtService.sign({ username: username });
                this.logger.log("JWT generated successfully.");
                return token;
            }
            return userServiceResponse;
        }
        catch (error) {
            this.logger.error("Error while login: " + error.stack);
            throw new common_1.InternalServerErrorException('Error while login');
        }
    }
    products() {
        this.logger.log("calling product service");
        var products = this.appService.getProducts();
        return products;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('username')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("products"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "products", null);
exports.AppController = AppController = AppController_1 = __decorate([
    (0, common_1.Controller)("client"),
    __metadata("design:paramtypes", [app_service_1.AppService,
        jwt_1.JwtService])
], AppController);
//# sourceMappingURL=app.controller.js.map