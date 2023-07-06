import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface CopperData {
  date: string;
  value: number;
}
const CopperComponent = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [copperAmount, setCopperAmount] = useState<number>(0);

  const copperData: CopperData[] = [
    { date: "2023-01-01", value: 3.2 },
    { date: "2023-02-01", value: 3.4 },
    { date: "2023-03-01", value: 3.6 },
    { date: "2023-04-01", value: 3.8 },
    { date: "2023-05-01", value: 3.9 },
    { date: "2023-06-01", value: 3.0 },
    { date: "2023-07-01", value: 2.0 },
    { date: "2023-08-01", value: 5.0 },
    { date: "2023-09-01", value: 5.1 },
    { date: "2023-10-01", value: 5.2 },
    { date: "2023-11-01", value: 5.3 },
    { date: "2023-12-01", value: 5.4 },
  ];

  const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleChangeCopperAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(event.target.value);
    setCopperAmount(amount);
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

  const calculateProjection = () => {
    const projectionData: CopperData[] = [];
    const lastData = copperData[copperData.length - 1];

    for (let i = 1; i <= 10; i++) {
      const newDate = addYears(lastData.date, i);
      const projectedValue = (lastData.value * copperAmount).toFixed(2);
      projectionData.push({ date: newDate, value: Number(projectedValue) });
    }

    return projectionData;
  };

  const addYears = (dateString: string, years: number) => {
    const date = new Date(dateString);
    date.setFullYear(date.getFullYear() + years);
    const newDate = date.toISOString().split("T")[0];
    return newDate;
  };

  const data = filterData();
  const projectionData = calculateProjection();
  const minDate = "2020-01-01";
  const maxDate = "2030-12-31";
  return (
    <div>
      <h2>Gráfico de Costo del Cobre</h2>
      <div>
        <label>Fecha de inicio:</label>
        <input type="date" value={startDate} onChange={handleChangeStartDate} min={minDate} max={maxDate} />
      </div>
      <div>
        <label>Fecha de término:</label>
        <input type="date" value={endDate} onChange={handleChangeEndDate} min={minDate} max={maxDate} />
      </div>
      <div>
        <label>Cantidad de cobre (toneladas):</label>
        <input type="number" value={copperAmount} onChange={handleChangeCopperAmount} />
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <LineChart width={500} height={300} data={[...data, ...projectionData]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  )
}

export default CopperComponent