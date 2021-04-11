let Array1 = []
let Array2 = []

let input1 = document.getElementById("toArr1");
let input2 = document.getElementById("toArr2");

let span = document.getElementsByTagName("span");

let chart5 = document.getElementById("canvas5");
let chart6 = document.getElementById("canvas6");

let chartValues = [];
let chartExample5;
let chartExample6;

function chooseCorrectArray(element){
    if(element.id === "first"){
        addToArray(Array1, input1.value);
    }
    else if(element.id === "second"){
        addToArray(Array2, input2.value);
    }
    else{
        console.log("Incorrect element id");
    }
    updateDescription();
    calculatePercentages();
    updateCharts();
}

function addToArray(array, elementToAdd){
    array.push(elementToAdd);
}

function getSumLength(array1, array2){
    return array1.length + array2.length;
}

function updateDescription(){
    span.item(0).innerText = (Array1.length).toString();
    span.item(1).innerText = (Array2.length).toString();
    span.item(2).innerText = getSumLength(Array1, Array2).toString();
}

function calculatePercentages(){
    let sum = getSumLength(Array1, Array2);
    chartValues[0] = Math.round((Array1.length / sum) * 100);
    chartValues[1] = Math.round((Array2.length / sum) * 100);
    console.log(chartValues);
}

function updateCharts(){
    chartExample5 = new ColumnChart({
        canvas: chart5,
        dataValues: [Array1.length, Array2.length],
        dataList: ["Arr1", "Arr2"],
        title: "Rozmiar obu tablic"
    });

    chartExample6 = new PieChart({
        canvas: chart6,
        dataValues: chartValues,
        dataList: ["arr1 / sum", "arr2 / sum"],
        title: 'Procentowy "udział" każdej tabeli',
        checkPercentage: false
    });
    chartExample5.render();
    chartExample6.render();
}
