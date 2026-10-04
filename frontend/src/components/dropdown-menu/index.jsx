import './index.scss';

import { NavLink } from 'react-router-dom';

export default function DropdownMenu({
    isActive,
    setIsActive
}) {

    return (
        <div className="comp-dropdown-menu">
            <div className={`icon ${isActive ? 'turned' : 'unturned'}`}>
                <button onClick={() => {
                    setIsActive(!isActive);
                    console.log(isActive);
                }}>
                    <i className="fa-solid fa-list-ul" style={{color: "#105F56",}}></i>
                </button>
            </div>
            <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li>
                        <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Início</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/sobreNos"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Sobre Nós</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/comoFunciona"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Marketplace</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/animais"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Adoção</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/ongsParceiras"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>ONGs Parceiras</p></NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}