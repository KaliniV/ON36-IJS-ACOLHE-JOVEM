"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidadorIdade = void 0;
const common_1 = require("@nestjs/common");
let ValidadorIdade = class ValidadorIdade {
    validarIdade(dataNascimento) {
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        if (idade < 13 || idade > 17) {
            throw new common_1.BadRequestException('A idade deve estar entre 13 e 17 anos.');
        }
    }
};
exports.ValidadorIdade = ValidadorIdade;
exports.ValidadorIdade = ValidadorIdade = __decorate([
    (0, common_1.Injectable)()
], ValidadorIdade);
//# sourceMappingURL=validador-idade.js.map