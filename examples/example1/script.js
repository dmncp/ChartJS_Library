let chart1 = document.getElementById("canvas1");
let pieChartExample1 = new PieChart(
    {
        canvas: chart1,
        dataValues: [22, 15, 35, 5, 3, 8, 12],
        dataList: ["Firma 1", "Firma 2", "Firma 3", "Firma 4", "Firma 5", "Firma 6", "Pozostałe"],
        title: "Udział w rynku",
        checkPercentage: true
    }
);
pieChartExample1.render();
