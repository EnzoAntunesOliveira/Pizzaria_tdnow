# Sistema de Gestão de Pedidos e Entregas

Este projeto tem como objetivo desenvolver um sistema de gestão de pedidos para uma empresa, onde o dono pode visualizar e organizar os pedidos dos clientes. Futuramente, o sistema permitirá acessar o histórico de pedidos de cada cliente e gerenciar o processo de entrega, incluindo o monitoramento dos entregadores.

## Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para a criação de interfaces de usuário.
- **Next.js**: Framework React para desenvolvimento de aplicações web com renderização do lado do servidor.
- **CSS**: Para estilização de componentes.
- **API REST**: Integração com backend para gerenciamento de pedidos, endereços e login.

## Funcionalidades Implementadas

### 1. **Login**
O sistema possui uma tela de login onde o usuário (dono) pode se autenticar, digitando seu email e senha.

- **Componentes**: 
  - `LoginButton`: Componente reutilizável de botão para efetuar o login.
  - `getLogin`: Função responsável por realizar o login utilizando a API.

### 2. **Visualização de Pedidos**
Após o login, o usuário pode visualizar a lista de pedidos feitos pelos clientes, incluindo informações como:
- ID do pedido
- Data e hora
- Valor
- Endereço do cliente
- Descrição do pedido
- Status de entrega

### 3. **Download de Pedidos**
O sistema permite ao usuário fazer o download de um arquivo PDF com os detalhes de cada pedido, diretamente da tabela.

### 4. **Estilização**
O sistema está estilizado utilizando CSS para criar uma interface amigável e intuitiva, com foco na responsividade e na organização dos elementos visuais.

## Funcionalidades Futuras

- Histórico de pedidos de cada cliente.
- Gestão de entregas com acompanhamento em tempo real dos motoboys.
