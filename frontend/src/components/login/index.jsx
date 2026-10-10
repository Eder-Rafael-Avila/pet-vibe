import './index.scss'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Login(){

    const[mostrarSenha, setMostrarSenha] = useState(false);

    return(

        <div className="page-login">
            <div className="corpo">
            <form>
                <div className="logo">
                    <div className="imagem">
                        <img src="public/assets/images/logo4.webp" alt="" />
                    </div>
                </div>
                <h1>Acesse a sua conta</h1> 
                <p>Bem-vindo de volta!</p> 
                <div className="input">
                    <FaEnvelope className='icone-email' />
                <input  type="email" placeholder='exemploemail@gmail.com' /> 
                
                
                </div>
                <div className="input">
                    <FaLock  className='icone-senha'/>
                    <input type={mostrarSenha ? "text" : "password"} placeholder='Senha' /> 

                     <button type='button' className='olhoBotao' onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye/>}
                 </button>
                </div>
                
                
                   
                <div className="opcoes-senha">
                    <label>
                         <input type="checkbox" className="input-senha" />
                            Lembrar minha senha?
                    </label>

                            <NavLink to="#" id="senha"><span>Esqueci minha senha</span></NavLink>
                </div>

                    <button type="submit" className='Login'>Login</button>

                    <div className='Cadastrar'> 
                        <p>Não tem uma conta? 
                            <NavLink to='/Cadastro' className='cadastro-link'><span>Cadastre-se</span></NavLink>
                        </p>
                    </div>
                    
            </form>
        </div>
       </div>
    )
}