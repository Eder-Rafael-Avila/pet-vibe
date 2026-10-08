import './index.scss'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Cadastro(){

    const [mostrarSenha, setMostrarSenha] = useState(false) 
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false)

    return(
        <div className="page-cadastro">
            <div className="corpo">
                <form>

                <div className="logo">
                    <div className="imagem">
                            <img src="public/assets/images/logo4.webp" alt="Logo da petvibe" />
                    </div>
                </div>
                
                 <h1>Crie a sua conta na PetVibe</h1>
                
                <div className="input">
                    <p>Nome completo *</p>

                    <input type="text" placeholder='João Pedro Souza Flores' required />

                </div>
                 <div className="input">
                    <p>E-mail *</p>

                    <input type="text" placeholder='exemploemail@gmail.com' required />

                </div>
                 <div className="input">
                    <p>Telefone * </p>
                    <input type="Number" placeholder='(11) 4002-8922' required />
                </div>
                <div className="input">
                    <p>CPF *</p>
                    <input type="number" placeholder='123.123.123-67' required />
                </div>

                <div className="input">
                    <p>Data de nascimento</p>
                    <input type="date" required />
                </div>

               <div className="linha-senha">
                    <div className="input-senha">
                          <p>Senha *</p>
                     <div className="campo">
                         <input type={mostrarSenha ? "text" : "password"} placeholder="Mín. 8 caracteres"  />
                         <FaEye className="olho"/>


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
                    <input type={mostrarConfirmar ? "text" : "password"} />
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
                    <button>Criar minha conta</button>
                </div>
                <div className="entrar">
                    <p>Já tem uma conta? 
                        <NavLink to='/login'
                                 style={
                                    {
                                        color: "#F8561F",
                                        marginLeft: ".5rem"
                                    }
                                 }                              
                        >Entrar</NavLink> </p>
                </div>

                
                


                </form>

            </div>
        </div>


    )

}