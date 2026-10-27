
import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);



export async function EnviarEmail(codigo) {
    const resposta = await mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: process.env.MAILJET_EMAIL,
                        Name: 'Petvibaochamandotodos'
                    },
                    To: [
                        {
                            Email: "ra49082778858@acaonsfatima.org.br"
                        }
                    ],
                    Subject: 'Código de verificação',
                    TextPart: `Seu código é 4222. Ele expira em 10 minutos.`,
                    
HTMLPart: `
    <div style="
        margin: 0;
        padding: 40px 16px;
        background-color: #F7F2EA;
        font-family: Arial, Helvetica, sans-serif;
        color: #3D332B;
    ">
        <div style="
            max-width: 480px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border: 1px solid #E9DED0;
            border-radius: 16px;
            overflow: hidden;
        ">
            <div style="
                background-color: #D97745;
                padding: 28px 24px;
                text-align: center;
            ">
                <p style="
                    margin: 0;
                    color: #FFFFFF;
                    font-size: 13px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                ">
                    CHAMAAAAAAAAAAA
                </p>

                <h1 style="
                    margin: 14px 0 0;
                    color: #FFFFFF;
                    font-size: 25px;
                    font-weight: 600;
                ">
                    Confirme seu e-mail
                </h1>
            </div>

            <div style="padding: 32px 26px;">
                <p style="
                    margin: 0 0 16px;
                    font-size: 16px;
                    line-height: 1.7;
                ">
                    Olá!
                </p>

                <p style="
                    margin: 0 0 24px;
                    color: #6F6257;
                    font-size: 15px;
                    line-height: 1.8;
                ">
                    Recebemos uma solicitação de verificação
                    para sua conta. Utilize o código abaixo
                    para continuar.
                </p>

                <div style="
                    padding: 24px 12px;
                    background-color: #FBF5ED;
                    border: 1px solid #EAD8C5;
                    border-radius: 12px;
                    text-align: center;
                ">
                    <p style="
                        margin: 0 0 12px;
                        color: #8B7563;
                        font-size: 12px;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                    ">
                        Seu código de verificação
                    </p>

                    <p style="
                        margin: 0;
                        color: #C45D2C;
                        font-size: 36px;
                        font-weight: bold;
                        letter-spacing: 8px;
                    ">
                        ${codigo}
                    </p>
                </div>

                <p style="
                    margin: 24px 0 0;
                    color: #6F6257;
                    font-size: 14px;
                    line-height: 1.7;
                ">
                    Este código expira em <strong>10 minutos</strong>.
                    Por segurança, não compartilhe esse código
                    com ninguém.
                </p>

                <div style="
                    height: 1px;
                    margin: 28px 0 20px;
                    background-color: #EEE5DB;
                "></div>

                <p style="
                    margin: 0;
                    color: #8B8178;
                    font-size: 12px;
                    line-height: 1.7;
                    text-align: center;
                ">
                    Se você não solicitou esta verificação,
                    ignore este e-mail. Sua conta não será alterada.
                </p>
            </div>
        </div>

        <p style="
            margin: 20px auto 0;
            color: #9A8B7D;
            font-size: 11px;
            line-height: 1.6;
            text-align: center;
        ">
            © Literary Notes — Suas leituras, suas anotações.
        </p>
    </div>
`

                    
                      
                    
                }
            ]
        });

    return resposta.body;
}
