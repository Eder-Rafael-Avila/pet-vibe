import './App.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function entrar(event) {
    event.preventDefault();
    setErro('');

    const resposta = await fetch('http://localhost:2010/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      setErro(dados.erro);
      return;
    }

    localStorage.setItem('token', dados.token);
    navigate('/tokenTeste');
  }

  return (
    <>
      <form onSubmit={entrar}>
      <h1>Login</h1>

      <input type="text" placeholder='E-mail' value={email} onChange={(event) => setEmail(event.target.value)} />

      <input type="password" placeholder="Senha" value={senha} onChange={(event) => setSenha(event.target.value)} />

      {erro && <p>{erro}</p>}

      <button>Entrar</button>
      </form>
    </>
  )
}


