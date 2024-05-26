export type InvoiceData = {
  id?: number;
  customerName: string;
  customeNumber: string;
  referenceMonth: string;
  totalCost: number;
  expiredData: string;
  address: Address;
  invoiceCosts: InvoiceCost[];
};

export type Address = {
  street: string;
  number: string;
};

export type InvoiceCost = {
  kWh: number;
  unit_price: number;
  price: number;
  description: string;
};
