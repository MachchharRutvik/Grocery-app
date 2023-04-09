export interface Address {
    id: number;
    customer_id: number;
    address_line_1: string;
    address_line_2: string;
    area: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    landmark: string;
    tag: string;
    is_default: boolean;
    deleted_at: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  