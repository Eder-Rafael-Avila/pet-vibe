import '../etapaUm/index.scss';
import './index.scss';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ModalTermos from '../../ModalTermos/index.jsx';

const API_URL = 'http://localhost:6767';

export default function EtapaDois({ dadosOng, onVoltar }) {
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [carregandoCep, setCarregandoCep] = useState(false);
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const [abrirTermos, setAbrirTermos] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [ongCriada, setOngCriada] = useState(false);
    const [tokenOng, setTokenOng] = useState('');

    async function buscarCep(valor) {
        const cepNumerico = valor.replace(/\D/g, '');

        if (cepNumerico.length !== 8) return;

        try {
            setCarregandoCep(true);
            setErro('');

            const resposta = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
            if (!resposta.ok) throw new Error('Não foi possível consultar o CEP.');

            const dados = await resposta.json();
            if (dados.erro) {
                setErro('CEP não encontrado. Confira o número ou preencha o endereço manualmente.');
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
            setErro(error.message || 'Erro ao consultar o CEP.');
        } finally {
            setCarregandoCep(false);
        }
    }

    async function finalizarCadastro(event) {
        event.preventDefault();

        if (!aceitouTermos) {
            setErro('Leia e concorde com os Termos e Condições para finalizar o cadastro.');
            return;
        }

        if (!dadosOng) {
            setErro('Os dados da ONG não foram encontrados. Volte à primeira etapa e tente novamente.');
            return;
        }

        setCarregando(true);
        setErro('');

        try {
            if (!ongCriada) {
                const respostaCadastro = await fetch(`${API_URL}/ong/criar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosOng)
                });
                const dadosCadastro = await respostaCadastro.json();

                if (!respostaCadastro.ok || dadosCadastro?.erro) {
                    throw new Error(dadosCadastro?.erro || 'Não foi possível cadastrar a ONG.');
                }

                setOngCriada(true);
            }

            let token = tokenOng;
            if (!token) {
                const respostaLogin = await fetch(`${API_URL}/ong/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: dadosOng.email,
                        senha: dadosOng.senha
                    })
                });
                const dadosLogin = await respostaLogin.json();

                if (!respostaLogin.ok || typeof dadosLogin?.token !== 'string' || !dadosLogin.token) {
                    throw new Error(dadosLogin?.erro || 'Não foi possível autenticar a ONG para salvar o endereço.');
                }

                token = dadosLogin.token;
                setTokenOng(token);
            }

            const respostaEndereco = await fetch(`${API_URL}/endereco-ong/criar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    cep: cep.replace(/\D/g, ''),
                    rua: endereco,
                    numero,
                    complemento,
                    bairro,
                    cidade,
                    estado
                })
            });
            const dadosEndereco = await respostaEndereco.json();

            if (!respostaEndereco.ok || dadosEndereco?.erro) {
                throw new Error(dadosEndereco?.erro || 'Não foi possível cadastrar o endereço da ONG.');
            }

            window.location.href = '/Login?tipo=ong';
        } catch (error) {
            setErro(error.message || 'Ocorreu um erro ao finalizar o cadastro.');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="page-cadastroOng etapa-dois">
            <div className="corpo">
                <form onSubmit={finalizarCadastro}>
                    <div className="cabecalho-cadastro">
                        <div className="logo">
                            <div className="imagem">
                                <img src="/assets/images/logo4.webp" alt="Logo da PetVibe" />
                            </div>
                        </div>
                        <div>
                            <h1>Endereço da ONG</h1>
                            <p className="indicador-etapa">Etapa 2 de 2 — Endereço e confirmação</p>
                        </div>
                    </div>

                    <div className="campos-cadastro">
                        <div className="linha-documentos">
                            <div className="input">
                                <p>CEP *</p>
                                <input
                                    type="text"
                                    placeholder="00000-000"
                                    maxLength={9}
                                    required
                                    value={cep}
                                    onChange={event => {
                                        const valor = event.target.value
                                            .replace(/\D/g, '')
                                            .slice(0, 8)
                                            .replace(/^(\d{5})(\d)/, '$1-$2');
                                        setCep(valor);
                                        if (valor.replace(/\D/g, '').length === 8) buscarCep(valor);
                                    }}
                                />
                                {carregandoCep && <small>Buscando endereço...</small>}
                            </div>
                            <div className="input">
                                <p>Rua / Endereço *</p>
                                <input
                                    type="text"
                                    placeholder="Rua, avenida..."
                                    required
                                    value={endereco}
                                    onChange={event => setEndereco(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="linha-documentos">
                            <div className="input">
                                <p>Número *</p>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]+"
                                    placeholder="Número"
                                    required
                                    value={numero}
                                    onChange={event => setNumero(event.target.value)}
                                />
                            </div>
                            <div className="input">
                                <p>Bairro *</p>
                                <input
                                    type="text"
                                    placeholder="Bairro"
                                    required
                                    value={bairro}
                                    onChange={event => setBairro(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="linha-documentos">
                            <div className="input">
                                <p>Cidade *</p>
                                <input
                                    type="text"
                                    placeholder="Cidade"
                                    required
                                    value={cidade}
                                    onChange={event => setCidade(event.target.value)}
                                />
                            </div>
                            <div className="input">
                                <p>Estado *</p>
                                <input
                                    type="text"
                                    placeholder="UF"
                                    maxLength={2}
                                    required
                                    value={estado}
                                    onChange={event => setEstado(event.target.value.toUpperCase())}
                                />
                            </div>
                        </div>

                        <div className="input">
                            <p>Complemento *</p>
                            <input
                                type="text"
                                placeholder="Sala, bloco, etc."
                                required
                                value={complemento}
                                onChange={event => setComplemento(event.target.value)}
                            />
                        </div>

                        <div className="cont-termos">
                            <div className="aceite-termos">
                                <input
                                    id="aceite-termos-ong"
                                    type="checkbox"
                                    required
                                    checked={aceitouTermos}
                                    onChange={event => setAceitouTermos(event.target.checked)}
                                />
                                <label htmlFor="aceite-termos-ong">
                                    Li e concordo com os Termos e Condições
                                </label>
                                <button
                                    type="button"
                                    className="link-termos"
                                    onClick={() => setAbrirTermos(true)}
                                >
                                    Ler termos
                                </button>
                            </div>
                        </div>

                        <div className="button">
                            {erro && <p id="mensagem-erro" role="alert">{erro}</p>}
                            <button type="submit" disabled={!aceitouTermos || carregando || !dadosOng}>
                                {carregando ? 'Finalizando...' : 'Finalizar cadastro'}
                            </button>
                        </div>

                        <div className="acoes-etapa">
                            <button
                                type="button"
                                className="botao-voltar-etapa"
                                onClick={onVoltar}
                                disabled={ongCriada || carregando}
                            >
                                <FaArrowLeft aria-hidden="true" /> Voltar
                            </button>
                        </div>
                    </div>
                </form>
                {abrirTermos && <ModalTermos fechar={() => setAbrirTermos(false)} />}
            </div>
        </div>
    );
}
