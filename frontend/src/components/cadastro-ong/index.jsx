import './index.scss'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import * as formatacao from '../../utils/formatacaoUtils.js';
import ModalTermos from '../../components/ModalTermos';

export default function CadastroOng() {

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [carregandoCep, setCarregandoCep] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [erro, setErro] = useState('');

    const [abrirTermos, setAbrirTermos] = useState(false);

    async function buscarCep(valor) {
        const cepNumerico = valor.replace(/\D/g, '');

        if (cepNumerico.length !== 8) return;

        try {
            setCarregandoCep(true);
            setErro('');

            const resposta = await fetch(
                `https://viacep.com.br/ws/${cepNumerico}/json/`
            );

            const dados = await resposta.json();

            if (dados.erro) {
                setErro('CEP não encontrado!');
                setEndereco('');
                setBairro('');
                setCidade('');
                setEstado('');
                return;
            }

            setEndereco(dados.logradouro || '');
            setBairro(dados.bairro || '');
            setCidade(dados.localidade || '');
            setEstado(dados.uf || '');
            setComplemento(dados.complemento || '');

        } catch (error) {
            setErro('Erro ao consultar o CEP.');
        } finally {
            setCarregandoCep(false);
        }
    }
    async function cadastrarOng(e) {
        e.preventDefault();

        const resposta = await fetch('http://localhost:3000/ong/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                telefone: telefone.replace(/\D/g, ''),
                cnpj,
                senha,
                confirmar_senha: confirmarSenha
            })
        });

        const dados = await resposta.json();
        console.log(dados);

        if (dados?.erro) {
            setErro(dados.erro);
        } else {
            setErro('');
        }

        if (dados?.resposta === 'ok') {
            window.location.href = '/Login';
        }
    }

    return (
        <div className="page-cadastroOng">
            <div className="corpo">
                <form onSubmit={e => cadastrarOng(e)}>
                    <div className="cabecalho-cadastro">
                        <div className="logo">
                            <div className="imagem">
                                <img src="public/assets/images/logo4.webp" alt="Logo da petvibe" />
                            </div>
                        </div>
                        <h1>Cadastre sua ONG na PetVibe</h1>

                    </div>


                    <div className="campos-cadastro">
                        <div className="input input-nome">
                            <p>Nome Da Ong *</p>

                            <input type="text"
                                placeholder='Nome completo da ONG'
                                required
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </div>

                        <div className="input">
                            <p>E-mail *</p>

                            <input type="text"
                                placeholder='exemploemail@gmail.com'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="linha-documentos">
                            <div className="input">
                                <p>Telefone *</p>
                                <input type="text"
                                    placeholder='(00) 00000-0000'
                                    required
                                    value={telefone}
                                    onChange={e => setTelefone(formatacao.formatarTelefone(e.target.value))}
                                />
                            </div>


                            <div className="input">
                                <p>CNPJ *</p>

                                <input
                                    type="text"
                                    placeholder="Digite o CNPJ"
                                    required
                                    maxLength={14}
                                    value={cnpj}
                                    onChange={e => setCnpj(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
                                />

                            </div>
                            <div className="input">
                                <p>CEP *</p>

                                <input
                                    type="text"
                                    placeholder="00000-000"
                                    maxLength={9}
                                    required
                                    value={cep}
                                    onChange={e => {
                                        const valor = e.target.value
                                            .replace(/\D/g, '')
                                            .replace(/^(\d{5})(\d)/, '$1-$2');

                                        setCep(valor);

                                        if (valor.replace(/\D/g, '').length === 8) {
                                            buscarCep(valor);
                                        }
                                    }}
                                />

                                {carregandoCep && <small>Buscando endereço...</small>}
                            </div>

                            <div className="input">
                                <p>Endereço *</p>

                                <input
                                    disabled
                                    type="text"
                                    placeholder="Rua, avenida..."
                                    required
                                    value={endereco}
                                    onChange={e => setEndereco(e.target.value)}
                                />
                            </div>

                            <div className="linha-documentos">
                                <div className="input">
                                    <p>Número *</p>

                                    <input
                                        type="text"
                                        placeholder="Número"
                                        required
                                        value={numero}
                                        onChange={e => setNumero(e.target.value)}
                                    />
                                </div>

                                <div className="input">
                                    <p>Bairro *</p>
                                    

                                    <input
                                        disabled
                                        type="text"
                                        placeholder="Bairro"
                                        required
                                        value={bairro}
                                        onChange={e => setBairro(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="linha-documentos">
                                <div className="input">
                                    <p>Cidade *</p>

                                    <input
                                        disabled
                                        type="text"
                                        placeholder="Cidade"
                                        required
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)}
                                    />
                                </div>

                                <div className="input">
                                    <p>Estado *</p>

                                    <input
                                        disabled
                                        type="text"
                                        placeholder="UF"
                                        maxLength={2}
                                        required
                                        value={estado}
                                        onChange={e => setEstado(e.target.value.toUpperCase())}
                                    />
                                </div>
                            </div>

                            <div className="input">
                                <p>Complemento</p>

                                <input
                                    type="text"
                                    placeholder="Sala, bloco, etc."
                                    value={complemento}
                                    onChange={e => setComplemento(e.target.value)}
                                />
                            </div>
                        </div>



                        <div className="linha-senha">
                            <div className="input-senha">
                                <p>Senha *</p>
                                <div className="campo">
                                    <input type={mostrarSenha ? "text" : "password"}
                                        placeholder="Mín. 8 caracteres"
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
                                    />

                                    <FaEye className="olho" />

                                    {mostrarSenha ? (
                                        <FaEyeSlash className='olho' onClick={() => setMostrarSenha(false)} />
                                    ) : (
                                        <FaEye className='olho' onClick={() => setMostrarSenha(true)} />
                                    )}
                                </div>
                            </div>

                            <div className="input-senha">
                                <p>Confirmar senha *</p>
                                <div className="campo">
                                    <input type={mostrarConfirmar ? "text" : "password"}
                                        value={confirmarSenha}
                                        onChange={e => setConfirmarSenha(e.target.value)}
                                    />
                                    <FaEye className="olho" />

                                    {mostrarConfirmar ? (
                                        <FaEyeSlash className='olho' onClick={() => setMostrarConfirmar(false)} />
                                    ) : (
                                        <FaEye className='olho' onClick={() => setMostrarConfirmar(true)} />
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="button">
                            {erro ? (
                                <p id='mensagem-erro'>{erro}</p>
                            ) : (<></>)}

                            <button>Criar minha conta</button>
                        </div>

                        <div className="entrar">
                            <p>Já tem uma conta?
                                <NavLink to='/login'
                                    style={{
                                        color: "#F8561F",
                                        marginLeft: ".5rem"
                                    }}
                                >Entrar</NavLink>

                            </p>

                            <div className="aceite-termos">

                                <input type="checkbox" required />



                                <a onClick={() => setAbrirTermos(true)}>
                                    Li e aceito os Termos e Condições
                                </a>
                                {abrirTermos && (
                                    <ModalTermos fechar={() => setAbrirTermos(false)} />
                                )}

                            </div>






                        </div>
                    </div>

                </form>
                <NavLink to="/"  ><button type='button' onClick={() => navigate(-1)} className="Voltar-pagina" ><b> <FaArrowLeft className="seta" /> Voltar</b></button></NavLink>


            </div>

        </div>
    )
}