import { Router } from "express";
const endpoints = Router();
import * as dbAnimal from '../repository/PerfilAnimalRepository.js';
import {validarTokenOng } from '../utils/TokenEvalidacao.js';
import multer from 'multer';
const uploadAnimal = multer({ dest: 'src/uploads/ImagemAnimais' });

endpoints.get('/animais/listar', validarTokenOng , async (req,resp) => {

    let resposta = await dbAnimal.ListarAnimais()

    resp.send({
        resposta: resposta
    })
})

endpoints.get('/animal/listar/:nome', validarTokenOng  , async (req,resp) => {

    let nome = req.params.nome;

    let resposta = await dbAnimal.ListarAnimalPorNome(nome)

    resp.send({
        resposta: resposta
    })
})

endpoints.post('/animal/cadastrar',  uploadAnimal.single('imagem'), async (req,resp) => {
    let imagem = req.file;
    let animal = req.body;

    let resposta = await dbAnimal.CriarAnimal(imagem,animal)

    resp.send({
        resposta: resposta
    })
})

export default endpoints;