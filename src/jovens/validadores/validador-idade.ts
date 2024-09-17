import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class ValidadorIdade {
  validarIdade(dataNascimento: Date): void {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    if (idade < 13 || idade > 17) {
      throw new BadRequestException('A idade deve estar entre 13 e 17 anos.');
    }
  }
}