import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface CopperData {
  date: string;
  value: number;
}

const CobreComponent = () => {
  const [copperAmount, setCopperAmount] = useState<number>(0);
  const [projectionData, setProjectionData] = useState<CopperData[]>([]);

  const handleChangeCopperAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(event.target.value);
    setCopperAmount(amount);
  };

  const calculateProjection = () => {
    const currentData: CopperData = { date: "Actual", value: copperAmount };
    const projectedData: CopperData[] = [currentData];

    for (let i = 1; i <= 10; i++) {
      const currentDate = new Date();
      const projectedDate = new Date(currentDate.getFullYear() + i, currentDate.getMonth(), currentDate.getDate());
      const newDate = projectedDate.toISOString().split("T")[0];
      const projectedValue = (copperAmount * 2.7 * i).toFixed(2); // Nueva fórmula de proyección con el precio esperado del cobre
      const projectedItem: CopperData = { date: newDate, value: Number(projectedValue) };
      projectedData.push(projectedItem);
    }

    setProjectionData(projectedData);
  };

  return (
    <div>
      <h2>Gráfico de Costo del Cobre</h2>
      <div>
        <label>Cantidad de Material Disponible:</label>
        <input type="number" value={copperAmount} onChange={handleChangeCopperAmount} />
      </div>
      <button onClick={calculateProjection}>Calcular Proyección</button>
      <h1>Resultado de cálculos:</h1>
      {projectionData.length > 0 ? (
        <div>
          <h3>Sulfuro: {(copperAmount * 0.01 * 0.85).toFixed(0)} kg</h3>
          <div style={{ width: "100%", height: 300 }}>
            <LineChart width={500} height={300} data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
          <h3>Costo cada 5 años:</h3>
          <ul>
            {projectionData.filter((data, index) => index % 5 === 0).map((data, index) => (
              <li key={index}>
                Año {new Date().getFullYear() + index * 5}: {data.value.toFixed(0)} USD
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CobreComponent;