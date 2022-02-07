let chart2 = document.getElementById("canvas2");
let columnChartExample2 = new ColumnChart(
    {
        canvas: chart2,
        dataValues: [845, 614, 539, 282, 175],
        dataList: ["RTV i TV", "Komputery", "Kamery", "Konsole i gry", "AGD"],
        title: "Sprzedaż towarów w firmie X w 2020r (w sztukach)"
    }
);
columnChartExample2.render();
