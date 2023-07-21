-- Active: 1689099912502@@127.0.0.1@3306

/*CRIAR tabela para USERS*/

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL, 
    created_at TEXT NOT NULL 
);


/*DELETAR A TABELA - aqui deleta a TABELA TODA */
DROP TABLE users;

/* Para VISUALIZAR a estrutura de uma tabela*/
PRAGMA table_info('users');

-- Incluindo os users u001, 002 e 003
INSERT INTO users (id, name, email, password, created_at)
VALUES ('u001', 'Roberto', 'roberto@email.com', 'beto123',strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
('u002', 'Lena', 'lena@email.com' , 'lena100', strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
('u003' , 'Priscila', 'priscila@email.com', 'priscila123', strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
('u004', 'Adriano', 'adriano@email.com', 'adri456789', strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
('u005', 'Dennis', 'dennis@email.com' , 'dennis102030', strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
('u006' , 'Maristela', 'maristela@email.com', 'mariste1000', strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
('u007', 'Bruno', 'bruno@email.com', 'brbr1010', strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime')));


INSERT INTO users (id, name, email, password, created_at)
VALUES 
('u008', 'Samuel', 'sam@email.com', 'sam108090', strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
('u009', 'Renata', 'renata@email.com', 'rere206070', strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime')));

/* (BUSCA POR TODOS OS USERS) LEITURA DA TABELA ( O asterisco significa TUDO!!) */
SELECT * FROM users;


/*Para EDITAR uma coluna de um ítem na tabela*/
UPDATE users
SET email = 'adriano@email.com'
WHERE id = 'u004';


/*Para DELETAR atraves do id todas as informaçoes desse id*/
DELETE FROM users 
WHERE id = 'u006';


/*CRIAR TABELA DE PRODUTOS */

CREATE TABLE products ( 
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    description TEXT NOT NULL,    
    image_url TEXT NOT NULL
);


/*DELETAR A TABELA - aqui deleta a TABELA TODA */
DROP TABLE products;


/* Para VISUALIZAR a estrutura de uma tabela*/
PRAGMA table_info('products');


-- Incluindo os produtos prod001, 002 e 003
INSERT INTO products (id, name, price, description, image_url)
VALUES('prod001', 'Mouse Gamer', 250, 'Melhor mouse do mercado!', 'https://picsum.photos/seed/Mouse%20gamer/400'),
('prod002', 'Monitor', 900 ,'Monitor LED Full HD 24 polegadas!', 'https://picsum.photos/seed/Monitor/400' ),
( 'prod003', 'SSD Gamer', 349.99 ,'Acelere seu sistema com velocidades incríveis de leitura e gravação!', 'https://picsum.photos/seed/Monitor/400');


/*Para INSERIR ítens na tabela, com os VALUES em cada ítem (id,name,price...) na sequencia do CREATE TABLE*/
INSERT INTO products (id, name, price, description, image_url)
VALUES('prod004','Mesa retangular de madeira, multiuso', 2500, 'Praticidade para homeOffice, gamers e para sala de jantar!', 'https://picsum.photos/seed/picsum/200/300' ),
('prod005', 'Cadeira Office/Gamer', 1800 , 'Conforto e qualidade para o seu dia-a-dia!', 'https://picsum.photos/200/300/?blur' ),
( 'prod006', 'Suporte Ergonômico de mesa, articulado para monitor', 190 ,'ELG F80N, conforto e qualidade!', 'https://picsum.photos/id/1/200/300'),
('prod007', 'Suporte de cadeira para lombar(importado)', 180.99, 'Almofadada, melhora a postura e alivia dores nas costas!', 'https://picsum.photos/id/1/200/300' ),
('prod008', 'Suporte Ergonômico para os pés', 140, 'Ajuda a manter a postura, e alivia dores nas pernas, e nas costas!', 'https://picsum.photos/id/1/200/300' );


-- GET ALL products
SELECT * FROM products;


-- GET ALL PRODUCTS ( FUNCIONALIDADE 2)
SELECT * FROM products
WHERE name LIKE '%gamer%';


/*Para EDITAR uma coluna de um ítem na tabela*/
UPDATE products
SET price = 150
WHERE id = 'prod006';

/*Para DELETAR atraves do id todas as informaçoes desse id*/
DELETE FROM products 
WHERE id = 'prod009';


-- Para EDITAR produto pelo id 
-- Faça query EDITAR TODAS AS colunas do ítem
UPDATE products
SET name = 'Suporte Ergonômico para descanso dos pés',
    price = 250,
    description = 'Ótimo para manter postura, e traz alivio para as pernas e costas!',
    image_url = 'https://picsum.photos/id/1/200/800'
WHERE id = 'prod008';


-- RELACOES SQL - I EXERCICIO 1 - criar a tabela de pedidos purchases id, buyer, total_price, created_at, a chave estrangeira (FK) será a coluna buyer e irá referenciar a coluna id da tabela users

CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  buyer TEXT NOT NULL,
  total_price REAL NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (buyer) REFERENCES users(id) 
  ON UPDATE CASCADE
  ON DELETE CASCADE  
);

PRAGMA table_info ('purchases');


/*DELETAR A TABELA - aqui deleta a TABELA TODA */
DROP TABLE purchases ;


-- RELACOES SQL - I EXERCICIO 2 - popular a tabela purchases(pedidos)
INSERT INTO purchases (id, buyer, total_price, created_at)
VALUES ('purc001', 'u001', 2000, datetime('now', 'localtime')),
('purc002', 'u002', 1500, datetime('now', 'localtime')),
('purc003', 'u003', 600, datetime('now', 'localtime')),
('purc004', 'u004', 500, datetime('now', 'localtime')),
('purc005', 'u005', 2000, datetime('now', 'localtime')),
('purc006', 'u006', 350, datetime('now', 'localtime')),
('purc007', 'u007', 1200,  datetime('now', 'localtime')),
('purc008', 'u008', 300,  datetime('now', 'localtime')),
('purc009', 'u009', 450,  datetime('now', 'localtime'));


-- GET ALL purchases
SELECT * FROM purchases;

-- RELACOES SQL - I EXERCICIO 2 - simule que o valor do pedido foi alterado para mais ou menos (o id é do purchase)
UPDATE purchases
SET total_price = 500
    
WHERE id = 'purc008';


-- RELACOES SQL - I EXERCICIO 3 pesquisar todas as tabelas (unificadas), depois usar a sequencia da consulta + apelidar o nome

SELECT * FROM users
INNER JOIN purchases
ON purchases.buyer = users.id;

SELECT
  purchases.id AS purchaseId,
  users.id AS userId,  
  users.name,
  users.email,
  purchases.total_price AS totalPrice,
  purchases.created_at AS createdAt
FROM users
INNER JOIN purchases
ON users.id = purchases.buyer;


-- EXERCICIO 1 SQL -II - criar TABELA DE RELAÇÕES / A Lógica é: Cada compra é registrada uma única vez na tabela purchases e Cada produto da mesma compra é registrado uma única vez na tabela purchases_products.

CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);

/*DELETAR A TABELA - aqui deleta a TABELA TODA */
DROP TABLE purchases_products;

-- EXERCICIO 1 SQL -II - realizar compras. 
-- Inserir dados e popular tabela purchases_products simulando 3 compras de clientes

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
('purc001','prod002',3),
('purc003','prod004',1),
('purc006','prod005',2);


-- GET ALL purchases_products
SELECT * FROM purchases_products;


-- EXERCICIO 2 - SQL II - Consulta com junção INNER JOIN - mostrar uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchase_id

INNER JOIN products
ON products.id = purchases_products.product_id
WHERE purchases.id = purchases_products.purchase_id; 

SELECT 
purchases.id AS idCompra, 
users.id AS idComprador,
users.name,
users.email, 
purchases.total_price,
purchases.created_at
FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;

SELECT
products.id AS productsId,
purchases.id AS purchasesId,
products.name AS productsName,
quantity,
purchases.total_price AS TotalPrice,
users.name AS userName

FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id

INNER JOIN products
ON purchases_products.product_id = products.id

INNER JOIN users
ON purchases.buyer = users.id;



