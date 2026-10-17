import { horaAtual } from "./dateTime.js"


global.erroJson = function erroJson(err) {
    let obj = {
        erro: err.message
    }
    return obj
}

global.logError = function logError(err) {
    console.log(horaAtual() + " ERROR " + err.message)
}