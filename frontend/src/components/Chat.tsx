import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ChartData {
  consumptionElectricity: number;
  energyCompensated: number;
  valueTotalWithoutEconomy: number;
  economy: number;
}

interface Props {
  data: ChartData;
}

const ChartComponent: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx!, {
        type: "bar",
        data: {
          labels: [
            "Consumo de Energia Elétrica KWh",
            "Energia Compensada kWh",
            "Valor Total R$",
            "Economia",
          ],
          datasets: [
            {
              label: "Dados da Fatura de Energia Elétrica",
              data: [
                data.consumptionElectricity,
                data.energyCompensated,
                data.valueTotalWithoutEconomy,
                data.economy,
              ],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      // Limpeza quando o componente é desmontado
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
