import { Router } from "express";
const endpoints = Router();
import { validarTokenOng } from '../utils/TokenEvalidacao.js';
import multer from 'multer';
import { ListarAnimaisService } from '../service/perfil_animal/ListarAnimaisService.js';
import { ListarAnimalPorNomeService } from '../service/perfil_animal/ListarAnimalPorNomeService.js';
import { CriarAnimalService } from '../service/perfil_animal/CriarAnimalService.js';
import { ExcluirAnimalService } from '../service/perfil_animal/ExcluirAnimalService.js';
const uploadAnimal = multer({ dest: 'src/uploads/ImagemAnimais' });

endpoints.get('/animais/listar', async (req, resp) => {
    try {

        let resposta = await ListarAnimaisService()

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.get('/animal/listar/:nome', async (req, resp) => {
    try {

        let nome = req.params.nome;

        let resposta = await ListarAnimalPorNomeService(nome)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.post('/animal/cadastrar', validarTokenOng, uploadAnimal.single('imagem'), async (req, resp) => {
    try {
        let dados = JSON.parse(req.body.dados);
        const idOng = req.usuario.id_ong
        let animal = {
            id_ong: req.idOng,
            imagem: req.file.filename,
            nome: dados.nome,
            idade: dados.idade,
            raca: dados.raca,
            data_de_nascimento: dados.data_de_nascimento,
            castrado: dados.castrado,
            sexo: dados.sexo,
            porte: dados.porte,
            descricao: dados.descricao
        };

        let resposta = await CriarAnimalService(idOng, animal);

        resp.status(201).send({
            mensagem: 'Animal cadastrado com sucesso!',
            id_animal: resposta
        });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }

}
);

endpoints.delete('/animal/excluir/:id', validarTokenOng, async (req, resp) => {
    try {
        let id = req.params.id;

        let resposta = await ExcluirAnimalService(id);

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

export default endpoints;
