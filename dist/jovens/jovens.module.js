"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovensModule = void 0;
const common_1 = require("@nestjs/common");
const jovem_entity_1 = require("./jovem.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jovens_service_1 = require("./jovens.service");
const jovem_repository_1 = require("./jovem.repository");
const validador_idade_1 = require("./validadores/validador-idade");
let JovensModule = class JovensModule {
};
exports.JovensModule = JovensModule;
exports.JovensModule = JovensModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([jovem_entity_1.Jovem])],
        providers: [jovem_repository_1.JovemRepository, jovens_service_1.JovensService, validador_idade_1.ValidadorIdade],
        exports: [jovens_service_1.JovensService, jovem_repository_1.JovemRepository],
    })
], JovensModule);
//# sourceMappingURL=jovens.module.js.map