
export function CriarPrefsErrors(prefs) {

    if (!prefs.Onde_Mora) {
        throw new Error('Informe onde você mora.');
    }

    if (!prefs.Animal_Sozinho_Tempo) {
        throw new Error('Informe por quanto tempo o animal ficará sozinho.');
    }

    if (!prefs.possui_animais) {
        throw new Error('Informe se há outros animais na residência.');
    }

    if (!prefs.possui_crianca) {
        throw new Error('Informe se há crianças na residência.');
    }

    if (!prefs.Ja_Teve_animais) {
        throw new Error('Informe se você já teve animais.');
    }

    const moradias = ['Apartamento', 'Casa'];
    const tempos = [
        'Até 4 horas por dia',
        'Mais de 4 horas por dia'
    ];
    const respostasSimNao = ['Sim', 'Não'];

    if (!moradias.includes(prefs.Onde_Mora)) {
        throw new Error('Opção de moradia inválida.');
    }

    if (!tempos.includes(prefs.Animal_Sozinho_Tempo)) {
        throw new Error('Tempo informado inválido.');
    }

    if (!respostasSimNao.includes(prefs.possui_animais) ||
        !respostasSimNao.includes(prefs.possui_crianca) ||
        !respostasSimNao.includes(prefs.Ja_Teve_animais)) {
        throw new Error('Uma das respostas informadas é inválida.');
    }
}


export function AlterarPrefsErrors(prefs) {

    const campos = [
        'Onde_Mora',
        'Animal_Sozinho_Tempo',
        'possui_animais',
        'possui_crianca',
        'Ja_Teve_animais'
    ];

    const possuiCampo = campos.some(campo =>
        prefs[campo] !== undefined
    );

    if (!possuiCampo) {
        throw new Error(
            'Informe pelo menos uma preferência para realizar a alteração.'
        );
    }
}


export function ExcluirPrefsErrors(id_usuario) {

    if (!id_usuario) {
        throw new Error(
            'Informe o usuário cujas preferências deseja excluir.'
        );
    }
}
