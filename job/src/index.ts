import mysql from "mysql2/promise";
import { Client } from "@opensearch-project/opensearch";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";
import { fromEnv } from "@aws-sdk/credential-providers";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const main = async () => {
  const mysqlConnection = await mysql.createConnection({
    // host: "localhost",
    // port: 3307,
    host: "mysql",
    user: "root",
    password: "rootpassword",
    database: "mydatabase",
  });

  const openSearchClient = new Client({
    ...AwsSigv4Signer({
      region: "sa-east-1",
      getCredentials: fromEnv(), // Obtém as credenciais do ambiente
    }),
    node: process.env.OPENSEARCH_NODE!,
  });

  // Sincronizar dados do MySQL com o OpenSearch
  const syncData = async () => {
    try {
      const [results] = await mysqlConnection.query("SELECT * FROM customer");
      for (const customer of results as any[]) {
        await openSearchClient.index({
          index: "customers",
          id: customer.id.toString(),
          body: customer,
        });
      }
      console.log("Dados sincronizados com sucesso!");
    } catch (err) {
      console.error("Erro ao sincronizar dados:", err);
    }
  };

  syncData();
  setInterval(syncData, 5 * 60 * 1000); // Executar a cada 5 minuto
};

main().catch((err) => console.error("Erro ao iniciar a aplicação:", err));
