
import Mailjet from 'node-mailjet';
import { readFile } from 'node:fs/promises';

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);



export async function EnviarEmail(email, codigo) {
    const logo = await readFile(new URL('../../public/assets/images/logo.png', import.meta.url));

    const resposta = await mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: process.env.MAILJET_EMAIL,
                        Name: 'Petvibe'
                    },
                    To: [
                        {
                            Email: email
                        }
                    ],
                    Subject: 'Código de verificação PetVibe',
                    TextPart: `Seu código é ${codigo} Ele expira em 10 minutos.`,
                    InlinedAttachments: [
                        {
                            ContentType: 'image/png',
                            Filename: 'logo.png',
                            Base64Content: logo.toString('base64'),
                            ContentID: 'logo-petvibe'
                        }
                    ],
                    
HTMLPart: `
<div style="
    margin: 0;
    padding: 40px 16px;
    background-color: #EAF1E4;
    font-family: Arial, Helvetica, sans-serif;
    color: #24483D;
">

    <div style="
        max-width: 480px;
        margin: 0 auto;
        background-color: #FFFFFF;
        border: 1px solid #D5E4D5;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(16, 95, 86, 0.12);
    ">

        <!-- CABEÇALHO VERDE -->
        <div style="
            background-color: #105F56;
            padding: 30px 24px;
            text-align: center;
        ">

            <!-- LOGO COM FUNDO CREME -->
            <div style="
                width: 120px;
                height: 100px;
                margin: 0 auto 12px;
                background-color: #EAF1E4;
                border-radius: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">

                <img
                    src="cid:logo-petvibe"
                    alt="Logo PetVibe"
                    style="
                        width: 110px;
                        height: 90px;
                        object-fit: contain;
                        display: block;
                    "
                />

            </div>

            <p style="
                margin: 0;
                color: #FFFFFF;
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 4px;
            ">
                PETVIBE
            </p>

            <h1 style="
                margin: 18px 0 0;
                color: #FFFFFF;
                font-size: 26px;
                font-weight: 600;
            ">
                Confirme seu e-mail
            </h1>

            <p style="
                margin: 12px 0 0;
                color: #D5E8D9;
                font-size: 12px;
                letter-spacing: 2px;
            ">
                UM NOVO AMIGO PODE ESTAR TE ESPERANDO
            </p>

        </div>

        <!-- CONTEÚDO -->
        <div style="padding: 32px 26px;">

            <p style="
                margin: 0 0 16px;
                color: #105F56;
                font-size: 24px;
                font-weight: bold;
            ">
                Olá!
            </p>

            <p style="
                margin: 0 0 24px;
                color: #52665E;
                font-size: 15px;
                line-height: 1.8;
            ">
                Recebemos uma solicitação de verificação
                para sua conta. Utilize o código abaixo
                para continuar e aproveitar tudo que a
                PetVibe tem para você.
            </p>

            <!-- CAIXA DO CÓDIGO -->
            <div style="
                padding: 28px 12px;
                background-color: #F0F5EC;
                border: 2px solid #83B69A;
                border-radius: 14px;
                text-align: center;
            ">

                <p style="
                    margin: 0 0 14px;
                    color: #105F56;
                    font-size: 12px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                ">
Seu código de verificação
                </p>

                <p style="
                    margin: 0;
                    color: #E9823D;
                    font-size: 38px;
                    font-weight: bold;
                    letter-spacing: 9px;
                ">
                    ${codigo}
                </p>

            </div>

            <!-- EXPIRAÇÃO -->
            <p style="
                margin: 26px 0 0;
                color: #52665E;
                font-size: 14px;
                line-height: 1.8;
            ">
                🕒 Este código expira em
                <strong style="color: #105F56;">
                    10 minutos.
                </strong>
                Por segurança, não compartilhe esse código
                com ninguém.
            </p>

            <div style="
                height: 1px;
                margin: 28px 0 20px;
                background-color: #DCE8DC;
            "></div>

            <!-- AVISO DE SEGURANÇA -->
            <p style="
                margin: 0;
                color: #789487;
                font-size: 12px;
                line-height: 1.8;
                text-align: center;
            ">
                Se você não solicitou esta verificação,
                ignore este e-mail. Sua conta não será alterada.
            </p>

        </div>

    </div>

    <!-- RODAPÉ -->
    <p style="
        margin: 22px auto 0;
        color: #668477;
        font-size: 12px;
        line-height: 1.8;
        text-align: center;
    ">
        <strong style="
            color: #105F56;
            letter-spacing: 3px;
        ">
            PETVIBE
        </strong>
        <br>
        Amigo não se compra
    </p>

</div>
`

                    
                      
                    
                }
            ]
        });

    return resposta.body;
}

export async function EnviarEmailOng(email, codigo) {
    return EnviarEmail(email, codigo);
}
