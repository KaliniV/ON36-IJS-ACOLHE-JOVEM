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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovensController = void 0;
const common_1 = require("@nestjs/common");
const jovens_service_1 = require("./jovens.service");
const criar_jovem_dto_1 = require("./criar-jovem-dto");
const credenciais_dto_1 = require("./credenciais-dto");
const atualizar_jovem_dto_1 = require("./atualizar-jovem.dto");
let JovensController = class JovensController {
    constructor(jovensService) {
        this.jovensService = jovensService;
    }
    async criarJovem(criarJOvemDto) {
        const jovem = await this.jovensService.criarJovem(criarJOvemDto);
        return {
            jovem,
            message: 'Criado com sucesso.',
        };
    }
    async exibirPorCredencial(credenciaisDto) {
        const jovem = await this.jovensService.exibirPorCredencial(credenciaisDto);
        return jovem;
    }
    async atualizarPorCredencial(credenciaisDto, atualizarJovemDto) {
        const jovemAtualizado = await this.jovensService.atualizarPorCredencial(credenciaisDto, atualizarJovemDto);
        return 'Atualizado com sucesso ';
    }
    async deletarPorCredencial(credenciaisDto) {
        return this.jovensService.deletarPorCredencial(credenciaisDto);
    }
};
exports.JovensController = JovensController;
__decorate([
    (0, common_1.Post)('criar-jovem'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [criar_jovem_dto_1.CriarJovemDto]),
    __metadata("design:returntype", Promise)
], JovensController.prototype, "criarJovem", null);
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credenciais_dto_1.CredenciaisDto]),
    __metadata("design:returntype", Promise)
], JovensController.prototype, "exibirPorCredencial", null);
__decorate([
    (0, common_1.Patch)('atualizar'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credenciais_dto_1.CredenciaisDto,
        atualizar_jovem_dto_1.AtualizarJovemDto]),
    __metadata("design:returntype", Promise)
], JovensController.prototype, "atualizarPorCredencial", null);
__decorate([
    (0, common_1.Delete)('deletar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credenciais_dto_1.CredenciaisDto]),
    __metadata("design:returntype", Promise)
], JovensController.prototype, "deletarPorCredencial", null);
exports.JovensController = JovensController = __decorate([
    (0, common_1.Controller)('jovens'),
    __metadata("design:paramtypes", [jovens_service_1.JovensService])
], JovensController);
//# sourceMappingURL=jovens.controller.js.map