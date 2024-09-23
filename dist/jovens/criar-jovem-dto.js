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
exports.CriarJovemDto = void 0;
const class_validator_1 = require("class-validator");
const genero_enum_1 = require("./genero.enum");
const class_transformer_1 = require("class-transformer");
class CriarJovemDto {
}
exports.CriarJovemDto = CriarJovemDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe o nome do usuário' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriarJovemDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe um endereço de email' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Informe um endereço de email válido' }),
    (0, class_validator_1.MaxLength)(200, {
        message: 'O endereço de email deve ter menos de 200 caracteres',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriarJovemDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe uma senha' }),
    (0, class_validator_1.MinLength)(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriarJovemDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Informe a confirmação de senha' }),
    (0, class_validator_1.MinLength)(6, {
        message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriarJovemDto.prototype, "confirmacaoSenha", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(genero_enum_1.Genero),
    __metadata("design:type", String)
], CriarJovemDto.prototype, "genero", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], CriarJovemDto.prototype, "dataNascimento", void 0);
//# sourceMappingURL=criar-jovem-dto.js.map