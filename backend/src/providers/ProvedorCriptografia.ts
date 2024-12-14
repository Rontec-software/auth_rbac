import * as bcrypt from "bcrypt";

export default class ProvedorCriptografia {
  async criptografar(senha: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(senha, salt);
  }

  async comparar(senha: string, senhaCriptografada: string) {
    return bcrypt.compare(senha, senhaCriptografada);
  }
}
