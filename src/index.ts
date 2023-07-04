import {
  searchProductsByName,
  createProduct,
  createUser,
  getAllProducts,
  getAllUsers,
  products,
  users,
} from "./database";

import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";

// console.log(users);
// console.log(products);

/* Exercicio 1 Typescript II  */

createUser("u003", "Priscila", "priscila@email.com", "priscila123");
// console.table(getAllUsers());

/* Exercicio 2 Typescript II  */

createProduct(
  "prod003",
  "SSD gamer",
  349.99,
  "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  "https://picsum.photos/seed/Monitor/400"
);

// console.table(getAllProducts());

/* Exercicio 3 Typescript II  */

console.table(searchProductsByName("gamer"));

/* Exercicio 1 apis express - PONGG testado no endpoint Postman */

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003!");
});

app.get("/ping", (_req: Request, res: Response) => {
  res.send("PONGG!");
});

/* Exercicio 2 apis express*/

/*http://localhost:3003/users*/

app.get("/users", (_req: Request, res: Response) => {
  res.status(200).send(users);
});

/*http://localhost:3003/products*/

app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
});

/*http://localhost:3003/products/search?name=mouse*/

app.get("/products/search", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(name)
  );
  res.status(200).send(result);
});

/* Exercicio 3 apis express*/

/*http://localhost:3003/users*/

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  const newUser: TUsers = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  res.status(201).send("Usuário cadastrado com sucesso!");
});

/*http://localhost:3003/products*/

app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const description = req.body.description as string;
  const imageUrl = req.body.imageUrl as string;

  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };
  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso!");
});
