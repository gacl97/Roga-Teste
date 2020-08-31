# Roga-Teste

## Índice
  - [O que foi utilizado](#o-que-foi-utilizado)
  - [Instruções para baixar e configurar o projeto](#instruções-para-baixar-e-configurar-o-projeto)
  - [Configurando Banco de dados](#configurando-banco-de-dados)
  - [Rodando migrations:](#rodando-migrations)
  - [Iniciando o projeto:](#iniciando-o-projeto)
  - [Funcionalidades](#funcionalidades)
  - [Cadastrando uma denúncia no projeto](#cadastrando-uma-denúncia-no-projeto)
  - [Listando denúncias cadastradas](#listando-denúncias-cadastradas)


<a id="o-que-foi-utilizado"></a>

## O que foi utilizado
***

- **Node**;
- **Express**;
- **TypeScript;**
- **Redis para cache**;
- **Postgres**

Utilização do padrão Data Mapper Pattern em que se separa melhor as responsabilidades da aplicação, com isso focando nos princípios SOLID. Dentro os princípios que foram utilizados:

- **(Separation of Concerns)** Separação das responsabilidades entre cada arquivo.
- **(Don't Repeat Yourself)** Reaproveitamento de código com os Services.
- **(Single Responsability Principle)** Classe com uma única funcionalidade.
- **(Dependency Inversion Principle)**

<a id="instructions"></a>

## Instruções para baixar e configurar o projeto
***

Primeiramente clonar o repositório:

    git clone https://github.com/gacl97/Roga-Teste.git

Entrar no diretório da pasta e baixar as depêndencias, caso utilizando Yarn:
      
    yarn

Caso npm:

    npm

***

<a id="database"></a>

## Configurando Banco de dados

Com as depêndencias baixadas, agora como configurar o banco de dados:

Caso possua docker instalado na máquina:

    docker run --name roga-teste-postgres -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=roga_database -p 5432:5432 -d postgres

Com isso já irá criar o container e o banco de dados que irá ser utilizado no projeto. 

Caso não possua docker instalado na máquina, será necessário entrar no arquivo:

    ormconfig.json

e adaptar o:
    
    username, password e port

para as configurações da sua máquina e criar um banco de dados com o nome:

    roga_database

***

<a id="migrations"></a>

## Rodando migrations:

Para criar as tabelas que serão utilizadas no projeto:

    yarn typeorm migration:run

***

<a id="init-project"></a>

## Iniciando o projeto:

Com isso todo o projeto já está configurado e pronto para uso, para iniciar o servidor:

    yarn dev:server

Projeto estará rodando na porta 3333.

***

<a id="funcionalidades"></a>

## Funcionalidades

- Cadastrar uma denúncia;
- Listar denúncias;

<a id="cadastrando-uma-denúncia-no-projeto"></a>

## Cadastrando uma denúncia no projeto

Exemplo de requisição:

    {
      "latitude": -20.499751,
      "longitude": -43.861278,
      "whistleblower": {
        "name": "José de Oliveira",
        "cpf": "95761638037"
      },
      "report": {
        "title": "Esgoto a céu aberto",
        "description": "Existe um esgoto a céu aberto nesta localidade."
      }
    }

A requisição deverá estar nesse formato, caso contrário não irá funcionar.

Rota para chamada:

    http://localhost:3333/report

Método POST.

***

<a id="listando-denúncias-cadastradas"></a>

## Listando denúncias cadastradas
Para listar utilizar método GET com a rota:

    http://localhost:3333/report
