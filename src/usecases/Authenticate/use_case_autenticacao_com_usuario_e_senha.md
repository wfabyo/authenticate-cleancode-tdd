# Authenticate UseCase a user

## Dados
User
Password

## Fluxo primário
* Dado um usuário e senha válidos e não há uma sessão criada, deve-se retornar um token de validação

## fluxo alternativo
* Dado um usuário inválido, deve-se retornar mensagem informando o erro

## fluxo alternativo
* Dado um usuário válido e senha inválida, deve-se retornar mensagem informando o erro

## fluxo alternativo
* Dado um usuário e senha válidos e já há uma sessão criada, deve-se retornar o token de validação da sessão ativa

