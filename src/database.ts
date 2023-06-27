import { TProducts, TUsers } from "./types";

/*variavel para data e hora local. O data.valueOf() retorna milesimos de segundos. Será convertido o GMT da mesma maneira para data.getTimezoneOffset() * 60000. */
let data = new Date();
let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);

export const users: TUsers[] = [
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

export const products: TProducts[] = [
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
