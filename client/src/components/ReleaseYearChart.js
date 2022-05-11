import React, { useState } from "react";
import { Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

const ReleaseYearChart = ({ perYearData, theme }) => {
  const [perYear, setPerYear] = useState(perYearData);
  // Fill in perYear data with empty array for years no anime are listed
  let year = parseInt(Object.keys(perYearData)[0]);
  const endYear = Object.keys(perYearData)[Object.keys(perYearData).length - 1];

  while (year <= endYear) {
    if (year in perYear === false) {
      setPerYear({ ...perYear, [year]: [] });
    }

    year++;
  }

  const data = {
    labels: Object.keys(perYear),
    datasets: [
      {
        data: Object.values(perYear).map((animeList) => animeList.length),
        backgroundColor: "rgba(46, 81, 162, 1)",
        minBarLength: 1,
        categoryPercentage: 0.95,
      },
    ],
  };

  /**
   * Custom positioner
   * @function Tooltip.positioners.customVertical
   * @param elements {Chart.Element[]} the tooltip elements
   * @param eventPosition {Point} the position of the event in canvas coordinates
   * @returns {TooltipPosition} the tooltip position
   */
  Tooltip.positioners.customVertical = (elements, eventPosition) => {
    return {
      x: eventPosition.x,
      y: 230,
    };
  };

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      mode: "nearest",
      axis: "x",
      intersect: false,
      position: "customVertical",
      displayColors: false,
      titleAlign: "center",
      titleMarginBottom: 10,
      titleFontFamily: "'Whitney', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      titleFontSize: 16,
      bodyAlign: "center",
      bodyFontFamily: "'Whitney', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      bodyFontSize: 14,
      caretSize: 0,
      xPadding: 15,
      yPadding: 15,
      callbacks: {
        title: (tooltipItem, data) =>
          `${tooltipItem[0].value === "0" ? "No" : tooltipItem[0].value} anime`,
        label: (tooltipItem, data) => `from ${tooltipItem.label}`,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            maxTicksLimit: 1,
            fontFamily: "'Whitney', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            fontColor: theme === "dark" ? "#e7e7e7" : "#171c28",
            fontSize: 14,
            maxRotation: 0,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  return <Bar type="bar" data={data} options={options} />;
};

export default ReleaseYearChart;
