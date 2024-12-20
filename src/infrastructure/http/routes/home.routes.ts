import { FastifyInstance } from "fastify";

export default async function homeRoutes(server: FastifyInstance) {
  // Rota principal para retornar uma página HTML estilizada
  server.get("/", async (request, reply) => {
    return reply.type("text/html").send(`
   <!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fastify REST API - Documentação</title>
    <style>
      /* Estilo global */
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #121212;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
        position: relative;
        padding: 20px;
      }

      .container {
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
      }

      h1 {
        color: #ff4d4d;
        margin-bottom: 20px;
      }

      button {
        background-color: #ff4d4d;
        color: white;
        padding: 10px 20px;
        font-size: 1em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 30px;
      }

      button:hover {
        background-color: #ff0000;
      }

      /* Estilo do Modal */
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        justify-content: center;
        align-items: center;
        padding: 20px;
      }

      .modal-content {
        background-color: #222;
        color: #fff;
        border-radius: 10px;
        padding: 20px;
        max-width: 100%;
        overflow-y: auto;
        max-height: 80vh; /* Para rolagem interna */
        width: 90%;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ff4d4d;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }

      .modal-header h2 {
        margin: 0;
        color: #ff4d4d;
      }

      .modal-header button {
        background-color: #ff4d4d;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1.2em;
        cursor: pointer;
      }

      .modal-header button:hover {
        background-color: #ff0000;
      }

      /* Tabelas */
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 30px;
      }

      th,
      td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ff4d4d;
      }

      th {
        background-color: #333;
        color: #fff;
      }

      tr:nth-child(even) {
        background-color: #222;
      }

      code {
        background-color: #333;
        padding: 3px 6px;
        border-radius: 5px;
        color: #fff;
      }

      /* Responsividade */
      @media (max-width: 768px) {
        .container {
          padding: 10px;
        }

        button {
          font-size: 1.2em;
        }

        .modal-content {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Fastify REST API - Documentação</h1>
      <p>
        Esta documentação descreve como interagir com a API disponível em
        <code>http://127.0.0.1:3000</code>.
      </p>

      <button id="openModalBtn">Ver Documentação da API</button>

      <!-- Modal -->
      <div id="apiModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Documentação da API</h2>
            <button id="closeModalBtn">X</button>
          </div>
          <p>
            Esta documentação descreve as rotas da API que está disponível em
            <code>http://127.0.0.1:3000</code>.
          </p>

          <h3>Rotas Disponíveis</h3>
          <table>
            <thead>
              <tr>
                <th>Rota</th>
                <th>Descrição</th>
                <th>Método HTTP</th>
                <th>Exemplo de Resposta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>/</code></td>
                <td>Retorna a página inicial com informações da API.</td>
                <td><code>GET</code></td>
                <td>
                  <pre>
{ "status": "success", "message": "API está funcionando!" }</pre
                  >
                </td>
              </tr>
              <tr>
                <td><code>/products</code></td>
                <td>Retorna todos os produtos disponíveis.</td>
                <td><code>GET</code></td>
                <td>
                  <pre>
[ { "id": "1", "name": "Produto 1", "price": 100.0 }, { "id": "2", "name": "Produto 2", "price": 200.0 } ]</pre
                  >
                </td>
              </tr>
              <tr>
                <td><code>/products/:id</code></td>
                <td>Retorna um produto específico pelo ID.</td>
                <td><code>GET</code></td>
                <td>
                  <pre>{ "id": "1", "name": "Produto 1", "price": 100.0 }</pre>
                </td>
              </tr>
              <tr>
                <td><code>/products</code></td>
                <td>Criar um novo produto.</td>
                <td><code>POST</code></td>
                <td>
                  <pre>
{ "status": "success", "message": "Produto criado com sucesso", "data": { "id": "3", "name": "Produto 3", "price": 150.0 } }</pre
                  >
                </td>
              </tr>
              <tr>
                <td><code>/products/:id</code></td>
                <td>Atualiza um produto existente pelo ID.</td>
                <td><code>PUT</code></td>
                <td>
                  <pre>
{ "status": "success", "message": "Produto atualizado com sucesso", "data": { "id": "1", "name": "Produto Atualizado", "price": 120.0 } }</pre
                  >
                </td>
              </tr>
              <tr>
                <td><code>/products/:id</code></td>
                <td>Deleta um produto pelo ID.</td>
                <td><code>DELETE</code></td>
                <td>
                  <pre>
{ "status": "success", "message": "Produto excluído com sucesso" }</pre
                  >
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Códigos de Erro</h3>
          <table>
            <thead>
              <tr>
                <th>Código de Erro</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>400</code></td>
                <td>
                  Requisição inválida. Acontece quando os parâmetros estão
                  ausentes ou incorretos.
                </td>
              </tr>
              <tr>
                <td><code>404</code></td>
                <td>
                  Recurso não encontrado. O produto solicitado não existe.
                </td>
              </tr>
              <tr>
                <td><code>500</code></td>
                <td>
                  Erro interno do servidor. Indica problemas no servidor da API.
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Formato de Resposta</h3>
          <p>A API retorna respostas no seguinte formato:</p>
          <pre>
{
    "status": "success",
    "message": "Descrição da ação",
    "data": { ... }
}
                </pre
          >
          <p>Ou, em caso de erro:</p>
          <pre>
{
    "status": "error",
    "message": "Descrição do erro",
    "details": "Detalhes adicionais sobre o erro"
}
                </pre
          >
        </div>
      </div>
    </div>

    <script>
      // Abertura e fechamento do Modal
      const openModalBtn = document.getElementById("openModalBtn");
      const closeModalBtn = document.getElementById("closeModalBtn");
      const apiModal = document.getElementById("apiModal");

      openModalBtn.onclick = () => {
        apiModal.style.display = "flex";
      };

      closeModalBtn.onclick = () => {
        apiModal.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target === apiModal) {
          apiModal.style.display = "none";
        }
      };
    </script>
  </body>
</html>

  `);
  });
}
