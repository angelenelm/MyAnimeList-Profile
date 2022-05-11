import React, { useState, useEffect } from "react";
import { Tooltip } from "chart.js";
import { HorizontalBar } from "react-chartjs-2";

const HorizontalChart = ({ userDataset, theme }) => {
  const [dataset, setDataset] = useState(userDataset);

  // Sort genre dataset by decreasing value and subset first 10
  useEffect(() => {
    const genreEntries = Object.entries(dataset);
    const sortedGenreEntries = genreEntries.sort((a, b) => b[1].length - a[1].length).slice(0, 10);
    setDataset(Object.fromEntries(sortedGenreEntries));
  }, []);

  const data = {
    labels: Object.keys(dataset),
    datasets: [
      {
        data: Object.values(dataset).map((animeList) => animeList.length),
        backgroundColor: "rgba(46, 81, 162, 1)",
        categoryPercentage: 0.9,
      },
    ],
  };

  /**
   * Custom positioner
   * @function Tooltip.positioners.customHorizontal
   * @param elements {Chart.Element[]} the tooltip elements
   * @param eventPosition {Point} the position of the event in canvas coordinates
   * @returns {TooltipPosition} the tooltip position
   */
  Tooltip.positioners.customHorizontal = function (elements, eventPosition) {
    return {
      x: 250,
      y: eventPosition.y,
    };
  };

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      position: "customHorizontal",
      intersect: false,
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
        title: () => {},
        label: (tooltipItem, data) => `${tooltipItem.value} anime`,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontFamily: "'Whitney', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            fontColor: theme === "dark" ? "#e7e7e7" : "#171c28",
            fontSize: 16,
          },
        },
      ],
    },
  };

  return <HorizontalBar type="bar" data={data} options={options} />;
};

export default HorizontalChart;
