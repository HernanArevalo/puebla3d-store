
export interface OrderItem {
  title:    string;
  slug:    string;
  quantity: number;
  price:    number;
  size:     string;
  color:    string;
  image:    string;
}

export interface OrderAddress {
  id:         String;
  firstName:  String;
  lastName:   String;
  address:    String;
  address2?:   String | null;
  postalCode: String;
  city:       String;
  phone:      String;

  //* relations
  countryId:  String;
  provinceId: String;

  orderId: String;
}

export interface Order{
    id: string
    total: number
    items: number
    isPaid:boolean
    status: string
  
    shippingMethod?: string | null
    shippingAmount: number
  
    paidAt?: Date | null
    paymentMethod: string | null
    transactionImage?: string | null
    transactionId?: string | null
  
    createdAt: Date
    updatedAt: Date
  
    userId: string

    OrderItems?:   OrderItem[];
    OrderAddress?: OrderAddress | null;
  
    discountCodeId?: string | null;
}
