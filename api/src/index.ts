import express from "express";
import bodyParser from "body-parser";
import { Client } from "@opensearch-project/opensearch";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";
import { fromEnv } from "@aws-sdk/credential-providers";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
app.use(bodyParser.json());

const openSearchClient = new Client({
  ...AwsSigv4Signer({
    region: "sa-east-1",
    getCredentials: fromEnv(), // Obtém as credenciais do ambiente
  }),
  node: process.env.OPENSEARCH_NODE!,
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// Endpoint de pesquisa
app.get("/customers", async (req, res) => {
  try {
    const { q } = req.query;
    const { body } = await openSearchClient.search({
      index: "customers",
      body: {
        query: {
          match: { name: q },
        },
      },
    });
    res.send(body.hits.hits);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).send("An error occurred while searching.");
  }
});

app.get("/movies", async (req, res) => {
  try {
    const { q } = req.query;
    const { body } = await openSearchClient.search({
      index: "movies",
      body: {
        query: {
          match: { actor: q },
        },
      },
    });
    res.send(body.hits.hits);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).send("An error occurred while searching.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
