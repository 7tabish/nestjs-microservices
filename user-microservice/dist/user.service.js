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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
let UserService = class UserService {
    constructor() {
        this.users = [];
        this.loadUsers();
    }
    loadUsers() {
        const filePath = path.resolve(__dirname, '../users.json');
        const data = fs.readFileSync(filePath, 'utf8');
        this.users = JSON.parse(data);
    }
    async authenticate(username, password) {
        const user = this.users.find((u) => u.username === username);
        if (!user) {
            return false;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
//# sourceMappingURL=user.service.js.map