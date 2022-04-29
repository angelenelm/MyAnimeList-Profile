import React from "react";
import { Bar } from "react-chartjs-2";

const ReleaseYearChart = ({ perYearList }) => {
  const data = {
    datasets: [
      {
        data: Object.values(perYearList).map((animeList) => animeList.length),
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          labels: Object.keys(perYearList),
        },
      ],
    },
  };

  return <Bar type="bar" data={data} options={options} />;
};

export default ReleaseYearChart;
