let ColumnChart = function (options){
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    fixDPI(this.canvas);
    this.space = 50;
    this.dataValues = options.dataValues;
    this.dataList = options.dataList;
    this.noLines = this.dataValues.length + 1;
    this.maxValue = Math.max.apply(null, this.dataValues);
    this.title = options.title;
    this.dV = calculateDensityVertically(this.space, this.noLines, this.canvas);
    this.dH = calculateDensityHorizontally(this.dataList.length, this.canvas, this.space, this.dV);
    this.usedColors = [];

    this.drawBackgroundNet = function (){
        let distance = this.space * 0.7 - this.dV;
        let counter = 1;

        this.context.strokeStyle = '#808080';
        this.context.beginPath();

        do{
            this.context.moveTo(20, distance + (this.dV - 1) * counter);
            this.context.lineTo(this.canvas.width - 5, distance + (this.dV - 1) * counter);
            this.context.stroke();
            counter++;
        } while (counter <= this.noLines);
    }

    this.addChartTitle = function (){
        fitTextToFreePlace(this.title, 30, this.canvas.width, this.context);
        this.context.textAlign = "center";
        this.context.fillText(this.title, this.canvas.width / 2, 25);
    }

    // jednostki poziome
    this.addChartUnitHorizontally = function (){
        let i = 0;
        for(let data of this.dataList){
            fitTextToFreePlace(data, 20, this.dH, this.context);
            let xCoordinate = this.space + this.dV + 10 + this.dH * i + this.dH / 2;
            let yCoordinate = this.canvas.height - this.space * 0.05;
            this.context.fillText(data, xCoordinate, yCoordinate);
            i++;
        }
    }

    // jednostki pionowe
    this.addChartUnitVertically = function(){
        let nextValue = this.maxValue / (this.noLines - 1);
        let distance = this.space * 0.7 - this.dV;

        fitTextToFreePlace(this.maxValue.toString(), 20, this.dV, this.context);
        let counter = 0;
        do{
            this.context.fillText((Math.round((this.maxValue - nextValue * counter) * 10) / 10).toString(),
                this.space, distance + (this.dV - 1) * (counter + 1));
            counter++;
        } while(counter < this.noLines);
    }

    this.drawRectangles = function (){
        let scale = ((this.dV - 1) * (this.noLines - 1)) / this.maxValue;
        let i = 0;
        for(let value of this.dataValues){
            let xCoordinate = this.space + this.dV + 10 + this.dH * i;
            let yCoordinate = this.space * 0.7 - this.dV + (this.dV - 1) * this.noLines - value * scale;

            this.context.fillStyle = findUniqueColor(this.usedColors);

            this.context.beginPath();

            this.context.rect(xCoordinate, yCoordinate, this.dH, value * scale);
            this.context.fill();
            i++;
            this.usedColors.push(this.context.fillStyle);
        }
    }

    this.render = function (){
        this.drawBackgroundNet();
        this.addChartTitle();
        this.addChartUnitVertically();
        this.addChartUnitHorizontally();
        this.drawRectangles();
    }

}

let PieChart = function (options){
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    fixDPI(this.canvas);
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = Math.min.apply(null, [this.centerX, this.centerY]) - 20;
    this.usedColors = [];
    this.dataList = options.dataList;
    this.dataValues = options.dataValues;
    this.title = options.title;
    this.checkPercentage = options.checkPercentage;

    this.dataCorrectness = function (){
        if(this.dataList.length !== this.dataValues.length){
            return -1;
        }
        else if(this.canvas.width !== this.canvas.height * 2) {
            return -1;
        }
        else if(this.checkPercentage === true){
            let sum = 0;
            this.dataValues.forEach(e => sum += e);
            if (sum !== 100) return -1;
        }
        return 0;
    }

    this.addChartTitle = function (){
        fitTextToFreePlace(this.title, 30, this.canvas.width, this.context);
        this.context.textAlign = "center";
        this.context.fillText(this.title, this.canvas.width / 2, 25);
    }

    this.drawProgressCircle = function (percent, startAngleValue = null){
        let startAngle = startAngleValue == null ? 1.5 * Math.PI : startAngleValue;
        let unitValue = (Math.PI - 0.5 * Math.PI) / 25;
        let endAngle;

        if (percent >= 0 && percent <= 25) {
            endAngle = startAngle + (percent * unitValue);
        } else if (percent > 25 && percent <= 50) {
            endAngle = startAngle + (percent * unitValue);
        } else if (percent > 50 && percent <= 75) {
            endAngle = startAngle + (percent * unitValue);
        } else if (percent > 75 && percent <= 100) {
            endAngle = startAngle + (percent * unitValue);
        }

        this.context.fillStyle = findUniqueColor(this.usedColors);

        this.context.beginPath();
        this.context.moveTo(this.radius, this.centerY + 20);
        this.context.arc(this.radius, this.centerY + 20, this.radius, startAngle, endAngle, false);
        this.context.closePath();

        this.context.fill();

        this.usedColors.push(this.context.fillStyle);
        return endAngle;
    }

    this.addChartDescription = function (){
        let density = (this.canvas.height - 50) / this.usedColors.length;
        let i = 0;
        while(i < this.usedColors.length){
            let xCoordinate = this.radius * 2 + 5;
            let yCoordinate = density * i + 50;
            this.context.fillStyle = this.usedColors[i];
            this.context.beginPath();
            this.context.rect(xCoordinate, yCoordinate, density - 5, density - 5);
            this.context.fill();

            this.context.beginPath();
            this.context.fillStyle = 'black';

            let text = this.dataValues[i] + "% - " + this.dataList[i];

            let freePlace = this.canvas.width - this.radius * 2 - (this.canvas.height / this.usedColors.length) - 12;
            let fontSize = fitTextToFreePlace(text, 20, freePlace, this.context);

            this.context.fillText(text, xCoordinate + density, yCoordinate + (density - 5 + fontSize) / 2);
            i++;
        }
    }

    this.render = function (){
        if(this.dataCorrectness() === 0){
            let endAngleValue = null;
            this.dataValues.forEach(
                value => {
                    endAngleValue = this.drawProgressCircle(value, endAngleValue);
                }
            );
            this.addChartDescription(this.usedColors);
            this.addChartTitle();
        }
        else{
            if(this.checkPercentage){
                console.log("Podano błędne dane. " +
                    "Sprawdź czy suma wartości danych sumuje się do 100 oraz czy lista " +
                    "danych jest równa liście wartosci.")
            }
            console.log("Zadbaj żeby szerokość canvasa była dwukrotnie większa od wysokości!");
        }
    }
}


// FUNKCJE POMOCNICZE :
function calculateDensityVertically(space, noLines, canvas){
    return (canvas.height - space)/ (noLines - 1);
}

function calculateDensityHorizontally(noData, canvas, space, dV){
    return (canvas.width - space - dV) / (noData + 1);
}

function fixDPI(element){
    let dpi = window.devicePixelRatio;
    let style_height = +getComputedStyle(element).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(element).getPropertyValue("width").slice(0, -2);
    element.setAttribute('height', (style_height * dpi).toString());
    element.setAttribute('width', (style_width * dpi).toString());
}

function colorGenerator(){
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

function fitTextToFreePlace(text, fontSize, width, context){
    do{
        fontSize--;
        context.font = fontSize + "px Arial";
    } while (context.measureText(text).width > width);
    return fontSize;
}

function findUniqueColor(usedColors){
    let colors = Object.values(usedColors);
    let generateColor = colorGenerator();

    while(colors.includes(generateColor)){
        generateColor = colorGenerator();
    }
    return generateColor;
}
