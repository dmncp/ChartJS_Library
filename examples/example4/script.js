let chart4 = document.getElementById("canvas4");
let pieChartExample4 = new PieChart(
    {
        canvas: chart4,
        dataValues: [60.5, 13.8, 11.2, 0.5, 8.1, 5.9],
        dataList: ["Azja", "Afryka", "Europa", "Australia", "Ameryka Północna", "Ameryka Południowa"],
        title: "Populacja kontynentów w 2015r",
        checkPercentage: true
    }
);
pieChartExample4.render();
