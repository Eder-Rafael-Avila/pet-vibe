export function CriarPrefsErrors(prefs) {

    if (!prefs.animal_procurado) {
        throw new Error('Informe o animal que você está procurando.')
    }

    if (prefs.tempo_sozinho === undefined) {
        throw new Error('Informe por quanto tempo o animal ficará sozinho.')
    }

    if (prefs.possui_animais === undefined) {
        throw new Error('Informe se há outros animais na residência.')
    }

    if (prefs.possui_crianca === undefined) {
        throw new Error('Informe se há crianças na residência.')
    }
}


export function AlterarPrefsErrors(prefs) {

    if (
        prefs.animal_procurado === undefined &&
        prefs.tempo_sozinho === undefined &&
        prefs.possui_animais === undefined &&
        prefs.possui_crianca === undefined
    ) {
        throw new Error('Informe pelo menos uma preferência para realizar a alteração.')
    }
}


export function ExcluirPrefsErrors(id_usuario) {

    if (!id_usuario) {
        throw new Error('Informe o usuário cujas preferências deseja excluir.')
    }
}
