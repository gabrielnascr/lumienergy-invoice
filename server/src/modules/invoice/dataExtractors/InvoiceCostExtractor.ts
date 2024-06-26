import { InvoiceCost } from "../../../@types";
import { IRegexExtractor } from "./IRegexExtractor";

export class InvoiceCostExtractor implements IRegexExtractor<InvoiceCost[]> {
  extract(text: string): InvoiceCost[] {
    const lines = text.split("\n");
    const values: InvoiceCost[] = [];
    let isInValoresFaturadosSection = false;

    const tripleNumberRegex =
      /(-?\d+[.,]?\d*)\s+(-?\d+[.,]?\d*)\s+(-?\d+[.,]?\d*)/;

    const costMatchers = [
      {
        description: "Energia Elétrica",
        regex: tripleNumberRegex,
      },
      {
        description: "Energia SCEE",
        regex: tripleNumberRegex,
      },
      {
        description: "Energia compensada",
        regex: tripleNumberRegex,
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
              if (matcher.description === "Contrib Ilum") {
                values.push({
                  description: matcher.description,
                  kWh: 0,
                  unit_price: 0,
                  price: parseFloat(match[0]?.replace(",", ".")),
                });
              } else {
                values.push({
                  description: matcher.description,
                  kWh: parseFloat(match[1]?.replace(".", "")) || 0,
                  unit_price: parseFloat(match[2]?.replace(",", ".")) || 0,
                  price: parseFloat(match[3]?.replace(",", ".")) || 0,
                });
              }
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
