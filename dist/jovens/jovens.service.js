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
exports.JovensService = void 0;
const common_1 = require("@nestjs/common");
const jovem_repository_1 = require("./jovem.repository");
const validador_idade_1 = require("./validadores/validador-idade");
let JovensService = class JovensService {
    constructor(jovemRepository, validadorIdade) {
        this.jovemRepository = jovemRepository;
        this.validadorIdade = validadorIdade;
    }
    async criarJovem(criarJovemDto) {
        const dataNascimento = new Date(criarJovemDto.dataNascimento);
        this.validadorIdade.validarIdade(dataNascimento);
        if (criarJovemDto.senha !== criarJovemDto.confirmacaoSenha) {
            throw new common_1.UnprocessableEntityException('As senhas não conferem.');
        }
        return this.jovemRepository.criarJovem({
            ...criarJovemDto,
            dataNascimento: dataNascimento.toISOString(),
        });
    }
    async exibirPorCredencial(credenciaisDto) {
        return this.jovemRepository.exibirPorCredencial(credenciaisDto);
    }
    async atualizarPorCredencial(credenciaisDto, atualizarJovemDto) {
        const { email, senha } = credenciaisDto;
        const jovem = await this.jovemRepository.exibirPorCredencial(credenciaisDto);
        if (!jovem) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const jovemParaAtualizar = await this.jovemRepository.findByEmail(email);
        const { nome, status } = atualizarJovemDto;
        jovemParaAtualizar.nome = nome ? nome : jovemParaAtualizar.nome;
        jovemParaAtualizar.status =
            status === undefined ? jovemParaAtualizar.status : status;
        try {
            await this.jovemRepository.save(jovemParaAtualizar);
            return jovemParaAtualizar;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao salvar os dados');
        }
    }
    async deletarPorCredencial(credenciaisDto) {
        const { email, senha } = credenciaisDto;
        const jovem = await this.jovemRepository.exibirPorCredencial(credenciaisDto);
        if (!jovem) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const jovemParaDeletar = await this.jovemRepository.findByEmail(email);
        try {
            await this.jovemRepository.delete(jovemParaDeletar.id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao deletar os dados');
        }
    }
};
exports.JovensService = JovensService;
exports.JovensService = JovensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jovem_repository_1.JovemRepository,
        validador_idade_1.ValidadorIdade])
], JovensService);
//# sourceMappingURL=jovens.service.js.map