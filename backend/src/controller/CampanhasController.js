import { Router } from "express";
import { validarToken, validarTokenOng } from "../utils/TokenEvalidacao.js";
import { CriarCampanhaService } from "../service/campanhas/CriarCampanhaService.js";
import multer from 'multer';
import { ExcluirCampanhaService } from "../service/campanhas/ExcluirCampanhaService.js";
import { DoarParaCampanhaService } from "../service/campanhas/DoarParaCampanhaService.js"; 
import { ListarCampanhasService } from "../service/campanhas/ListarCampanhaService.js";
import { ListarCampanhasOngService } from '../service/campanhas/ListarCampanhasOngService.js';
import { DadosCampanhaErrors } from '../validation/campanhasValidation.js';
import { ListarContribuidoresService } from '../service/campanhas/ListarContribuidoresService.js';

const uploadCampanha = multer({ dest: 'src/uploads/ImagemCampanha' });
const endpoints = Router();

endpoints.get('/campanhas/listar', validarToken, async (req, resp) => {
    try {
        let resposta = await ListarCampanhasService();
        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err)
        resp.status(400).send(erroJson(err))
    }
})

endpoints.get('/campanhas/ong/listar', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;
        let resposta = await ListarCampanhasOngService(idOng);

        resp.send({ resposta: resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.get('/campanha/:id/contribuidores', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;
        const resposta = await ListarContribuidoresService(req.params.id, idOng);
        resp.send({ resposta: resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.post('/campanha/criar', validarTokenOng, uploadCampanha.single('imagem'), async (req, resp) => {
    try {
        let dados = DadosCampanhaErrors(req.body?.dados);
        const idOng = req.usuario.id_ong
        let campanha = {
            id_ong: idOng,
            imagem: req.file?.filename,
            titulo: dados.titulo,
            descricao: dados.descricao,
            valor: dados.valor

        };

        let resposta = await CriarCampanhaService(campanha, idOng)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err)
        resp.status(400).send(erroJson(err))
    }
})

endpoints.delete('/campanha/excluir', validarTokenOng, async (req, resp) => {
    try {
        let id = req.body?.id

        let resposta = await ExcluirCampanhaService(id, req.usuario.id_ong)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err)
        resp.status(400).send(erroJson(err))
    }
})

endpoints.put('/campanha/doar', validarToken, async (req, resp) => {
    try {
        let valor = req.body?.valor;
        let id = req.body?.id;

        let resposta = await DoarParaCampanhaService(valor, id, req.usuario.id_usuario)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err)
        resp.status(400).send(erroJson(err))
    }
})


export default endpoints;




