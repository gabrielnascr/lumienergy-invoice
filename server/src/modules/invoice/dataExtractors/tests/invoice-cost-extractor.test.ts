import { InvoiceCostExtractor } from "../InvoiceCostExtractor";

const extractor = new InvoiceCostExtractor();

describe("InvoiceCostExtractor", () => {
  it("should extract invoice costs correctly", () => {
    const text = `
    Valores Faturados
    Energia Elétrica  100,00  0,50  50,00
    Energia SCEE  200,00  0,75  150,00
    Energia compensada  150,00  0,60  90,00
    Contrib Ilum  50,00
    TOTAL  290,00  220,00
  `;

    const expected = [
      { description: "Energia Elétrica", kWh: 100, unit_price: 0.5, price: 50 },
      { description: "Energia SCEE", kWh: 200, unit_price: 0.75, price: 150 },
      {
        description: "Energia compensada",
        kWh: 150,
        unit_price: 0.6,
        price: 90,
      },
      { description: "Contrib Ilum", kWh: 0, unit_price: 0, price: 50 },
    ];
    expect(extractor.extract(text)).toEqual(expected);
  });

  it("should return an empty array when there are no costs", () => {
    const text = `
      BATATA
      PAO E QUEIJO
    `;

    expect(extractor.extract(text)).toEqual([]);
  });
});
