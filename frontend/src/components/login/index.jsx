import './index.scss'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

export default function Login(){

    const[mostrarSenha, setMostrarSenha] = useState(false);

    return(

        <div className="page-login">
            <div className="corpo">
            <form>
                <h1>Acesse a sua conta</h1>
                <p>Bem-vindo de volta!</p>
                <div className="input">
                <input type="email" placeholder='exempleemail@gmail.com' />
                
                </div>
                <div className="input">
                    <input type={mostrarSenha ? "text" : "password"} placeholder='Senha' /> 

                     <button type='button' className='olhoBotao' onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye/>}
                 </button>
                </div>
                
                
                    <label>
                        <input type="checkbox" className='input-senha' />
                        Lembrar minha senha?
                    </label>
                        <Link to="#" id='senha' className='link-senha'> Esqueci minha senha</Link>
                    <button type="submit" className='Login'>Login</button>

                    <div className='Cadastrar'> 
                        <p>Não tem uma conta? <Link to="#" >Cadastre-se</Link></p>
                    </div>
                    
            </form>
        </div>
       </div>
    )
}