import React from "react";
import ChartComponent from "../../../components/ChatComponent";

export default function index() {
  const data = {
    consumptionElectricity: 2377,
    energyCompensated: 2077,
    valueTotalWithoutEconomy: 1464.02,
    economy: -1012.17,
  };

  return (
    <div>
      <h2>Estatisticas de todas as faturas processadas</h2>
      <ChartComponent data={data} />
    </div>
  );
}
