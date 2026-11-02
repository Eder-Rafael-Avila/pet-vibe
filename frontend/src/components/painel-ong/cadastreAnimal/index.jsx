import './index.scss';

export default function CadastreAnimal() {

    return (
        <main className='comp-cadastre-animal'>
            <div className="title">
                <h2>Cadastre um animal para adoção</h2>
            </div>
            <div className="essencial">
                <div className="campo">
                    <label htmlFor="">Situação</label>
                    <input type="text" disabled value='Para adoção' />
                </div>
                <div className="campo">
                    <label htmlFor="especie">Espécie</label>
                    <select name="" id="">
                        <option value="">Cachorro</option>
                        <option value="">Gato</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="especie">Espécie</label>
                    <select name="" id="">
                        <option value="">Macho</option>
                        <option value="">Fêmea</option>
                    </select>
                </div>
            </div>
        </main>
    );
}