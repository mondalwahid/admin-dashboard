import React, { useState } from "react";
import Chart from "react-apexcharts";

const Bargraph = () => {
  const [chartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Cutom",
          "Category 1",
          "Category 2",
          "Category 3",
          "Category 4",
        ],
      },
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49],
      },
    ],
  });

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      width="600"
    />
  );
};

export default Bargraph;
