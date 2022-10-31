import React from "react";

import {
  PieChart,
  Pie,
  Sector,
  LabelList,
  Label,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function ChartPieChart() {
  const data = [
    { name: "Electrónica", value: 400 },
    { name: "Muebles", value: 300 },
    { name: "Ropa", value: 300 },
    { name: "Comida", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const Bullet = ({ backgroundColor, size }) => {
    return (
      <div
        className="CirecleBullet"
        style={{
          backgroundColor,
          width: size,
          height: size,
        }}
      ></div>
    );
  };

  const CustomLabel = ({ viewBox, labelText, value }) => {
    const { cx, cy } = viewBox;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fontSize="15"
        >
          {labelText}
        </text>
        <text
          x={cx}
          y={cy + 20}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#0088FE"
          fontSize="26"
          fontWeight="600"
        >
          {value}
        </text>
      </g>
    );
  };

  const CustomizedLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="LegendList">
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <div className="BulletLabel">
              <Bullet backgroundColor={entry.payload.fill} size="10px" />
              <div className="BulletLabelText">{entry.value}</div>
            </div>
            <div style={{ marginLeft: "20px" }}>{entry.payload.value}</div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    
    <div style={{ width: "100%", height: 420 }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      >
        <PieChart width={"100px"} height={"100px"}>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            <Label
              content={<CustomLabel labelText="Total de ventas" value={15} />}
              position="center"
            />
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
