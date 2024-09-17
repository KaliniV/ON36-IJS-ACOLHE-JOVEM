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
exports.JovemRepository = void 0;
const typeorm_1 = require("typeorm");
const jovem_entity_1 = require("./jovem.entity");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
let JovemRepository = class JovemRepository {
    constructor(jovemRepository) {
        this.jovemRepository = jovemRepository;
    }
    async criarJovem(criarJovemDto) {
        const { nome, email, senha, genero, dataNascimento } = criarJovemDto;
        const jovem = this.jovemRepository.create({
            nome,
            email,
            senha,
            genero,
            dataNascimento: new Date(dataNascimento),
            status: true,
            confirmacaoToken: crypto.randomBytes(32).toString('hex'),
            criptografia: await bcrypt.genSalt(),
        });
        jovem.senha = await this.hashPassword(senha, jovem.criptografia);
        try {
            await this.jovemRepository.save(jovem);
            delete jovem.senha;
            delete jovem.criptografia;
            return jovem;
        }
        catch (error) {
            console.error('Erro ao salvar o jovem:', error);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Endereço de email já está em uso');
            }
            else {
                throw new common_1.InternalServerErrorException('Erro ao salvar o jovem no banco de dados');
            }
        }
    }
    async hashPassword(senha, criptografia) {
        return bcrypt.hash(senha, criptografia);
    }
};
exports.JovemRepository = JovemRepository;
exports.JovemRepository = JovemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(jovem_entity_1.Jovem)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], JovemRepository);
//# sourceMappingURL=jovem.repository.js.map