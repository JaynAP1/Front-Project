import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  { name: 'Enero', ventas: 4000 },
  { name: 'Febrero', ventas: 3000 },
  { name: 'Marzo', ventas: 2000 },
  { name: 'Abril', ventas: 2780 },
  { name: 'Mayo', ventas: 1890 },
  { name: 'Junio', ventas: 2390 },
  { name: 'Julio', ventas: 3490 },
];

const MiGrafico = () => (
  <LineChart
    width={600}
    height={300}
    data={data}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
    <XAxis dataKey="name" tick={{ fill: 'white', fontSize: 14 }} />
    <YAxis tick={{ fill: 'white', fontSize: 14 }} />
    <Tooltip />
    <Legend  />
    <Line type="monotone" dataKey="ventas" stroke="#d64218" activeDot={{ r: 8 }} />
  </LineChart>
);

export default MiGrafico;
