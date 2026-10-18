export function formatarCpf(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    return numeros
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    if (numeros.length <= 2) {
        return numeros.length ? `(${numeros}` : '';
    }

    if (numeros.length <= 6) {
        return numeros.replace(/^(\d{2})(\d+)/, '($1) $2');
    }

    if (numeros.length <= 10) {
        return numeros.replace(
            /^(\d{2})(\d{4})(\d{1,4})$/,
            '($1) $2-$3'
        );
    }

    return numeros.replace(
        /^(\d{2})(\d{5})(\d{1,4})$/,
        '($1) $2-$3'
    );

}