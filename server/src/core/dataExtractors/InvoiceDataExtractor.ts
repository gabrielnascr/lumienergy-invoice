import * as pdf from "pdf-parse";
import { InvoiceCost, InvoiceData } from "../../@types";

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
      if (lines[i].includes("RUA")) {
        const match = lines[i].match(/(.+?)\s+(\d+)/);
        if (match) {
          data.customerName = lines[i - 1];
          data.address = { number: match[2], street: match[1] };
        }
      }

      if (lines[i].includes("Referente a")) {
        const match = lines[i + 1].match(/[A-Z]{3}\/\d{4}/);
        if (match) {
          data.referenceMonth = match[0];
        }
      }

      if (lines[i].includes("Valor a pagar (R$)")) {
        const match = lines[i + 1].match(/-?\d+,\d+/);
        if (match) {
          data.totalCost = parseFloat(match[0].replace(",", "."));
        }
      }

      if (lines[i].includes("Vencimento")) {
        const match = lines[i + 1].match(/\d{2}\/\d{2}\/\d{4}/);
        if (match) {
          data.expiredData = match[0];
        }
      }

      if (lines[i].includes("Nº DO CLIENTE")) {
        const match = lines[i + 1].match(/\d+/);
        if (match) {
          data.customeNumber = match[0];
        }
      }
    }
    return data;
  }
}
