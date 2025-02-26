makeCalender(2);
function makeCalender(month){
    let count=1;
    let maxCount = daysInMonth(month,new Date().getFullYear());
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    
 for (let i = 1; i <= 5; i++) {
        const row = document.createElement("tr");
            for (let j = 1; j <= 7; j++) {
                if(count <= maxCount){
                    const data = document.createElement("td");
                    const cellText = document.createTextNode(`${count}`);
                    count++
                    data.appendChild(cellText);
                    row.appendChild(data);
                }
            }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2");
  }

function daysInMonth(month,year){
return new Date(year,month,0).getDate();
}