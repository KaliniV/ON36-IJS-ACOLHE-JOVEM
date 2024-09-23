"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const jovens_module_1 = require("./jovens/jovens.module");
const typeorm_1 = require("@nestjs/typeorm");
const jovem_entity_1 = require("./jovens/jovem.entity");
const jovens_controller_1 = require("./jovens/jovens.controller");
const voluntarios_module_1 = require("./voluntarios/voluntarios.module");
const voluntario_entity_1 = require("./voluntarios/voluntario.entity");
const voluntarios_controller_1 = require("./voluntarios/voluntarios.controller");
const voluntarios_service_1 = require("./voluntarios/voluntarios.service");
require('dotenv').config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: 6001,
                database: process.env.DB_DATABASE,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                entities: [jovem_entity_1.Jovem, voluntario_entity_1.Voluntario],
                synchronize: true,
            }),
            jovens_module_1.JovensModule,
            voluntarios_module_1.VoluntariosModule,
        ],
        controllers: [app_controller_1.AppController, jovens_controller_1.JovensController, voluntarios_controller_1.VoluntariosController],
        providers: [app_service_1.AppService, voluntarios_service_1.VoluntariosService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map