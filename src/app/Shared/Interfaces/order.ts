import { OrderProducts } from "./order-products";

export interface order {
  order_date: string;
  special_note: string;
  estimate_delivery_date: string;
  sub_total: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  payment_type: number;
  order_products: OrderProducts[];
}
