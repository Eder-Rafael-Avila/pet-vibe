import { Router } from "express";
import { validarTokenOng } from "../utils/TokenEvalidacao.js";
import { CriarCampanhaService } from "../service/campanhas/CriarCampanhaService.js";
import multer from 'multer';
import { ExcluirCampanhaService } from "../service/campanhas/ExcluirCampanhaService.js";
const uploadCampanha = multer({ dest: 'src/uploads/ImagemCampanha    ' });
const endpoints = Router();

endpoints.post('/campanha/criar', validarTokenOng, uploadCampanha.single('imagem'), async(req,resp) => {
    try{
        let dados = JSON.parse(req.body.dados);
        const idOng = req.usuario.id_ong
        let campanha = {
            id_ong: idOng,
            imagem: req.file.filename,
            titulo: dados.titulo,
            descricao: dados.descricao,
            valor: dados.valor

        };

        let resposta = await CriarCampanhaService(campanha, idOng)

        resp.send({
            resposta: resposta
        })
    }
    catch(err){
            logError(err)
    resp.status(400).send (erroJson(err))
    }
})

endpoints.delete('/campanha/excluir', validarTokenOng, async(req,resp)=> {
    try{
        let id = req.body.id

        let resposta = await ExcluirCampanhaService(id)

        resp.send({
            resposta: resposta
        })
    }
    catch(err){
                   logError(err)
    resp.status(400).send (erroJson(err)) 
    }
})


export default endpoints;




