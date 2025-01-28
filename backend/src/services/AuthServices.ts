import { UnauthorizedError } from "../helpers/api-errors";
import { IAuthLogin } from "../interfaces/AuthLoginInterface";
import ProvedorCriptografia from "../providers/ProvedorCriptografia";
import { UsersRepository } from "../repositories/UsersRepository";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { v4 as uuid } from 'uuid';

class AuthServices {
  private repository: UsersRepository;
  private cripto: ProvedorCriptografia;

  constructor() {
    this.repository = new UsersRepository();
    this.cripto = new ProvedorCriptografia();
  }

  async login({ email, password }: IAuthLogin) {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new UnauthorizedError("Invalid credentials");

    const matchPassword = await this.cripto.comparar(password, user.password);

    if (!matchPassword) throw new UnauthorizedError("Invalid credentials");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      active: user.active,
      profilePicture: user.profilePicture,
    };
  }

  async recoverPassword(email: string) {
    if (!email) {
      throw new Error("E-mail is required");
    }

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const token = uuid();
    const currentDate = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000
    const envExpiration = parseInt(process.env.EXPIRATION_TOKEN_PASSWORD_RESET ?? "")
    const expiration = envExpiration ?? twentyFourHours
    const expToken = new Date(currentDate.getTime() + expiration);
    await this.repository.setPasswordResetToken({ email, token, expToken })

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRIP_USER_KEY,
        pass: process.env.MAILTRIP_PASSWORD,
      }
    });

    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Global Coders',
        link: process.env.BASE_URL_FRONTEND ?? "http://localhost:3000/"
      }
    });

    let bodyEmail = {
      body: {
        greeting: 'Olá',
        name: user.name,
        signature: 'Atenciosamente',
        intro: 'Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta foi recebida.',
        action: {
          instructions: 'Clique no botão abaixo para redefinir sua senha:',
          button: {
            color: '#DC4D2F',
            text: 'Redefinir sua senha',
            link: `${process.env.BASE_URL_FRONTEND}redefinir-senha?token=${token}&email=${email}`
          }
        },
        outro: 'Se você não solicitou uma redefinição de senha, nenhuma outra ação será necessária de sua parte.'
      }
    };

    var emailBody = mailGenerator.generate(bodyEmail);
    require('fs').writeFileSync(`${__dirname}/../emails/${user.name}-${expToken.toISOString()}.html`, emailBody, 'utf8');

    // for clients that do not support HTML
    var emailText = mailGenerator.generatePlaintext(bodyEmail);
    require('fs').writeFileSync(`${__dirname}/../emails/${user.name}-${expToken.toISOString()}.txt`, emailText, 'utf8');


    transporter.sendMail({
      from: process.env.MAILTRIP_SENDER,
      to: email,
      subject: 'Redefinir senha',
      html: emailBody,
      text: emailText,
    }, function (err: any) {
      if (err) return console.log(err);
      console.log('Message sent successfully.');
    });
    return;
  }

  async resetPassword({ email, token, password }: { email: string, token: string, password: string }) {
    if (!email || !token || !password) {
      throw new Error("E-mail, token and password are required");
    }

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.expPasswordResetToken || user.passwordResetToken !== token) {
      throw new UnauthorizedError("Invalid token");
    }

    if (new Date() <= user.expPasswordResetToken) {
      throw new UnauthorizedError("Token expired");
    }

    const passwordHash = await this.cripto.criptografar(password);
    await this.repository.changePassword(email, passwordHash);

    return;
  }
}

export { AuthServices };
