interface Address {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
}

interface Product {
  colors: string[];
  sizes: string[];
  deleted: boolean;
  id: string;
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
}

interface Item {
  quantity: number;
  product: Product;
  user: string;
  id: string;
}

export interface Order {
  orderId: string;
  items: Item[];
  totalAmount: number;
  totalItems: number;
  user: string;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  selectedAddress: Address;
  createdAt: string;
  updatedAt: string;
  id: string;
}
