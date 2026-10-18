export function AprovarAdocaoErrors(idOng, idAdocao) {
    if (!idOng) {
        throw new Error("Informe o ID de ONG");
    }

    if (isNaN(idOng)) {
        throw new Error("O ID de ONG deve ser um número");
    }

    if (idOng < 0) {
        throw new Error("O ID de ONG não pode ser menor que zero");
    }

    if (Number(idOng) === 0) {
        throw new Error("O ID de ONG não pode ser zero");
    }
    if (!idAdocao) {
        throw new Error("Informe o ID de adoção");
    }

    if (isNaN(idAdocao)) {
        throw new Error("O ID de adoção deve ser um número");
    }

    if (idAdocao < 0) {
        throw new Error("O ID de adoção não pode ser menor que zero");
    }

    if (Number(idAdocao) === 0) {
        throw new Error("O ID de adoção não pode ser zero");
    }
}

export function ReprovarAdocaoErrors(idOng, idAdocao) {
    if (!idOng) {
        throw new Error("Informe o ID de ONG");
    }

    if (isNaN(idOng)) {
        throw new Error("O ID de ONG deve ser um número");
    }

    if (idOng < 0) {
        throw new Error("O ID de ONG não pode ser menor que zero");
    }

    if (Number(idOng) === 0) {
        throw new Error("O ID de ONG não pode ser zero");
    }
    if (!idAdocao) {
        throw new Error("Informe o ID de adoção");
    }

    if (isNaN(idAdocao)) {
        throw new Error("O ID de adoção deve ser um número");
    }

    if (idAdocao < 0) {
        throw new Error("O ID de adoção não pode ser menor que zero");
    }

    if (Number(idAdocao) === 0) {
        throw new Error("O ID de adoção não pode ser zero");
    }
}

export function ExcluirAdocaoErrors(idUsuario, idAdocao) {
    if (!idUsuario) {
        throw new Error("Informe o ID de usuário");
    }

    if (isNaN(idUsuario)) {
        throw new Error("O ID de usuário deve ser um número");
    }

    if (idUsuario < 0) {
        throw new Error("O ID de usuário não pode ser menor que zero");
    }

    if (Number(idUsuario) === 0) {
        throw new Error("O ID de usuário não pode ser zero");
    }
    if (!idAdocao) {
        throw new Error("Informe o ID de adoção");
    }

    if (isNaN(idAdocao)) {
        throw new Error("O ID de adoção deve ser um número");
    }

    if (idAdocao < 0) {
        throw new Error("O ID de adoção não pode ser menor que zero");
    }

    if (Number(idAdocao) === 0) {
        throw new Error("O ID de adoção não pode ser zero");
    }
}

export function CriarAdocaoErrors(idUsuario, idAnimal) {
    if (!idUsuario) {
        throw new Error("Informe o ID de usuário");
    }

    if (isNaN(idUsuario)) {
        throw new Error("O ID de usuário deve ser um número");
    }

    if (idUsuario < 0) {
        throw new Error("O ID de usuário não pode ser menor que zero");
    }

    if (Number(idUsuario) === 0) {
        throw new Error("O ID de usuário não pode ser zero");
    }
    if (!idAnimal) {
        throw new Error("Informe o ID de animal");
    }

    if (isNaN(idAnimal)) {
        throw new Error("O ID de animal deve ser um número");
    }

    if (idAnimal < 0) {
        throw new Error("O ID de animal não pode ser menor que zero");
    }

    if (Number(idAnimal) === 0) {
        throw new Error("O ID de animal não pode ser zero");
    }
}

export function ListarAdocoesUsuarioErrors(idUsuario) {
    if (!idUsuario) {
        throw new Error("Informe o ID de usuário");
    }

    if (isNaN(idUsuario)) {
        throw new Error("O ID de usuário deve ser um número");
    }

    if (idUsuario < 0) {
        throw new Error("O ID de usuário não pode ser menor que zero");
    }

    if (Number(idUsuario) === 0) {
        throw new Error("O ID de usuário não pode ser zero");
    }
}

export function ListarAdocoesAprovadasOngErrors(idOng) {
    if (!idOng) {
        throw new Error("Informe o ID de ONG");
    }

    if (isNaN(idOng)) {
        throw new Error("O ID de ONG deve ser um número");
    }

    if (idOng < 0) {
        throw new Error("O ID de ONG não pode ser menor que zero");
    }

    if (Number(idOng) === 0) {
        throw new Error("O ID de ONG não pode ser zero");
    }
}

export function ListarAdocoesReprovadasOngErrors(idOng) {
    if (!idOng) {
        throw new Error("Informe o ID de ONG");
    }

    if (isNaN(idOng)) {
        throw new Error("O ID de ONG deve ser um número");
    }

    if (idOng < 0) {
        throw new Error("O ID de ONG não pode ser menor que zero");
    }

    if (Number(idOng) === 0) {
        throw new Error("O ID de ONG não pode ser zero");
    }
}

export function ListarAdocoesPendentesOngErrors(idOng) {
    if (!idOng) {
        throw new Error("Informe o ID de ONG");
    }

    if (isNaN(idOng)) {
        throw new Error("O ID de ONG deve ser um número");
    }

    if (idOng < 0) {
        throw new Error("O ID de ONG não pode ser menor que zero");
    }

    if (Number(idOng) === 0) {
        throw new Error("O ID de ONG não pode ser zero");
    }
}
