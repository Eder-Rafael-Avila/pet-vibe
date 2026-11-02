import './index.scss';

import { useState } from 'react';

export default function CadastreAnimal() {

    let imagem = false;

    const [foto, setFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);

    function selecionarFoto(e) {
        const arquivo = e.target.files[0];

        if (!arquivo) return;

        if (!arquivo.type.startsWith('image/')) {
            alert('Selecione um arquivo de imagem válido');
            e.target.value = '';
            return;
        }

        setFoto(arquivo);
        setPreviewFoto(URL.createObjectURL(arquivo));
    }

    return (
        <main className='comp-cadastre-animal'>
            <div className="title">
                <div className="icon">1</div>
                <h2>Informações Básicas</h2>
            </div>
            <div className="infos-basicas">
                <div className="essencial">
                    <div className="campo">
                        <label htmlFor="">Situação</label>
                        <input type="text" className='disabled' disabled value='Para adoção' />
                    </div>
                    <div className="campo">
                        <label htmlFor="especie">Espécie</label>
                        <select name="" id="">
                            <option value="">Cachorro</option>
                            <option value="">Gato</option>
                        </select>
                    </div>
                    <div className="campo">
                        <label htmlFor="especie">Gênero</label>
                        <select name="" id="">
                            <option value="">Macho</option>
                            <option value="">Fêmea</option>
                        </select>
                    </div>
                </div>
                <div className="imagem-animal">
                    <div className="acoes">
                        {previewFoto && (
                            <button
                                className='cancel'
                                onClick={() => setPreviewFoto('')}
                            >
                                Cancelar
                            </button>
                        )}
                       <label className='botao-foto'>
                           <i class="fa-solid fa-camera camera"></i>
                           Adicionar Imagem

                           <input type="file"
                                accept='image/*'
                                hidden
                                onChange={selecionarFoto}
                            />
                       </label>
                    </div>
                    {previewFoto != false ? (
                        <div className="imagem">
                            <div className="img"><img src={previewFoto} alt="" /></div>
                        </div>
                    ) : (
                        <div className="area-imagem">
                            <div className="sem-imagem">
                                <p>Sua imagem aqui</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="title-prefs">
                <div className="icon">2</div>
                <h2>Preferências em Animais</h2>
            </div>
            <div className="prefs">
                <div className="campo">
                    <label htmlFor="">
                        Raça
                    </label>
                    <input type="text"
                        placeholder='Ex: Golden Retriever, Pastor Alemão, Vira-lata...'
                    />
                </div>
                <div className="campo">
                    <label htmlFor="">
                        Porte
                    </label>
                    <select name="" id="">
                        <option value="">Grande</option>
                        <option value="">Médio</option>
                        <option value="">Pequeno</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="">
                        Temperamento
                    </label>
                    <select name="" id="">
                        <option value="">Calmo</option>
                        <option value="">Agitado</option>
                        <option value="">Neutro</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="">
                        Localização
                    </label>
                    <input type="text" />
                </div>
                <div className="campo">
                    <label htmlFor="">
                        Idade
                    </label>
                    <input type="number" />
                </div>
            </div>
        </main>
    );
}