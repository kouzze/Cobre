import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface CopperData {
  date: string;
  value: number;
}

const CobreComponent = () => {
  const [mineralAmount, setMineralAmount] = useState<number>(5.6);
  const [projectionData, setProjectionData] = useState<CopperData[]>([]);

  const calculateProjection = () => {
    const currentData: CopperData = { date: "Actual", value: mineralAmount };
    const projectedData: CopperData[] = [currentData];

    for (let i = 1; i <= 10; i++) {
      const currentDate = new Date();
      const projectedDate = new Date(currentDate.getFullYear() + i, currentDate.getMonth(), currentDate.getDate());
      const newDate = projectedDate.toISOString().split("T")[0];
      const projectedValue = (mineralAmount * (1 + 0.1607) ** i).toFixed(2);
      const projectedItem: CopperData = { date: newDate, value: Number(projectedValue) };
      projectedData.push(projectedItem);
    }

    setProjectionData(projectedData);
  };

  return (
    <div>
      <h1> Prototipo Ingeniería Ambiental</h1>
      <h2>Gráfico de Extracción de Cobre</h2>
      <div>
        <label>Cantidad de Mineral Extraído Actualmente (Toneladas):</label>
        <input
          type="number"
          value={mineralAmount}
          onChange={(event) => setMineralAmount(Number(event.target.value))}
        />
      </div>
      <button onClick={calculateProjection}>Calcular Proyección</button>
      <h1>Resultado de cálculos:</h1>
      {projectionData.length > 0 ? (
        <div>
          <h3>Extracción proyectada en 10 años:</h3>
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
        </div>
      ) : null}
    </div>
  );
};

export default CobreComponent;
