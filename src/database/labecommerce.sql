-- Active: 1689009286264@@127.0.0.1@3306

/*CRIAR tabela para USERS*/

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL, 
    created_at TEXT NOT NULL 
);

/* LEITURA DA TABELA ( O asterisco significa TUDO!!) */
SELECT * FROM users;


/*DELETAR A TABELA - aqui deleta a TABELA TODA */
DROP TABLE users;


/* Para VISUALIZAR a estrutura de uma tabela*/
PRAGMA table_info("users");


/*Para INSERIR ítens na tabela, com os VALUES em cada ítem (id,name,price...) na sequencia do CREATE TABLE*/
INSERT INTO users (id, name, email, password, created_at)
VALUES("u004", "Adriano", "adriano@email.com", "adri456789", strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
("u005", "Dennis", "dennis@email.com" , "dennis102030", strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime'))),
("u006" , "Maristela", "maristela@email.com", "mariste1000", strftime('%Y-%m-%d %H:%M:%S', datetime('now', 'localtime')));


/*Para EDITAR uma coluna de um ítem na tabela*/
UPDATE users
SET email = "adrianoM@email.com"
WHERE id = "u004";



/*Para DELETAR atraves do id todas as informaçoes desse id*/
DELETE FROM users 
WHERE id = "u006";



/*CRIAR TABELA DE PRODUTOS */

CREATE TABLE products ( 
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    description TEXT NOT NULL,    
    image_url TEXT NOT NULL
);

/* LEITURA DA TABELA ( O asterisco significa TUDO!!) */
SELECT * FROM products;


/*DELETAR A TABELA - aqui deleta a TABELA TODA */
DROP TABLE products;


/* Para VISUALIZAR a estrutura de uma tabela*/
PRAGMA table_info("products");


/*Para INSERIR ítens na tabela, com os VALUES em cada ítem (id,name,price...) na sequencia do CREATE TABLE*/
INSERT INTO products (id, name, price, description, image_url)
VALUES("prod004", "Mesa retangular de madeira, multiuso.", 2500, "Praticidade para homeOffice, gamers e para sala de jantar!", "https://picsum.photos/seed/picsum/200/300" ),
("prod005", "Cadeira Office/Gamer.", 1800 , " Conforto e qualidade para o seu dia-a-dia!", "https://picsum.photos/200/300/?blur" ),
( "prod006", "Suporte Ergonômico de mesa, articulado para monitor", 190 ,"ELG F80N, conforto e qualidade!", "https://picsum.photos/id/1/200/300"),
("prod007", "Suporte de cadeira para lombar(importado).", 180.99, "Almofadada, melhora a postura e alivia dores nas costas!", "https://picsum.photos/id/1/200/300" ),
("prod008", "Suporte Ergonômico para os pés!", 140, "Ajuda a manter a postura, e alivia dores nas pernas, e nas costas!", "https://picsum.photos/id/1/200/300" );


/*Para EDITAR uma coluna de um ítem na tabela*/
UPDATE products
SET price = 150
WHERE id = "prod006";



/*Para DELETAR atraves do id todas as informaçoes desse id*/
DELETE FROM products 
WHERE id = "prod009";








