export interface Product {
  id: string;
  name: string;
  description: string;

  price: number;
  sale_price?: number | null;
  currency?: string;

  image_url: string;
  image_url_2?: string | null;
  image_url_3?: string | null;

  category: string;
  stock: number;
  is_featured: boolean;

  features?: string[] | null;
  sizes?: string[] | null;

  weight?: string | null;
  material?: string | null;

  sku?: string | null;
  tags?: string[] | null;

  created_at: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
  shipping_address: string;
  payment_intent_id: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  size?: string | null;
  product?: Product;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  role?: string;
}
