import './index.scss';
import { useState } from 'react';
export default function Carteira() {
    const [valores, setValores] = useState(false);


    return (
        <div className="comp-carteira">
            <div className="carteira" onClick={(e) => setValores(true)}>
                <i class="fa-solid fa-wallet"></i>
                <p>R$ 0,00</p>


                {valores && (
                    <div className="modal">
                        <button className='fechar-modal' onClick={(e) => {
                            e.stopPropagation();
                            setValores(false);
                        }}>
                            <i class="fa-solid fa-x"></i>
                        </button>

                        <div className="card-modal">
                        </div>
                    </div>
                )}
                

            </div>
        </div>
    )
}

