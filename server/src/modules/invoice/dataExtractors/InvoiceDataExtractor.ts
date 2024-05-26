import { InvoiceData } from "../../../@types";

interface IRegexExtractor<T> {
  extract(text: string): T;
}

export class InvoiceDataExtractor
  implements IRegexExtractor<Partial<InvoiceData>>
{
  extract(text: string): Partial<InvoiceData> {
    const lines: string[] = text.split("\n");
    const data: Partial<InvoiceData> = {};

    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];

      if (currentLine.includes("RUA")) {
        const addressMatch = currentLine.match(/(.+?)\s+(\d+)/);
        if (addressMatch && i > 0) {
          data.customerName = lines[i - 1].trim();
          data.address = {
            street: addressMatch[1].trim(),
            number: addressMatch[2].trim(),
          };
        }
      }

      if (currentLine.includes("Referente a")) {
        const referenceMonthMatch = lines[i + 1].match(/[A-Z]{3}\/\d{4}/);
        if (referenceMonthMatch) {
          data.referenceMonth = referenceMonthMatch[0];
        }
      }

      if (currentLine.includes("Valor a pagar (R$)")) {
        const totalCostMatch = lines[i + 1].match(
          /-?\d{1,3}(?:\.\d{3})*,\d{2}/
        );
        if (totalCostMatch) {
          data.totalCost = parseFloat(
            totalCostMatch[0].replace(/\./g, "").replace(",", ".")
          );
        }
      }

      if (currentLine.includes("Vencimento")) {
        const dueDateMatch = lines[i + 1].match(/\d{2}\/\d{2}\/\d{4}/);
        if (dueDateMatch) {
          data.expiredData = dueDateMatch[0];
        }
      }

      if (currentLine.includes("Nº DO CLIENTE")) {
        const customerNumberMatch = lines[i + 1].match(/\d+/);
        if (customerNumberMatch) {
          data.customeNumber = customerNumberMatch[0];
        }
      }
    }

    return data;
  }
}
