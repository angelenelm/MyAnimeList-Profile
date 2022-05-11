import React from "react";
import { Doughnut } from "react-chartjs-2";

const MediaTypeChart = ({ byMediaType, theme }) => {
  const data = {
    labels: Object.keys(byMediaType).map((type) => {
      if (type === "tv" || type === "ova" || type === "ona") {
        return type.toUpperCase();
      } else {
        return type.charAt(0).toUpperCase() + type.slice(1);
      }
    }),
    datasets: [
      {
        data: Object.values(byMediaType).map((animeList) => animeList.length),
        backgroundColor: [
          "rgba(46, 81, 162, 1)",
          "rgba(46, 81, 162, 0.75)",
          "rgba(46, 81, 162, 0.5)",
          "rgba(46, 81, 162, 0.25)",
          "rgba(46, 81, 162, 0.10)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    legend: {
      position: "right",
      labels: {
        fontFamily: "'Whitney', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        fontSize: 14,
        fontColor: theme === "dark" ? "#e7e7e7" : "#171c28",
      },
    },
    tooltips: {
      displayColors: false,
      titleFontFamily: "'Whitney', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      bodyFontFamily: "'Whitney', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      bodyFontSize: 14,
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default MediaTypeChart;
