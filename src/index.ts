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
import { db } from "./database/knex";

/* Exercicio 1 Typescript II  */

createUser("u003", "Priscila", "priscila@email.com", "priscila123");

/* Exercicio 2 Typescript II  */

createProduct(
  "prod003",
  "SSD gamer",
  349.99,
  "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  "https://picsum.photos/seed/Monitor/400"
);

/* Exercicio 3 Typescript II  */

console.table(searchProductsByName("gamer"));

/* Exercicio 1 apis express - PONGG testado no endpoint Postman */

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "PONNGG!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!!");
    }
  }
});

app.get("/users", async (_req: Request, res: Response) => {
  try {
    const result = await db("users");

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error);
  }
});

app.get("/products", async (_req: Request, res: Response) => {
  try {
    const result = await db("products");
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    if (!name || name.length === 0) {
      throw new Error("'Name' deve conter pelo menos um caractere!");
    }

    const result = await db("products")
      .select("*")
      .where("name", "like", `%${name}%`);

    if (result.length === 0) {
      res.status(400).send("Não há nenhum produto com esse caractere!");
    } else {
      res.status(200).send(result);
    }
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    const [checkRegisteredId] = await db("users").select("*").where("id", id);

    const [checkRegisteredEmail] = await db("users")
      .select("*")
      .where("email", email);

    if (checkRegisteredId) {
      res.statusCode = 400;
      throw new Error("'Id' já cadastrado!");
    }

    if (checkRegisteredEmail) {
      res.statusCode = 400;
      throw new Error("'Email' já cadastrado!");
    }

    const newUser = {
      id,
      name,
      email,
      password,
      created_at: new Date().toLocaleString("pt-br"),
    };

    await db.insert(newUser).into("users");

    const result = await db("users").select("*").where("id", id);

    if (!result) {
      res.status(500);
      throw new Error("Erro ao criar um usuário, tente novamente!");
    }
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

app.post("/products", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.image_url as string;

    const [checkRegisteredIProduct] = await db
      .select("*")
      .from("products")
      .where({ id });

    if (checkRegisteredIProduct) {
      res.statusCode = 400;
      throw new Error("'Id' já cadastrado em outro produto!");
    }

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };
    products.push(newProduct);

    await db
      .insert({
        id,
        name,
        price,
        description,
        image_url: imageUrl,
      })
      .into("products");

    const result = await db.select("*").from("products").where({ id });

    if (!result) {
      res.status(500);
      throw new Error("Erro ao cadastrar produto, tente novamente!");
    }
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

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const userIdToDelete = req.params.id;

    const [userIndex] = await db
      .select("*")
      .from("users")
      .where({ id: userIdToDelete });
    if (!userIndex) {
      res.status(404);
      throw new Error("'Id' não encontrado!");
    }

    await db.delete().from("users").where({ id: userIdToDelete });

    res
      .status(200)
      .send({ message: "User deletado com sucesso!!", userIdToDelete });
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const productIdDelete = req.params.id;

    const [productIndex] = await db
      .select("*")
      .from("products")
      .where({ id: productIdDelete });

    if (!productIndex) {
      res.status(404);
      throw new Error("'Id' não encontrado!");
    }

    await db.delete().from("products").where({ id: productIdDelete });

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

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToFindProduct = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const [product] = await db
      .select("*")
      .from("products")
      .where({ id: idToFindProduct });

    if (product) {
      await db
        .update({
          id: newId || product.id,
          name: newName || product.name,
          price: newPrice || product.price,
          description: newDescription || product.description,
          image_url: newImageUrl || product.imageUrl,
        })
        .from("products")
        .where({ id: idToFindProduct });
    } else {
      res.status(404);
      throw new Error("'Id' não encontrado!");
    }
    res
      .status(200)
      .send({ message: "Produto atualizado com sucesso!", idToFindProduct });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const buyer = req.body.buyer;
    const products = req.body.products;
    const createdAt = req.body.created_at;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'Id' precisa ser uma string!");
    }
    if (typeof buyer !== "string") {
      res.status(400);
      throw new Error("'Buyer' precisa ser uma string!");
    }

    const [purchase] = await db.select("*").from("purchases").where({ id });

    if (purchase) {
      res.status(400);
      throw new Error("Purchase já existe!");
    }

    const resultProducts = [];
    let totalPrice = 0;
    for (let prod of products) {
      const [product] = await db("products").where({ id: prod.id });
      if (!product) {
        res.status(400);
        throw new Error(`Id ${prod.id} não foi encontrado!`);
      }
      resultProducts.push({ ...product, quantity: prod.quantity });
    }
    for (let product of resultProducts) {
      totalPrice += product.price * product.quantity;
    }

    const newPurchase = {
      id,
      buyer,
      total_price: totalPrice,
      created_at: new Date().toLocaleString("pt-br"),
    };

    await db("purchases").insert(newPurchase);

    for (let product of products) {
      const newPurchaseProducts = {
        purchase_id: id,
        product_id: product.id,
        quantity: product.quantity,
      };
      await db("purchases_products").insert(newPurchaseProducts);
    }
    res.status(201).send("Pedido realizado com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) res.status(500);
    res.send(error.message);
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const [result] = await db("purchases")
      .select(
        "purchases.id as purchaseId",
        "users.id as buyerId",
        "users.name as buyerName",
        "users.email as buyerEmail",
        "purchases.total_price as totalPrice",
        "purchases.created_at as createdAt"
      )
      .where("purchases.id", "=", purchaseId)
      .innerJoin("users", "purchases.buyer", "=", "users.id");
    console.log(result);

    if (!result) {
      res
        .status(404)
        .send({ error: `Compra com o Id: ${purchaseId} não encontrada!` });
    }

    const products = await db("products")
      .select(
        "products.id as id",
        "products.name as name",
        "products.price as price",
        "products.description as description",
        "products.image_url as imageUrl",
        "purchases_products.quantity as quantity"
      )
      .innerJoin(
        "purchases_products",
        "purchases_products.product_id",
        "=",
        "products.id"
      )
      .where("purchases_products.purchase_id", "=", purchaseId);

    const resultFinal = { ...result, products };
    res.status(200).send(resultFinal);
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: "Erro ao processar a consulta!" });
  }
});
