import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          stock: number;
          created_at: string;
          is_featured: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          stock: number;
          created_at?: string;
          is_featured?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          image_url?: string;
          category?: string;
          stock?: number;
          created_at?: string;
          is_featured?: boolean;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          total: number;
          status: string;
          created_at: string;
          shipping_address: string;
          payment_intent_id: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total: number;
          status?: string;
          created_at?: string;
          shipping_address: string;
          payment_intent_id?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total?: number;
          status?: string;
          created_at?: string;
          shipping_address?: string;
          payment_intent_id?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
        };
      };
    };
  };
};
