export function CriarPrefsErrors(prefs) {

    if (!prefs.animal_procurado) {
        throw new Error('Animal procurado não informado')
    }

    if (prefs.tempo_sozinho === undefined) {
        throw new Error('Tempo sozinho não informado')
    }

    if (prefs.possui_animais === undefined) {
        throw new Error('Possui animais não informado')
    }

    if (prefs.possui_crianca === undefined) {
        throw new Error('Possui criança não informado')
    }
}


export function AlterarPrefsErrors(prefs) {

    if (
        prefs.animal_procurado === undefined &&
        prefs.tempo_sozinho === undefined &&
        prefs.possui_animais === undefined &&
        prefs.possui_crianca === undefined
    ) {
        throw new Error('Nenhuma preferência foi informada')
    }
}


export function ExcluirPrefsErrors(id_usuario) {

    if (!id_usuario) {
        throw new Error('Usuário não informado')
    }
}
