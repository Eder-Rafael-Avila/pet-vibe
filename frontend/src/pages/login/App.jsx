import './App.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function entrar(event) {
    event.preventDefault(); // Impede que o formulário recarregue a página
    setErro(''); // Limpa uma mensagem de erro anterior

    const resposta = await fetch('http://localhost:2010/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }), // Envia os dados ao backend
    });

    const dados = await resposta.json(); // Lê a resposta do backend

    if (!resposta.ok) {
      setErro(dados.erro); // Mostra o erro retornado pelo backend
      return; // Não continua o login quando há erro
    }

    localStorage.setItem('token', dados.token); // Salva o token recebido
    navigate('/tokenTeste'); // Entra na página protegida
  }

  return (
    <>
      <form onSubmit={entrar}>
      <h1>Login</h1>

      <input type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

      {<p>{erro}</p>} {/* Só aparece se houver erro */}

      <button>Entrar</button>
      </form>
    </>
  )
}

