create database petvibe;
use petvibe;



create table usuarios(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
imagem VARCHAR(800),
nome VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL UNIQUE,
telefone VARCHAR(20) UNIQUE,
senha VARCHAR(100),
cpf varchar(14) UNIQUE,
data_nascimento DATE
);

create table endereco_usuarios(
id_endereco_usuario INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT UNIQUE,
cep VARCHAR(10),

numero VARCHAR(20),
complemento VARCHAR(100),
bairro VARCHAR(100),
cidade VARCHAR(100),
estado VARCHAR(100),

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);


CREATE TABLE ong(
id_ong INT PRIMARY KEY AUTO_INCREMENT,
imagem VARCHAR(800),
nome VARCHAR(150) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
telefone VARCHAR(20) NOT NULL UNIQUE,
cnpj VARCHAR(18) UNIQUE,
senha VARCHAR(100),
descricao TEXT,
site VARCHAR(255)
);

CREATE TABLE endereco_ong(
id_endereco_ong INT PRIMARY KEY AUTO_INCREMENT,
id_ong INT UNIQUE,
cep VARCHAR(10),
rua VARCHAR(200),
numero VARCHAR(20),
complemento VARCHAR(100),
bairro VARCHAR(100),
cidade VARCHAR(100),
estado VARCHAR(100),

    FOREIGN KEY (id_ong) REFERENCES ong(id_ong)
);

create table perfil_animal(
id_animal int primary key auto_increment,
id_ong int,
imagem VARCHAR(800),
nome varchar(100),
idade int,
raca varchar(100),
data_de_nascimento date,
castrado boolean,
sexo varchar (20),
porte varchar (100),
descricao text,

foreign key (id_ong) references ong(id_ong)
);

CREATE TABLE prefs(
id_preferencia INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL UNIQUE,
animal_procurado VARCHAR(100),
tempo_sozinho DECIMAL(4,2),
possui_animais BOOLEAN,
possui_crianca BOOLEAN,

FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)

);

CREATE TABLE adocoes(
id_adocao INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT,  
id_animal INT,
situação ENUM('Reprovada','Pendente','Aprovada'),
FOREIGN KEY (id_usuario) References usuarios(id_usuario),
FOREIGN KEY (id_animal) REFERENCES perfil_animal(id_animal)
); 
