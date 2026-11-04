import './index.scss';
import { useState } from 'react';

export default function Carteira() {
    const [valores, setValores] = useState(false);
    const [fundos, setFundos] = useState([]);

    async function BuscarFundos() {
        try {
            let resposta = await fetch('http://localhost:6767/carteira/listarFundos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            let dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro);
            }

            setFundos(dados.resposta);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="comp-carteira">
            <div className="carteira" onClick={(e) => {
                setValores(true);
                BuscarFundos();
            }}>
                <i className="fa-solid fa-wallet"></i>

                <p>
                    R$ {fundos.length > 0
                        ? Number(fundos[0].fundos).toFixed(2).replace('.', ',')
                        : '0,00'}
                </p>

                {valores && (
                    <div className="modal">
                        <button className='fechar-modal' onClick={(e) => {
                            e.stopPropagation();
                            setValores(false);
                        }}>
                            <i className="fa-solid fa-x"></i>
                        </button>

                        <div className="card-modal">
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}