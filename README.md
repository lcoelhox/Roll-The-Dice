# Boas vindas ao repositório Roll The Dice! :game_die:


## Sobre
Desafio técnico de uma aplicação Fullstack onde simula dados de RPG, de até 100 lados!
A aplicação foi contruida em JavaScript, sendo o FrameWork React para o front e NodeJS para o back, realizei os testes em Jest, e subi a aplicação em containers docker

## Stacks utilizadas
- JavaScript
- NodeJS
- React
- Jest
- Docker
- CSS

## Executando com Docker :whale2:
1. Clone o repositório `git@github.com:lcoelhox/Roll-The-Dice.git`
2. Instale as dependências com `npm install` na pasta /backend, logo em seguida repita a mesma ação na pasta /frontend.
3. Volte até a pasta raiz do projeto, e execute o comando `docker-compose up -d`, esse comando ira subir 2 containers, um back-end e um do front-end. (OBS: Os containers do Fast-Double-Click estão com o mesmo nome, em caso de erro, execute docker-compose down nos containers do outro projeto).
4. Acesse o endereço http://localhost:3000 para visualizar o site, ou caso tenha a extensão do docker clique com o botão direito no container do frontend e clique em "Open in Browser".

## Executando localmente
1. Clone o repositório `git@github.com:lcoelhox/Roll-The-Dice.git`.
2. Certifique-se que o node está na versão 16 ou superior, com comando: `node -v`.
3. Se não estiver na versão 16 basta executar o comando: `nvm use 16`.
4. Instale as dependência com `npm install` na pasta /backend, logo em seguida repita a mesma ação na pasta /frontend.
5. Na pasta backend execute o seguinte comando `npm run dev`.
6. Na pasta frontend execute o seguinte comando `npm start`. Logo em seguida você será redirecionado para o site.

## Rodando os testes em Jest
- Back-End
1. Entre na pasta /backend.
2. Execute o comando `npm test`.

- Front-End
1. Entre na pasta /frontend.
2. Execute o comando `npm test`.

## :copyright: Direitos Autorais
Este projeto foi desenvolvido por Lucas Coelho. É permitido baixar ou clonar o repositório para fins de estudo, porém não é permitida a publicação de cópias totais ou parciais do mesmo. Esta isenção de responsabilidade não abrange bibliotecas e dependências, que estão sujeitas às suas respectivas licenças.
