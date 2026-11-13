export function CriarEnderecoUsuarioErrors(enderecoCadastrado) {
    if (enderecoCadastrado) {
        throw new Error('Endereço já cadastrado.');
    }
}
