import { InvoiceDataExtractor } from "../InvoiceDataExtractor";

describe("InvoiceDataExtractor", () => {
  let extractor: InvoiceDataExtractor;

  beforeEach(() => {
    extractor = new InvoiceDataExtractor();
  });

  test("extracts invoice data correctly", () => {
    const text = `
      Customer Name
      RUA Street Name 123
      Referente a                                Vencimento                       Valor a pagar (R$) 
      Jan/2024                      24/05/2024                                  234,56
      Nº DO CLIENTE 
      123456
    `;

    const result = extractor.extract(text);

    expect(result.customerName).toEqual("Customer Name");
    expect(result.address).toEqual({
      street: "RUA Street Name",
      number: "123",
    });
    expect(result.totalCost).toEqual(234.56);
    expect(result.expiredData).toEqual("24/05/2024");
    expect(result.customeNumber).toEqual("123456");
  });
});
