import { Router } from "express";
const endpoints = Router();
import * as dbAnimal from '../repository/PerfilAnimalRepository.js';
import {validarTokenOng } from '../utils/TokenEvalidacao.js';
import multer from 'multer';
const uploadAnimal = multer({ dest: 'src/uploads/ImagemAnimais' });

endpoints.get('/animais/listar', async (req,resp) => {

    let resposta = await dbAnimal.ListarAnimais()

    resp.send({
        resposta: resposta
    })
})

endpoints.get('/animal/listar/:nome', async (req,resp) => {

    let nome = req.params.nome;

    let resposta = await dbAnimal.ListarAnimalPorNome(nome)

    resp.send({
        resposta: resposta
    })
})

endpoints.post('/animal/cadastrar', validarTokenOng, uploadAnimal.single('imagem'), async (req, resp) => {
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

            let resposta = await dbAnimal.CriarAnimal(idOng,animal);

            resp.status(201).send({
                mensagem: 'Animal cadastrado com sucesso!',
                id_animal: resposta
            });

    
    }
);     

export default endpoints;