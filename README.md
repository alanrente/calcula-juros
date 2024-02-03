# colcula-juros

- Projeto realizado para atender uma planilha de calculo de juros

- ## Node 18.16

  - dotenv@16.4.1

- ## Execução local

  - ### Criar arquivo .env na raiz do projeto:
    ```
    PORT=3005
    ```
  - ### Executar o comando
    ```
    npm start
    ```

- ## Teste

  **OBS**: Essa aplicação só contem uma unica rota do tipo GET

  - ### Parametros de consulta:
    ```
    valor: number;
    taxa: number;
    qtdParcelas: number;
    retornos(opcional): valor,qtdParcelas,taxa,montante,taxaPercentual,valorParcelas
    ```
  - ### Testes
    - http://localhost:3005/?valor=200&taxa=4&qtdParcelas=7
      - STATUS 200:
      - BODY:
        ```JSON
        {
          "valorParcelas": "37.60"
        }
        ```
    - http://localhost:3005/?valor=200&taxa=4&qtdParcelas=7&retornos=montante,valorParcelas
      - STATUS 200:
      - BODY:
        ```JSON
        {
          "montante": "263.19",
          "valorParcelas": "37.60"
        }
        ```
    - http://localhost:3005/?valor=200&taxa=4
      - STATUS 400:
      - BODY:
        ```JSON
        {
          "message": "Os parametros: qtdParcelas devem ser numéricos!"
        }
        ```
    - http://localhost:3005/?valor=200&taxa=4&qtdParcelas=rrr
      - STATUS 400:
      - BODY:
        ```JSON
        {
          "message": "Os parametros: qtdParcelas devem ser numéricos!"
        }
        ```
    - http://localhost:3005/?valor=200&taxa=4&qtdParcelas=7&retornos=caixa,sapato
      - STATUS 400:
      - BODY:
        ```JSON
        {
          "message": "O parâmetro retornos só aceita os seguintes valores: valor, qtdParcelas, taxa, montante, taxaPercentual e valorParcelas."
        }
        ```
