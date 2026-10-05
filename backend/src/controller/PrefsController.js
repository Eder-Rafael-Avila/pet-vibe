import { Router } from 'express'
const endpoints = Router()
import { validarToken } from '../utils/TokenEvalidacao.js'

import { ListarPrefsService } from '../service/prefs/ListarPrefsService.js'
import { CriarPrefsService } from '../service/prefs/CriarPrefsService.js'
import { AlterarPrefsService } from '../service/prefs/AlterarPrefsService.js'
import { ExcluirPrefsService } from '../service/prefs/ExcluirPrefsService.js'


endpoints.get('/prefs', validarToken, async (req, resp) => {


    let id_usuario = req.usuario.id_usuario

    let resposta = await ListarPrefsService(id_usuario)

    resp.send({
        resposta: resposta
    })
})

endpoints.post('/prefs', validarToken, async (req, resp) => {
    try {

        let id_usuario = req.usuario.id_usuario
        let prefs = req.body

        let resposta = await CriarPrefsService(id_usuario, prefs)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err)
        resp.status(400).send(erroJson(err))
    }
})


endpoints.patch('/prefs', validarToken, async (req, resp) => {
    try {

        let id_usuario = req.usuario.id_usuario
        let prefs = req.body

        let resposta = await AlterarPrefsService(
            id_usuario,
            prefs
        )

        resp.send({
            resposta: resposta
        })

    }
    catch (err) {
        logError(err)
        resp.status(400).send(erroJson(err))
    }
})

endpoints.delete('/prefs', validarToken, async (req, resp) => {
    try {

        let id_usuario = req.usuario.id_usuario

        let resposta = await ExcluirPrefsService(id_usuario)

        resp.send({
            resposta: resposta
        })

    }
    catch (err) {
        logError(err)
        resp.status(400).send(erroJson(err))
    }
})

export default endpoints
