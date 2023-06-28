"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
let data = new Date();
let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
exports.users = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: data2.toISOString(),
    },
    {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: data2.toISOString(),
    },
];
exports.products = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    },
];
function createUser(id, name, email, password) {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: data2.toISOString(),
    };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso!!!!", newUser);
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    };
    exports.products.push(newProduct);
    console.log("Produto cadastrado com sucesso!!!!", newProduct);
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
const searchProductsByName = (name) => {
    const result = exports.products.filter((product) => {
        console.log("Produto pesquisado!");
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
    return result;
};
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map