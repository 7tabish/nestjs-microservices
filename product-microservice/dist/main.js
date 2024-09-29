"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const product_module_1 = require("./product.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(product_module_1.ProductModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3002,
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map