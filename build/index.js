"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
(0, database_1.createUser)("u003", "Priscila", "priscila@email.com", "priscila123");
(0, database_1.createProduct)("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://picsum.photos/seed/Monitor/400");
console.table((0, database_1.searchProductsByName)("gamer"));
//# sourceMappingURL=index.js.map