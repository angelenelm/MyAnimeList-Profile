import React from "react";
import { Doughnut } from "react-chartjs-2";

const SourceChart = ({ bySource, theme }) => {
  const data = {
    labels: Object.keys(bySource).map((source) => {
      if (source === "light_novel" || source === "web_manga" || source === "visual_novel") {
        return (source.charAt(0).toUpperCase() + source.slice(1)).replaceAll("_", " ");
      } else {
        return source.charAt(0).toUpperCase() + source.slice(1);
      }
    }),
    datasets: [
      {
        data: Object.values(bySource).map((animeList) => animeList.length),
        backgroundColor: [
          "rgba(46, 81, 162, 1)",
          "rgba(46, 81, 162, 0.75)",
          "rgba(46, 81, 162, 0.5)",
          "rgba(46, 81, 162, 0.25)",
          "rgba(46, 81, 162, 0.10)",
        ],
        borderWidth: 0
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
        fontColor: (theme === "dark" ? "#e7e7e7" : "#171c28"),
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

export default SourceChart;
