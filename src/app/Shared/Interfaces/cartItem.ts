export interface CartItem {
  id: number;
  userId:number;
  grocery_name: string;
  price: number;
  shop:string;
  discPrice?:number;
  quantity: number;
  subtotal: number;
  imageUrl: string;
  quantityCount:number;
  category:string;
}