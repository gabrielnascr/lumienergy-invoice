import React, { useEffect, useState } from "react";
import ChartComponent from "../../../components/Chat";
import api from "../../../services";

interface Data {
  consumptionElectricity: number;
  energyCompensated: number;
  valueTotalWithoutEconomy: number;
  economy: number;
}
export default function Index() {
  // const data = {
  //   consumptionElectricity: 2377,
  //   energyCompensated: 2077,
  //   valueTotalWithoutEconomy: 1464.02ß,
  //   economy: -1012.17,
  // };

  const [data, setData] = useState({} as Data);

  useEffect(() => {
    const getStatistics = async () => {
      const response = await api.get("/invoices/statistics");
      setData(response.data);
    };

    getStatistics();
  }, []);

  return (
    <div>
      <h2>Estatisticas de todas as faturas processadas</h2>
      <ChartComponent data={data} />
    </div>
  );
}
