import './index.scss'
import { Link } from 'react-router-dom'

export default function Login(){

    return(

        <div className="page-login">
            <div class="corpo">
            <form>
                <h1>Login</h1>
                <div className="input">
                <input type="email" placeholder='exempleemail@gmail.com' />
                
                </div>
                <div className="input">
                    <input type="password" placeholder='Senha' />
                    
                </div>
                <div className='LembrarSenha'>
                    <label>
                        <input type="checkbox"  />
                        Lembrar minha senha?
                    </label>
                        <Link to="#"> Esqueci minha senha</Link>
                    </div>
                    <button type="submit">Login</button>

                    <div className='Cadastrar'> 
                        <p>Não tem uma conta? <Link to="/Cadastro">Cadastre-se</Link></p>
                    </div>
            </form>
        </div>
        </div>
    )
}