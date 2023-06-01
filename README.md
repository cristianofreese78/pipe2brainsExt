# pipe2brains
Desafio C: Como acelerar o processo de abertura de empresas

11/03/23 - Protótipo Telas - Desenvolvido por Emylli Lima -
        https://www.figma.com/file/Y3v7jvNKDCRWzPsjBJ4RLw/Untitled?node-id=0-1&t=FRJy0ZcS5fZndNvj-0

11/03/23 - 
Primeiras implementações página de validações do usuário
Rascunhos e coletas iniciais de informações
 
13/03/23 - API fictícia /consultacpf
Opções: GET - / - Retorna lista com todos os dados dos individuos contidos no objeto Listas
        GET - /(cpf) - Retorna objeto contendo os dados de um individuo por CPF

14/03/23 - API fictícia /consultaviabilidadepmb
Opções:  GET - / - Retorna lista com todos os cadastros de IPTU contidos no objeto Listas
         GET - /(cadiptu) - Retorna objeto contendo os dados de IPTU de um registro pelo nr de cadastro
         POST - / - Envia objeto json contendo dados necessário para consulta de viabilidade e retorna:
              1 - Viabilidade OK
              2 - Atividade não permitida no local
              3 - Cadastro com restrição
              4 - Cadastro inválido

14/03/23 - API /viabilidadeMei (CRUD tabela TB_CADASTRO_MEI)
Opções: POST - /        - Registra um pacote json na tabela (atuamente não existe nenhum item obrigatório)
        GET - /         - Retorna lista com todos os cadastros de consulta MEI contidos na tabela
        GET - /(id)     - Retorna registro da tabela através do campo id
        DEL - /(id)     - Remove registro da tabela através do campo id
        PUT - /(id)     - Edita registro da tabela através do campo id
        Testes Gerais   - Evita cadastro duplicado testando se CPF já existe
                        - Evita que métodos GET, DEL e PUT sejam executados se registro não existir previamente

Observações: O arquivo racunhos/testesJsonMEI.txt possui 3 exemplos de cadastro utilizando a ferramenta Postman 

15/03 - API /viabilidadeMei (Envio de emails para os usuários - Tabela TB_EMAIL)
Opções: POST - /        - Registro um pacote json na tabela e realiza o envio do email contendo um objeto EmailDto

16/03 - API /viablidadeMei (Nova rota para a tabela TB_CADASTRO_MEI)
Opção: PUT - /retornoconsultapmb/(id) - atualiza registro com os dados de retorno da Consulta de Estabelecer

30/03 - Atualizações - Responsividade tela cadastro

31/03 - Atualizações - Estilização Tela de Validação, links Suporte e WhatsApp

12/04 - Implemtações tela Recaptcha e validações/estilizaçoes Forms

17/04 - Ajustes finais nas estilizações, testes de consistência, e máscaras

18/04 - Inserção de comentários gerais e novas validações e testes de consistencia

26/04 - Build Docker contendo o pacote jar da aplicação Spring Boot e acesso externo ao bd Postgres

12/05 - Build Docker contendo a build minificada da aplicação Angular - servidor web nginx

28/05 - Instancias cloud Google Cloud Run, Google Cloud SQL

30/05 - Instancias cloud Amazon ECS, e Amazon RDS

01/06 - Conclusão das implementações

Comandos para criação das imagens docker, execução de containers no Docker Desktop e repositório Docker Hub
  docker build -t nomeImagem:1.0 .
  docker run -p 8080:8080 nomeImagem:1.0
  docker tag nomeImagem:1.0 nomeUsuarioDockerHub/nomeImagem:1.0
  docker push nomeUsuarioDockerHub/nomeImagem:1.0

Comandos para envio de imagens para o repositório Amazon ECR
  aws configure (Key ID, Access ID, Region name, Output Format)
  aws ecr create-repository --repository-name nomeImagem --region nomeRegiao
  aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin url/nomeImagem
  docker tag nomeImagem:1.0 url/nomeImagem
  docker push url/nomeImagem

Comandos para enviar uma imagem do Docker Hub para o Google Cloud Registry        
  docker login
  docker pull nomeImagem:1.0
  docker tag nomeImagem:1.0 url/nomeImagem
  docker push nomeImagem:1.0 url/nomeImagem   

