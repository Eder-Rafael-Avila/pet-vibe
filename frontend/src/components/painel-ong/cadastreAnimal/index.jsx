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
        <form className='comp-cadastre-animal'>
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
                    <div className="campo">
                        <label htmlFor="especie">Castrado?</label>
                        <select name="" id="">
                            <option value="">Sim</option>
                            <option value="">Não</option>
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
                    {previewFoto ? (
                        <div className="imagem">
                            <div className="img"><img src={previewFoto} alt="" /></div>
                        </div>
                    ) : (
                        <div className="area-imagem">
                            <div className="sem-imagem">
                                <p>Foto do animal</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="title-prefs">
                <div className="icon">2</div>
                <h2>Preferências e Características</h2>
            </div>
            <div className="prefs">
                <div className="campo nome-animal">
                    <label htmlFor="">
                        Nome do animal *
                    </label>
                    <input type="text"
                        placeholder='Nome do seu animal aqui'
                        required
                        minLength={2}
                    />
                </div>

                <hr />

                <div className="campo">
                    <label htmlFor="">
                        Raça *
                    </label>
                    <input type="text"
                        placeholder='Ex: Golden Retriever, Pastor Alemão, Vira-lata...'
                        required
                    />
                </div>
                <div className="campo">
                    <label htmlFor="">
                        Porte *
                    </label>
                    <select name="" id="" required>
                        <option value="">Grande</option>
                        <option value="">Médio</option>
                        <option value="">Pequeno</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="">
                        Temperamento *
                    </label>
                    <select name="" id="" required>
                        <option value="">Calmo</option>
                        <option value="">Agitado</option>
                        <option value="">Neutro</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="">
                        Localização *
                    </label>
                    <select id="estado" name="estado" required>
                        <option value="">Selecione o Estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="">
                        Idade *
                    </label>
                    <input type="number" required />
                </div>

                <hr />

                <div className="campo desc-area">
                        <label htmlFor="text">
                            Adicione uma pequena descrição para seu animal
                        </label>
                        
                        <textarea id='text' className='desc' maxLength={100}>
                        </textarea>
                </div>
            </div>

            <div className="button">
                <button>
                    Anunciar meu pet <i class="fa-solid fa-bullhorn announce"></i>
                </button>
            </div>
        </form>
    );
}