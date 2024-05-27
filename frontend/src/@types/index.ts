// src/types.ts

export interface Address {
  id: number;
  street: string;
  number: string;
}

export interface InvoiceCost {
  id: string;
  kWh: number;
  unit_price: number;
  price: number;
  description: string;
}

export interface Invoice {
  id: string;
  customerName: string;
  customeNumber: string;
  referenceMonth: string;
  totalCost: number;
  expiredData: string;
  addressId: number;
  address: Address;
  invoiceCosts: InvoiceCost[];
  invoicePath: string;
  adminId: string;
}
