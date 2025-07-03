import React from "react";

interface DonutChartProps {
  data: {
    name: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const centerX = 67.5;
  const centerY = 67.5;
  const outerRadius = 67;
  const innerRadius = 37;
  const rotateOffset = -45;

  const filteredData = [...data]
    .filter((item) => item.percentage > 0)
    .reverse();

  return (
    <svg width="135" height="135" viewBox="0 0 135 135">
      {filteredData.map((item, index) => {
        let startAngle = 0;
        for (let i = 0; i < index; i++) {
          startAngle += (filteredData[i].percentage / 100) * 360;
        }
        const endAngle = startAngle + (item.percentage / 100) * 360;
        const safeEndAngle =
          index === filteredData.length - 1 && filteredData.length === 1
            ? 359.999
            : endAngle;

        const startRad = ((startAngle + rotateOffset) * Math.PI) / 180;
        const endRad = ((safeEndAngle + rotateOffset) * Math.PI) / 180;

        const x1 = centerX + outerRadius * Math.cos(startRad);
        const y1 = centerY + outerRadius * Math.sin(startRad);
        const x2 = centerX + outerRadius * Math.cos(endRad);
        const y2 = centerY + outerRadius * Math.sin(endRad);

        const x3 = centerX + innerRadius * Math.cos(endRad);
        const y3 = centerY + innerRadius * Math.sin(endRad);
        const x4 = centerX + innerRadius * Math.cos(startRad);
        const y4 = centerY + innerRadius * Math.sin(startRad);

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        const pathData = [
          `M ${x1} ${y1}`,
          `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
          `L ${x3} ${y3}`,
          `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
          "Z",
        ].join(" ");

        return (
          <path
            key={item.name}
            d={pathData}
            fill={item.color}
            className="transition-all duration-200 hover:opacity-80"
          />
        );
      })}
    </svg>
  );
};

export default DonutChart;
