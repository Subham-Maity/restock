interface Address {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
}

interface User {
  email: string;
  password: string;
  addresses: Address[];
  id: number;
}

interface Item {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
  user: number;
  id: number;
}
