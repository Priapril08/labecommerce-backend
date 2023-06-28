import {
  searchProductsByName,
  createProduct,
  createUser,
  getAllProducts,
  getAllUsers,
  products,
  users,
} from "./database";

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
