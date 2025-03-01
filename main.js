var currentMonth,currentYear;
const testElement = document.createElement('td'); testElement.innerText = "TEST";
var main = document.getElementById('main');
let done = true;
var test;
let date = new Date();
generate((date.getMonth()+1),(date.getFullYear()))
function generate(month,year){
    currentMonth = month;
    currentYear = year;

    switchMonth();
}
function makeCalender(month, year){
    if(month == 0){
        return false
    }

    if(document.getElementById('calender')){
        document.getElementById('calender').remove();
    }
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let sort = 7;
    let count=1;
    let startedDay = startDay(month, year);
    let spacer = 0;
    let maxCount = daysInMonth(month, year);
    let lastMonthMax = daysInMonth(month-1, year);
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    const days = document.createElement("tr");
    a();
    function a(){
        let a = document.createElement('td'); a.innerText = "Mo"; days.appendChild(a);
        let b = document.createElement('td'); b.innerText = "Tu"; days.appendChild(b);
        let c = document.createElement('td'); c.innerText = "We"; days.appendChild(c);
        let d = document.createElement('td'); d.innerText = "Th"; days.appendChild(d);
        let e = document.createElement('td'); e.innerText = "Fr"; days.appendChild(e);
        let s = document.createElement('td'); s.innerText = "Sa"; days.appendChild(s);
        let S = document.createElement('td'); S.innerText = "Su"; days.appendChild(S);
        let arr = [a,b,c,d,e,s,S];
        arr.forEach(el => {
            el.classList.add('dayHead');
        });
    };

    const yearLine = document.createElement('tr');
    yearLine.id = 'yearTr';
    const yearText = document.createElement('th');
    yearLine.appendChild(yearText);
    yearText.innerText = `Year: ${year}`;

    const monthText = document.createElement('th');
    yearLine.appendChild(monthText);
    monthText.innerText = `${months[month-1]}`;
    
    tblBody.appendChild(yearLine);
    tblBody.appendChild(days);
    for (let i = 1; i <= 6; i++) {
        const row = document.createElement("tr");
        row.style.display = "flex";
        row.style.justifyContent = "space-around";
        row.style.flexFlow = "row-reverse";
            for (let j = 1; j <= 7; j++) {
                if(count <= maxCount && startedDay <= spacer){
                    const data = document.createElement("td");
                    const cellText = document.createTextNode(`${count}`);
                    data.classList.add('day');

                    if(i == 1){
                        data.style.order = `${-sort}`; 
                        sort++;  
                    }else if(i != 1){
                        data.style.order = `${sort}`;
                        sort--;
                    }

                    if(count == new Date().getDate() && month == new Date().getMonth()+1 && year == new Date().getFullYear()){
                        data.classList.add('Activeday')
                    }

                    data.onclick = ()=>{
                        let arr = document.getElementsByClassName('Activeday');
                        if(arr.length > 0){
                            Array.from(arr).forEach(el => {
                                el.classList.remove('Activeday');
                            });
                        }
                        data.classList.add('Activeday');
                    }
                    count++
                    data.appendChild(cellText);
                    row.appendChild(data);
                    if(count == maxCount){
                        done = false;
                    }
                }else if(!(count >= maxCount)){
                    const data = document.createElement("td");
                    if(spacer <= startedDay){
                        var cellText = document.createTextNode(`${lastMonthMax - spacer}`);
                        data.style.order = `${sort}`;
                        sort++;
                    }else{
                        var cellText = document.createTextNode("");
                    }
                    data.classList.add("placeholder");
                    spacer++
                    data.appendChild(cellText);
                    row.appendChild(data);
                }
                
            }
        tblBody.appendChild(row);
    }
    

    tbl.appendChild(tblBody);
    tbl.id = "calender";
    main.appendChild(tbl);
    tbl.setAttribute("border", "2");
    check(sort);
    return tbl;
}
function check(sort){
    if(done == false){
        // if statements used to check which one is the last row and if it isn't empty
        if(document.getElementsByTagName('tbody')[0].childNodes[document.getElementsByTagName('tbody')[0].childNodes.length -1].childNodes.length !== 0){
            correctLastrow(document.getElementsByTagName('tbody')[0].childNodes[document.getElementsByTagName('tbody')[0].childNodes.length -1].childNodes.length, 1,sort)
        }else if(document.getElementsByTagName('tbody')[0].childNodes[document.getElementsByTagName('tbody')[0].childNodes.length -2].childNodes.length !== 0){
            correctLastrow(document.getElementsByTagName('tbody')[0].childNodes[document.getElementsByTagName('tbody')[0].childNodes.length -2].childNodes.length, 2,sort)
        }
    }

    function correctLastrow(checkNumber, method, sort){
        if(checkNumber < 7 && method == 1){
            let counting = 1;
            for(let i=0;i<7-checkNumber; i++){
                let makeUP = document.createElement('td'); makeUP.innerText = `${counting}`; makeUP.style.order = `${sort}`; makeUP.classList.add('placeholder');
                sort--;
                counting++;
                document.getElementsByTagName('tbody')[0].childNodes[document.getElementsByTagName('tbody')[0].childNodes.length -1].appendChild(makeUP);
            }
        }
        if(checkNumber < 7 && method == 2){
            let counting = 1;
            for(let i=0;i<7-checkNumber; i++){
                let makeUP = document.createElement('td'); makeUP.innerText = `${counting}`; makeUP.style.order = `${sort}`; makeUP.classList.add('placeholder')
                sort--;
                counting++;
                document.getElementsByTagName('tbody')[0].childNodes[document.getElementsByTagName('tbody')[0].childNodes.length -2].appendChild(makeUP);
            }
        }
    }
}
function switchMonth(){
    let backButton = document.createElement('button');
    let forwardButton = document.createElement('button');
    backButton.id = "backB"
    forwardButton.id = "forwardB"

    forwardButton.innerHTML = '<svg class="svg" viewBox="0 0 320 512"> <path fill="black" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/> </svg>'
    backButton.innerHTML= '<svg class="svg" viewBox="0 0 320 512"> <path fill="black" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/> </svg>'

    backButton.onclick = ()=>{
        currentMonth--
        if(currentMonth <= 0){
            currentMonth = 12;
            currentYear--
        }
        makeCalender(currentMonth,currentYear);
    }
    forwardButton.onclick = ()=>{
        currentMonth++
        if(currentMonth >= 13){
            currentMonth = 1;
            currentYear++
        }
        makeCalender(currentMonth,currentYear);
    }
    main.appendChild(backButton);
    makeCalender(currentMonth,currentYear);
    main.appendChild(forwardButton);
}
function daysInMonth(month,year){
    return new Date(year,month,0).getDate();
}
function startDay(month,year){
    return new Date(year,month-1,0).getDay();
}