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
/* Fluxo dados backEnd 1 - refatorar GET ALL USERS com trycatch*/

app.get("/users", (_req: Request, res: Response) => {
  try {
    const result = {
      message: "Lista de usuários cadastrados:",
      registered: users,
    };

    res.status(200).send(result);
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error);
  }
});

/* Fluxo dados backEnd 1 - refatorar GET ALL PRODUCTS trycatch - query params for recebido, deve possuir pelo menos um caractere, e foi incluído uma msg caso não exista nenhum produto com o caractere informado!*/

app.get("/products", (_req: Request, res: Response) => {
  try {
    const result = {
      message: "Lista de produtos cadastrados:",
      registered: products,
    };
    res.status(200).send(result);
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.get("/products/search", (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    if (name && name.length > 0) {
      const result = products.filter((product) =>
        product.name.toLowerCase().includes(name)
      );
      if (result.length === 0) {
        res.status(400).send("Não há nenhum produto com esse caractere!");
      } else {
        res.status(200).send(result);
      }
    } else {
      throw new Error("'Name' deve conter pelo menos um caractere!");
    }
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

/* Exercicio 3 apis express*/
/*Fluxo dados backEnd 1 - No CREATE USER, não deve ser possível criar mais de uma conta com o mesmo ID e nem mesmo EMAIL*/
app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    /* Ver se ja um ID / email existe para poder bloquear um cadastro repetido*/

    const checkRegisteredId = users.find((user) => user.id === id);
    if (checkRegisteredId) {
      res.status(400).send("'ID'já cadastrado!");
    }
    const checkRegisteredEmail = users.find((user) => user.email === email);
    if (checkRegisteredEmail) {
      res.status(400).send("'Email'já cadastrado!");
    }

    const newUser: TUsers = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);

    res
      .status(201)
      .send({ message: "Usuário cadastrado com sucesso!", newUser });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

/*Fluxo dados backEnd 1 - No CREATE PRODUCTS, não deve ser possível criar mais de um produto com a mesma ID*/
app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

    const checkRegisteredIProduct = products.find(
      (product) => product.id === id
    );
    if (checkRegisteredIProduct) {
      res.status(400).send("'ID'já cadastrado em outro produto!");
    }

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };
    products.push(newProduct);
    res
      .status(201)
      .send({ message: "Produto cadastrado com sucesso!", newProduct });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

/* Exercicio 1 aprofundamento express - Delete User by id*/
/*Fluxo dados backEnd 2 - No DELETE USER by ID, validar que o usuário existe antes de deletá-la*/

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const userIdToDelete = req.params.id;

    const userIndex = users.findIndex((user) => user.id === userIdToDelete);
    if (userIndex < 0) {
      res.status(404).send("Usuário não encontrado!");
    }

    if (userIndex >= 0) {
      users.splice(userIndex, 1);
    }
    res
      .status(200)
      .send({ message: "User deletado com sucesso!!", userIdToDelete });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

/* Exercicio 2 aprofundamento express - Delete Product by id*/
/*Fluxo dados backEnd 2 - No DELETE PRODUCT by ID, validar que o producto existe antes de deletá-lo*/

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const productIdDelete = req.params.id;

    const productIndex = products.findIndex(
      (product) => product.id === productIdDelete
    );
    if (productIndex < 0) {
      res.status(404).send("Produto não encontrado!");
    }
    if (productIndex >= 0) {
      products.splice(productIndex, 1);
    }
    res
      .status(200)
      .send({ message: "Produto deletado com sucesso!!", productIdDelete });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

/* Exercicio 3 aprofundamento express - PUT/Edit Product by id*/
/*Fluxo dados backEnd 2 - No EDIT PRODUCT by ID, validar produto existe antes de editá-lo E validar dados opcionais do body se eles forem recebidos*/

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const idToFindProduct = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const productIndex = products.findIndex(
      (product) => product.id === idToFindProduct
    );
    if (productIndex < 0) {
      res.status(404).send("Produto não encontrado!!");
    }
    const product = products.find((product) => product.id === idToFindProduct);

    if (product) {
      product.id = newId || product.id;
      product.name = newName || product.name;
      if (newPrice !== undefined) {
        product.price = newPrice;
      }
      product.description = newDescription || product.description;
      product.imageUrl = newImageUrl || product.imageUrl;
    }
    res
      .status(200)
      .send({ message: "Produto atualizado com sucesso", idToFindProduct });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});
