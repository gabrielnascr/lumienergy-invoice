import * as pdf from "pdf-parse";
import { InvoiceCost, InvoiceData } from "../@types";

export class PdfParserService {
  async extractInvoiceData(pdfBuffer: Buffer): Promise<InvoiceData> {
    try {
      const data = await pdf(pdfBuffer);
      const invoice: InvoiceData = this.extractInvoiceVales(data.text);
      const items = this.extractItensVales(data.text);
      const invoiceData: InvoiceData = { ...invoice, invoiceCosts: items };
      return invoiceData;
    } catch (error) {
      throw error;
    }
  }

  private extractItensVales(text: string): InvoiceCost[] {
    const lines = text.split("\n");
    const values: InvoiceCost[] = [];
    let isInValoresFaturadosSection: boolean = false;

    for (let i = 0; i < lines.length; i++) {
      const line: string = lines[i].trim();

      if (line.includes("Valores Faturados")) {
        isInValoresFaturadosSection = true;
      }

      if (isInValoresFaturadosSection) {
        if (line.startsWith("Energia Elétrica")) {
          const match = line.match(
            /([-]?\d+[\.,]?\d*)\s+([-]?\d+[\.,]?\d*)\s+([-]?\d+[\.,]?\d*)/
          );
          if (match) {
            values.push({
              description: "Energia Elétrica",
              kWh: parseFloat(match[1].replace(",", ".")),
              unit_price: parseFloat(match[2].replace(",", ".")),
              price: parseFloat(match[3].replace(",", ".")),
            });
          }
        } else if (line.startsWith("Energia SCEE")) {
          const match = line.match(
            /([-]?\d+[\.,]?\d*)\s+([-]?\d+[\.,]?\d*)\s+([-]?\d+[\.,]?\d*)/
          );
          if (match) {
            values.push({
              description: "Energia SCEE",
              kWh: parseFloat(match[1].replace(",", ".")),
              unit_price: parseFloat(match[2].replace(",", ".")),
              price: parseFloat(match[3].replace(",", ".")),
            });
          }
        } else if (line.startsWith("Energia compensada")) {
          const match = line.match(
            /([-]?\d+[\.,]?\d*)\s+([-]?\d+[\.,]?\d*)\s+([-]?\d+[\.,]?\d*)/
          );
          if (match) {
            values.push({
              description: "Energia compensada",
              kWh: parseFloat(match[1].replace(",", ".")),
              unit_price: parseFloat(match[2].replace(",", ".")),
              price: parseFloat(match[3].replace(",", ".")),
            });
          }
        } else if (line.startsWith("Contrib Ilum")) {
          const match = line.match(/([-]?\d+[\.,]?\d*)\s+([-]?\d+[\.,]?\d*)/);
          if (match) {
            values.push({
              description: "Contrib Ilum",
              kWh: 0,
              unit_price: 0,
              price: parseFloat(match[2].replace(",", ".")),
            });
          }
        } else if (line.startsWith("TOTAL")) {
          isInValoresFaturadosSection = false;
          break;
        }
      }
    }

    return values;
  }

  private extractInvoiceVales(text: string): InvoiceData {
    const lines: string[] = text.split("\n");
    const data: InvoiceData = {} as InvoiceData;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("RUA")) {
        const match = lines[i].match(/(.+?)\s+(\d+)/);

        if (match) {
          const customer_name = lines[i - 1];
          const street = match[1];
          const number = match[2];

          data.customerName = customer_name;
          data.address = {
            number: number,
            street: street,
          };
        }
      }

      if (lines[i].includes("Referente a")) {
        const regexItens = /[A-Z]{3}\/\d{4}/;
        const match = regexItens.exec(lines[i + 1]);
        if (match) {
          const referenceMonth = match[0];
          if (referenceMonth) {
            data.referenceMonth = referenceMonth;
          }
        }
      }
      if (lines[i].includes("Valor a pagar (R$)")) {
        const regexItens = /[-]?\d+,\d+/;
        const match = regexItens.exec(lines[i + 1]);

        if (match) {
          const totalCost = match[0];

          if (totalCost) {
            data.totalCost = parseFloat(totalCost.replace(",", "."));
          }
        }
      }
      if (lines[i].includes("Vencimento")) {
        const regexItens = /\d{2}\/\d{2}\/\d{4}/;

        const match = regexItens.exec(lines[i + 1]);

        if (match) {
          data.expiredData = match[0];
        }
      }
      if (lines[i].includes("Nº DO CLIENTE")) {
        const regexItens = /\d+/;

        const match = regexItens.exec(lines[i + 1]);

        if (match) {
          data.customeNumber = String(match[0]);
        }
      }
    }
    return data;
  }
}
