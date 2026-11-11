import './index.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as formatacao from '../../../utils/formatacaoUtils.js';

export default function EtapaUm({ onContinuar }) {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [descricao, setDescricao] = useState('');
    const [site, setSite] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');

    function continuarCadastro(event) {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        setErro('');
        onContinuar({
            nome,
            email,
            telefone: telefone.replace(/\D/g, ''),
            cnpj,
            descricao,
            site,
            senha
        });
    }

    return (
        <div className="page-cadastroOng">
            <div className="corpo">
                <form onSubmit={continuarCadastro}>
                    <div className="cabecalho-cadastro">
                        <div className="logo">
                            <div className="imagem">
                                <img src="/assets/images/logo4.webp" alt="Logo da PetVibe" />
                            </div>
                        </div>
                        <div>
                            <h1>Cadastre sua ONG na PetVibe</h1>
                            <p className="indicador-etapa">Etapa 1 de 2 — Dados da ONG</p>
                        </div>
                    </div>

                    <div className="campos-cadastro">
                        <div className="input input-nome">
                            <p>Nome da ONG *</p>
                            <input
                                type="text"
                                placeholder="Nome completo da ONG"
                                required
                                value={nome}
                                onChange={event => setNome(event.target.value)}
                            />
                        </div>

                        <div className="input">
                            <p>E-mail *</p>
                            <input
                                type="email"
                                placeholder="exemploemail@gmail.com"
                                required
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="input">
                            <p>Telefone *</p>
                            <input
                                type="tel"
                                placeholder="(00) 00000-0000"
                                required
                                value={telefone}
                                onChange={event => setTelefone(formatacao.formatarTelefone(event.target.value))}
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
                                onChange={event => setCnpj(event.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
                            />
                        </div>

                        <div className="input">
                            <p>Site da ONG</p>
                            <input
                                type="url"
                                placeholder="https://www.suaong.org.br"
                                maxLength={255}
                                value={site}
                                onChange={event => setSite(event.target.value)}
                            />
                        </div>

                        <div className="input input-descricao">
                            <p>Descrição da ONG</p>
                            <textarea
                                placeholder="Conte um pouco sobre a sua ONG"
                                rows={4}
                                value={descricao}
                                onChange={event => setDescricao(event.target.value)}
                            />
                        </div>

                        <div className="linha-senha">
                            <div className="input-senha">
                                <p>Senha *</p>
                                <div className="campo">
                                    <input
                                        type={mostrarSenha ? 'text' : 'password'}
                                        placeholder="Mín. 8 caracteres"
                                        minLength={8}
                                        required
                                        value={senha}
                                        onChange={event => setSenha(event.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="botao-olho"
                                        aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                    >
                                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="input-senha">
                                <p>Confirmar senha *</p>
                                <div className="campo">
                                    <input
                                        type={mostrarConfirmar ? 'text' : 'password'}
                                        placeholder="Confirme sua senha"
                                        minLength={8}
                                        required
                                        value={confirmarSenha}
                                        onChange={event => setConfirmarSenha(event.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="botao-olho"
                                        aria-label={mostrarConfirmar ? 'Ocultar senha' : 'Mostrar senha'}
                                        onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                                    >
                                        {mostrarConfirmar ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="button">
                            {erro && <p id="mensagem-erro" role="alert">{erro}</p>}
                            <button type="submit">Continuar</button>
                        </div>

                        <div className="entrar">
                            <p>
                                Já tem uma conta?
                                <NavLink to="/login" className="Conta">Entrar</NavLink>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
