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
        const resultado = await CriarAdocaoService(idUsuario, idAnimal);

        if (resultado.status === 'duplicada') {
            return resp.status(409).send({
                erro: 'Você já enviou uma solicitação para este animal.'
            });
        }

        if (resultado.status === 'indisponivel') {
            return resp.status(409).send({
                erro: 'Este animal já possui uma solicitação ativa ou foi adotado.'
            });
        }

        if (resultado.status === 'animal_nao_encontrado') {
            return resp.status(404).send({
                erro: 'Animal não encontrado ou indisponível para adoção.'
            });
        }

        if (resultado.status !== 'criada') {
            throw new Error('Resultado inesperado ao criar a solicitação de adoção.');
        }

        resp.send({
            mensagem: 'Solicitação de adoção criada com sucesso!',
            id_adocao: resultado.idAdocao
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

        if (excluidas === 0) {
            return resp.status(404).send({
                erro: 'Solicitação não encontrada ou não pode ser excluída.'
            });
        }

        resp.send({ mensagem: 'Solicitação de adoção excluída com sucesso!' });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

export default endpoints;
