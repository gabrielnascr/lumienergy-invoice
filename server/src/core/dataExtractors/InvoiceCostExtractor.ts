import { InvoiceCost } from "src/@types";
import { IRegexExtractor } from "./IRegexExtractor";

export class InvoiceCostExtractor implements IRegexExtractor<InvoiceCost[]> {
  extract(text: string): InvoiceCost[] {
    const lines = text.split("\n");
    const values: InvoiceCost[] = [];
    let isInValoresFaturadosSection = false;

    const costMatchers = [
      {
        description: "Energia Elétrica",
        regex: /(-?\d+[.,]?\d*)\s+(-?\d+[.,]?\d*)\s+(-?\d+[.,]?\d*)/,
      },
      {
        description: "Energia SCEE",
        regex: /(-?\d+[.,]?\d*)\s+(-?\d+[.,]?\d*)\s+(-?\d+[.,]?\d*)/,
      },
      {
        description: "Energia compensada",
        regex: /(-?\d+[.,]?\d*)\s+(-?\d+[.,]?\d*)\s+(-?\d+[.,]?\d*)/,
      },
      { description: "Contrib Ilum", regex: /(-?\d+,\d+)/ },
    ];

    for (let line of lines) {
      line = line.trim();

      if (line.includes("Valores Faturados")) {
        isInValoresFaturadosSection = true;
      }

      if (isInValoresFaturadosSection) {
        for (const matcher of costMatchers) {
          if (line.startsWith(matcher.description)) {
            const match = line.match(matcher.regex);
            if (match) {
              values.push({
                description: matcher.description,
                kWh: parseFloat(match[1]?.replace(",", ".")) || 0,
                unit_price: parseFloat(match[2]?.replace(",", ".")) || 0,
                price: parseFloat(match[3]?.replace(",", ".")) || 0,
              });
            }
            break;
          }
        }

        if (line.startsWith("TOTAL")) {
          isInValoresFaturadosSection = false;
        }
      }
    }

    return values;
  }
}
