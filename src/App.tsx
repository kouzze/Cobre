import './App.css'
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


interface CopperData {
  date: string;
  value: number;
}

const CopperChart: React.FC = () => {

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const copperData: CopperData[] = [
    { date: "2023-01-07", value: 5.445 },
    { date: "2028-01-07", value: 6.931 },
    { date: "2033-01-01", value: 6.581 },   
  ];

  const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const filterData = () => {
    let filteredData: CopperData[] = copperData;

    if (startDate && endDate) {
      filteredData = filteredData.filter((data) => data.date >= startDate && data.date <= endDate);
    } else {
      filteredData = [];
    }

    return filteredData;
  };

  const data = filterData();
  const minDate = "2020-01-01";
  const maxDate = "2030-12-31";

  return (
    <div>
      <h1>Trabajo Ingeniería Ambiental</h1>
      <h2>Gráfico de Costo del Cobre</h2>
      <div>
        <label>Fecha de inicio:</label>
        <input type="date" value={startDate} onChange={handleChangeStartDate} min={minDate} max={maxDate} />
      </div>
      <div>
        <label>Fecha de término:</label>
        <input type="date" value={endDate} onChange={handleChangeEndDate} min={minDate} max={maxDate} />
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
      
    </div>


  );
  
};

export default CopperChart;