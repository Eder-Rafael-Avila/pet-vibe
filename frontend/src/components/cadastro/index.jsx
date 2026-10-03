import './index.scss'
import { Link } from 'react-router-dom';

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Cadastro(){

    return(
        <div className="page-cadastro">
            <div className="corpo">
                <form>
                 <h1>Crie a sua conta na PetVibe</h1>
                
                <div className="input">
                    <p>Nome completo *</p>

                    <input type="text" placeholder='João Pedro Souza Flores' />

                </div>
                 <div className="input">
                    <p>E-mail *</p>

                    <input type="text" placeholder='exemploemail@gmail.com'/>

                </div>
                 <div className="input">
                    <p>Telefone (opcional)</p>
                    <input type="Number" placeholder='(11) 4002-8922' />
                </div>
               <div className="linha-senha">
                    <div className="input-senha">
                          <p>Senha *</p>
                     <div className="campo">
                         <input type="password" placeholder="Mín. 8 caracteres" />
                         <FaEye className="olho" />
                 </div>
            </div>

                     <div className="input-senha">
                          <p>Confirmar senha *</p>
                         <div className="campo">
                    <input type="password" />
                          <FaEye className="olho" />
                  </div>
                    </div>
                </div>          
                <div className="button">
                    <button>Criar minha conta</button>
                </div>
                <div className="entrar">
                    <p>Já tem uma conta? <Link to='/Login'>Entrar</Link></p>
                </div>

                
                


                </form>

            </div>
        </div>


    )

}