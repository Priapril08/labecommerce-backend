export type TUsers = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string /*no formato ano-mes-dia T hora:minuto:segundo:milésimo-de-segundos Z */;
};

export type TProducts = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

// new Date()
// new Date().toISOString()
