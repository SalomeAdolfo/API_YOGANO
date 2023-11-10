import nodemailer from "nodemailer";
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from "../config.js";
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // Servidor SMTP de Hotmail
    port: 587, // Puerto para TLS
    secure: false, // No utilizar una conexión segura (TLS)
    auth: {
        user: "dsg1712@hotmail.com", // Tu dirección de correo electrónico de Hotmail
        pass: "Ajstyles", // Tu contraseña de Hotmail
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function main(to, subject, text) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "dsg1712@hotmail.com", // Dirección del remitente
        to: to, // Dirección del destinatario
        subject: subject, // Asunto
        html: text, // Cuerpo del correo en formato HTML
    });

    console.log("Mensaje enviado: %s", info.messageId);
}