let chart3 = document.getElementById("canvas3");
let columnChartExample3 = new ColumnChart(
    {
        canvas: chart3,
        dataValues: [30, 25, 55, 60, 13],
        dataList: ["6A", "6B", "6C", "6D", "6E"],
        title: "Liczba nieobecności w klasach 6"
    }
);
columnChartExample3.render();
