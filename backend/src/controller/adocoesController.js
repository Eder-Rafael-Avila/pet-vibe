import { Router } from 'express';
import { ListarAdocoesAprovadasOngService } from '../service/adocoes/ListarAdocoesAprovadasOngService.js';
import { ListarAdocoesReprovadasOngService } from '../service/adocoes/ListarAdocoesReprovadasOngService.js';
import { AprovarAdocaoService } from '../service/adocoes/AprovarAdocaoService.js';
import { ReprovarAdocaoService } from '../service/adocoes/ReprovarAdocaoService.js';
import { ListarAdocoesPendentesOngService } from '../service/adocoes/ListarAdocoesPendentesOngService.js';
import { ExcluirAdocaoService } from '../service/adocoes/ExcluirAdocaoService.js';
import { ListarAdocoesUsuarioService } from '../service/adocoes/ListarAdocoesUsuarioService.js';
import { CriarAdocaoService } from '../service/adocoes/CriarAdocaoService.js';
import { validarToken, validarTokenOng } from '../utils/TokenEvalidacao.js';

const endpoints = Router();

endpoints.get('/adocoes/ong/aprovadas', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;
        const resposta = await ListarAdocoesAprovadasOngService(idOng);

        resp.send(resposta);
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/adocoes/ong/reprovadas', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;
        const resposta = await ListarAdocoesReprovadasOngService(idOng);

        resp.send(resposta);
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/adocoes/aprovar/:id', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;
        const idAdocao = Number(req.params.id);

        const resposta = await AprovarAdocaoService(idOng, idAdocao);

        if (resposta === 0) {
            return resp.status(404).send({ erro: 'Adoção não encontrada para esta ONG' });
        }

        resp.send({ mensagem: 'Solicitação de adoção aprovada com sucesso!' });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/adocoes/reprovar/:id', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;
        const idAdocao = Number(req.params.id);

        const resposta = await ReprovarAdocaoService(idOng, idAdocao);

        if (resposta === 0) {
            return resp.status(404).send({ erro: 'Adoção não encontrada para esta ONG' });
        }

        resp.send({ mensagem: 'Solicitação de adoção reprovada com sucesso!' });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/adocoes/ong/pendentes', validarTokenOng, async (req, resp) => {
    try {
        // O middleware valida o token da ONG e disponibiliza seu ID.
        const idOng = req.usuario.id_ong;
        const resposta = await ListarAdocoesPendentesOngService(idOng);

        resp.send(resposta);
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/adocoes/listar', validarToken, async (req, resp) => {
    try {
        const idUsuario = req.usuario.id_usuario;
        const resposta = await ListarAdocoesUsuarioService(idUsuario);

        resp.send(resposta);
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.post('/adocoes/criar', validarToken, async (req, resp) => {
    try {
        // O usuário vem do token validado; o animal vem do corpo da requisição.
        const idUsuario = req.usuario.id_usuario;
        const idAnimal = req.body?.id_animal;

        // O repository obtém a ONG pelo animal e cria a solicitação pendente.
        const idAdocao = await CriarAdocaoService(idUsuario, idAnimal);

        resp.send({
            mensagem: 'Solicitação de adoção criada com sucesso!',
            id_adocao: idAdocao
        });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.delete('/adocoes/excluir/:id', validarToken, async (req, resp) => {
    try {
        const idUsuario = req.usuario.id_usuario;
        const idAdocao = Number(req.params.id);

        const excluidas = await ExcluirAdocaoService(idUsuario, idAdocao);

        resp.send({ mensagem: 'Solicitação de adoção excluída com sucesso!' });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

export default endpoints;
