document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    let selectedDate = null;
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
  
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const currentMonthElement = document.getElementById("currentMonth");
    const calendarDaysElement = document.getElementById("calendarDays");
    const selectedDateElement = document.getElementById("currentDate");
  
    renderCalendar(currentMonth, currentYear);
  
    function renderCalendar(month, year) {
      currentMonthElement.innerHTML = `${getMonthName(month)} ${year}`;
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const prevMonthDays = new Date(year, month, 0).getDate();
      const daysInMonth = lastDayOfMonth.getDate();
      const startingDay = firstDayOfMonth.getDay();
  
      calendarDaysElement.innerHTML = "";
  
      for (let i = startingDay; i > 0; i--) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = prevMonthDays - i + 1;
        calendarDaysElement.appendChild(dayElement);
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i;
        dayElement.addEventListener("click", () => {
          if (selectedDate) {
            selectedDate.classList.remove("selected");
          }
          selectedDate = dayElement;
          selectedDate.classList.add("selected");
          saveSelectedDateToLocalStorage(i, month, year);
          displaySelectedDate();
        });
        calendarDaysElement.appendChild(dayElement);
      }
    }
  
    function getMonthName(month) {
      const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ];
      return months[month];
    }
  
    function saveSelectedDateToLocalStorage(day, month, year) {
      const selectedDateObj = {
        day: day,
        month: month,
        year: year
      };
      localStorage.setItem("selectedDate", JSON.stringify(selectedDateObj));
    }
  
  
    function displaySelectedDate() {
      const selectedDateObj = JSON.parse(localStorage.getItem("selectedDate"));
      if (selectedDateObj) {
        const { day, month, year } = selectedDateObj;
        const formattedDate = `${padNumber(day)}/${padNumber(month + 1)}/${year}`;
        selectedDateElement.textContent = formattedDate;
      }
    }
    
    function padNumber(number) {
      return number.toString().padStart(2, "0");
    }
    
  
    prevButton.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
      displaySelectedDate();
    });
  
    nextButton.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
      displaySelectedDate();
    });
  
    // Display the selected date on page load
    displaySelectedDate();
  });
// localStorage

window.addEventListener("load" , ()=>{
  localStorage.clear();
  localStorage.setItem("normalHoursCount" , 1);
  localStorage.setItem("SL_Adult" , 0);
  localStorage.setItem("SL_Child" , 0);
  localStorage.setItem("Foreigner_Adult" , 10);
  localStorage.setItem("Foreigner_Child" , 0);
  localStorage.setItem("count" , 1);
  localStorage.setItem("countForeigner Adult" , 1);

})
  
    // Function to handle the click event for plus button
    function handlePlusButtonClick(id) {
        const countElement = document.getElementById(id);
        const parentcountElement = countElement.parentNode.parentNode;
        const guest = parentcountElement.querySelector('.guest-name p').innerText;
        let count = parseInt(countElement.innerText);
        count += 1;
        countElement.innerText = count;
        localStorage.setItem(`count${guest}` , count);

      }
    
      // Function to handle the click event for minus button
      function handleMinusButtonClick(id) {
        const countElement = document.getElementById(id);
        const parentcountElement = countElement.parentNode.parentNode;
        const guest = parentcountElement.querySelector('.guest-name p').innerText;
        console.log(guest);
        let count = parseInt(countElement.innerText);
        if (count > 0) {
          count -= 1;
          countElement.innerText = count;
          localStorage.setItem(`count${guest}` , count);
        }
      }

      
// SL Adult
      function updatetableSA(){
        const summaryTable = document.getElementById("Summary-Table");
        const rows = summaryTable.querySelectorAll("tr");
        normalHoursCount = localStorage.getItem("normalHoursCount");
        peakHoursCount = localStorage.getItem("peakHoursCount");
        let foundRow = null;

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const cells = row.getElementsByTagName("td");
          const span = cells[0].querySelector("span");
          if (cells.length === 2 && span && span.textContent === "SL Adult") {
            foundRow = row;
            break;
          }
        }
        let count = localStorage.getItem("count");
  
        if (count > 0){
        if (foundRow) {
          // If a row exists, update the charge
          const charge = '$' + (((normalHoursCount*4)+(peakHoursCount*6))*count);
          const updatedcategoryName = count + ` <span>SL Adult</span>`;
          foundRow.cells[1].innerText = charge;
          foundRow.cells[0].innerHTML = updatedcategoryName;
      } else {
          // If no row exists, add a new row before the Total Payable row
          const newRow = summaryTable.insertRow(rows.length - 1);
          const categoryCell = newRow.insertCell(0);
          const chargeCell = newRow.insertCell(1);
          
          categoryCell.innerHTML = count + ` <span>SL Adult</span>` ;
          const charge = '$' + ((normalHoursCount*4)+(peakHoursCount*6))*count;
          const SL_Adult = ((normalHoursCount*4)+(peakHoursCount*6))*count;
          localStorage.setItem('SL_Adult' , SL_Adult);
          chargeCell.innerText = charge;
      }
    } else {
      // Remove the row if ticketCount is zero

    for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    if (cells.length === 2) {
      const span = cells[0].querySelector("span");
      if (span && span.textContent === "SL Adult") {
        summaryTable.deleteRow(i);
        break;
      }
    }
    }
    }
    }
    
    // SL chilld
    function updatetableSC(){
      const summaryTable = document.getElementById("Summary-Table");
      const rows = summaryTable.querySelectorAll("tr");
      normalHoursCount = localStorage.getItem("normalHoursCount");
      peakHoursCount = localStorage.getItem("peakHoursCount");
      let foundRow = null;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName("td");
        const span = cells[0].querySelector("span");
        if (cells.length === 2 && span && span.textContent === "SL Child") {
          foundRow = row;
          break;
        }
      }
      let count = localStorage.getItem("count");

      if (count > 0){
      if (foundRow) {
        // If a row exists, update the charge
        const charge = '$' + (((normalHoursCount*2)+(peakHoursCount*3))*count);
        const updatedcategoryName = count + ` <span>SL Child</span>`;
        foundRow.cells[1].innerText = charge;
        foundRow.cells[0].innerHTML = updatedcategoryName;
    } else {
        // If no row exists, add a new row before the Total Payable row
        const newRow = summaryTable.insertRow(rows.length - 1);
        const categoryCell = newRow.insertCell(0);
        const chargeCell = newRow.insertCell(1);
        
        categoryCell.innerHTML = count + ` <span>SL Child</span>` ;
        const charge = '$' +  ((normalHoursCount*2)+(peakHoursCount*3))*count;
        const SL_Child = ((normalHoursCount*4)+(peakHoursCount*6))*count;
        localStorage.setItem('SL_Child' , SL_Child);
        chargeCell.innerText = charge;
    }
  } else {
    // Remove the row if ticketCount is zero
  for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  const cells = row.getElementsByTagName("td");
  if (cells.length === 2) {
    const span = cells[0].querySelector("span");
    if (span && span.textContent === "SL Child") {
      summaryTable.deleteRow(i);
      break;
    }
  }
  }
  }
  }


// // SL Child
//       function updatetableSC(){
//         const summaryTable = document.getElementById("Summary-Table");
//         const rows = summaryTable.querySelectorAll("tr");
//         let foundRow = null;

//         for (let i = 0; i < rows.length; i++) {
//           const row = rows[i];
//           const cells = row.getElementsByTagName("td");
//           const span = cells[0].querySelector("span");
//           if (cells.length === 2 && span && span.textContent === "SL ") {
//             foundRow = row;
//             break;
//           }
//         }
//         let count = localStorage.getItem("count");
  
//         if (count > 0){
//         if (foundRow) {
//           // If a row exists, update the charge
//           const charge = "0";
//           const updatedcategoryName = count + ` <span>SL Child</span>`;
//           foundRow.cells[1].innerText = charge;
//           foundRow.cells[0].innerHTML = updatedcategoryName;
//       } else {
//           // If no row exists, add a new row before the Total Payable row
//           const newRow = summaryTable.insertRow(rows.length - 1);
//           const categoryCell = newRow.insertCell(0);
//           const chargeCell = newRow.insertCell(1);
          
//           categoryCell.innerHTML = count + ` <span>SL Child</span>` ;
//           const charge = "0";
//           chargeCell.innerText = charge;
//       }
//     } else {
//       // Remove the row if ticketCount is zero
//     for (let i = 0; i < rows.length; i++) {
//     const row = rows[i];
//     const cells = row.getElementsByTagName("td");
//     if (cells.length === 2) {
//       const span = cells[0].querySelector("span");
//       if (span && span.textContent === "SL Child") {
//         summaryTable.deleteRow(i);
//         break;
//       }
//     }
//     }
//     }
//     }

// Foreiger Adult
function updatetableFA(){
  const summaryTable = document.getElementById("Summary-Table");
  const rows = summaryTable.querySelectorAll("tr");
  normalHoursCount = localStorage.getItem("normalHoursCount");
  peakHoursCount = localStorage.getItem("peakHoursCount");
  let foundRow = null;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    const span = cells[0].querySelector("span");
    if (cells.length === 2 && span && span.textContent === "Foreigner Adult") {
      foundRow = row;
      break;
    }
  }
  let count = localStorage.getItem("count");

  if (count > 0){
  if (foundRow) {
    // If a row exists, update the charge
    const charge = '$' + (((normalHoursCount*10)+(peakHoursCount*13))*count);
    const updatedcategoryName = count + ` <span>Foreigner Adult</span>`;
    foundRow.cells[1].innerText = charge;
    foundRow.cells[0].innerHTML = updatedcategoryName;
} else {
    // If no row exists, add a new row before the Total Payable row
    const newRow = summaryTable.insertRow(rows.length - 1);
    const categoryCell = newRow.insertCell(0);
    const chargeCell = newRow.insertCell(1);
    
    categoryCell.innerHTML = count + ` <span>Foreigner Adult</span>` ;
    const charge = '$' + ((normalHoursCount*10)+(peakHoursCount*13))*count;
    const Foreginer_Adult = ((normalHoursCount*4)+(peakHoursCount*6))*count;
    localStorage.setItem('Foreginer_Adult' , Foreginer_Adult);
    chargeCell.innerText = charge;
}
} else {
// Remove the row if ticketCount is zero
for (let i = 0; i < rows.length; i++) {
const row = rows[i];
const cells = row.getElementsByTagName("td");
if (cells.length === 2) {
const span = cells[0].querySelector("span");
if (span && span.textContent === "Foreigner Adult") {
  summaryTable.deleteRow(i);
  break;
}
}
}
}
}

// // Foreginer Adult
      
// function updatetableFA(){
//   const summaryTable = document.getElementById("Summary-Table");
//   const rows = summaryTable.querySelectorAll("tr");
//   let foundRow = null;

//   for (let i = 0; i < rows.length; i++) {
//     const row = rows[i];
//     const cells = row.getElementsByTagName("td");
//     const span = cells[0].querySelector("span");
//     if (cells.length === 2 && span && span.textContent === "Foreigner Adult") {
//       foundRow = row;
//       break;
//     }
//   }
  
//   let count = localStorage.getItem("count");
  
//   if (count > 0){
//   if (foundRow) {
//     // If a row exists, update the charge
//     const charge = "0";
//     const updatedcategoryName = count + ` <span>Foreginer Adult</span>`;
//     foundRow.cells[1].innerText = charge;
//     foundRow.cells[0].innerHTML = updatedcategoryName;
// } else {
//     // If no row exists, add a new row before the Total Payable row
//     const newRow = summaryTable.insertRow(rows.length - 1);
//     const categoryCell = newRow.insertCell(0);
//     const chargeCell = newRow.insertCell(1);
    
//     categoryCell.innerHTML = count + ` <span>Foreigner Adult</span>` ;
//     const charge = "0";
//     chargeCell.innerText = charge;
// }
// } else {
//   // Remove the row if ticketCount is zero
// for (let i = 0; i < rows.length; i++) {
// const row = rows[i];
// const cells = row.getElementsByTagName("td");
// if (cells.length === 2) {
//   const span = cells[0].querySelector("span");
//   if (span && span.textContent === "Foreigner Adult") {
//     summaryTable.deleteRow(i);
//     break;
//   }
// }
// }
// }
// }

  
// foreigner Child

      
function updatetableFC(){
  const summaryTable = document.getElementById("Summary-Table");
  const rows = summaryTable.querySelectorAll("tr");
  normalHoursCount = localStorage.getItem("normalHoursCount");
  peakHoursCount = localStorage.getItem("peakHoursCount");
  let foundRow = null;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    const span = cells[0].querySelector("span");
    if (cells.length === 2 && span && span.textContent === "Foreigner Child") {
      foundRow = row;
      break;
    }
  }
  
  let count = localStorage.getItem("count");
  
  if (count > 0){
  if (foundRow) {
    // If a row exists, update the charge
    const charge = '$' + (((normalHoursCount*5)+(peakHoursCount*8))*count);
    const updatedcategoryName = count + ` <span>Foreigner Child</span>`;
    foundRow.cells[1].innerText = charge;
    foundRow.cells[0].innerHTML = updatedcategoryName;
} else {
    // If no row exists, add a new row before the Total Payable row
    const newRow = summaryTable.insertRow(rows.length - 1);
    const categoryCell = newRow.insertCell(0);
    const chargeCell = newRow.insertCell(1);
    
    categoryCell.innerHTML = count + ` <span>Foreigner Child</span>` ;
    const charge = '$' + ((normalHoursCount*5)+(peakHoursCount*8))*count;
    const Foreginer_Child = ((normalHoursCount*4)+(peakHoursCount*6))*count;
    localStorage.setItem('Foreginer_Child' , Foreginer_Child);
    chargeCell.innerText = charge;
}
} else {
  // Remove the row if ticketCount is zero
for (let i = 0; i < rows.length; i++) {
const row = rows[i];
const cells = row.getElementsByTagName("td");
if (cells.length === 2) {
  const span = cells[0].querySelector("span");
  if (span && span.textContent === "Foreigner Child") {
    summaryTable.deleteRow(i);
    break;
  }
}
}
}
}

// infant

      
function updatetableIC(){
  const summaryTable = document.getElementById("Summary-Table");
  const rows = summaryTable.querySelectorAll("tr");
  normalHoursCount = localStorage.getItem("normalHoursCount");
  peakHoursCount = localStorage.getItem("peakHoursCount");
  let foundRow = null;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    const span = cells[0].querySelector("span");
    if (cells.length === 2 && span && span.textContent === "Infant") {
      foundRow = row;
      break;
    }
  }

  let count = localStorage.getItem("count");
  
  if (count > 0){
        if (foundRow) {
          // If a row exists, update the charge
          const charge = "free";
          const updatedcategoryName = count + ` <span>Infant</span>`;
          foundRow.cells[1].innerText = charge;
          foundRow.cells[0].innerHTML = updatedcategoryName;
      } else {
          // If no row exists, add a new row before the Total Payable row
          const newRow = summaryTable.insertRow(rows.length - 1);
          const categoryCell = newRow.insertCell(0);
          const chargeCell = newRow.insertCell(1);
          
          categoryCell.innerHTML = count + ` <span>Infant</span>` ;
          const charge = "free";
          chargeCell.innerText = charge;
      }
} else {
  // Remove the row if ticketCount is zero
for (let i = 0; i < rows.length; i++) {
const row = rows[i];
const cells = row.getElementsByTagName("td");
if (cells.length === 2) {
  const span = cells[0].querySelector("span");
  if (span && span.textContent === "Infant") {
    summaryTable.deleteRow(i);
    break;
  }
}
}
cal_charge(count);
}
}



      // Add event listeners to plus and minus buttons
      document.getElementById('btnplus1').addEventListener('click', () => {handlePlusButtonClick('SA');
      updatetableSA(); 
      cal_charge()});
      document.getElementById('btnmin1').addEventListener('click', () => {handleMinusButtonClick('SA');
      updatetableSA();
      cal_charge()});
    
      document.getElementById('btnplus2').addEventListener('click', () => {handlePlusButtonClick('SC');
      updatetableSC(); 
      cal_charge()});
      document.getElementById('btnmin2').addEventListener('click', () => {handleMinusButtonClick('SC');
      updatetableSC();
      cal_charge()});
    
      document.getElementById('btnplus3').addEventListener('click', () => {handlePlusButtonClick('FA');
      updatetableFA();
      cal_charge()});
      document.getElementById('btnmin3').addEventListener('click', () => {handleMinusButtonClick('FA');
      updatetableFA();
      cal_charge()});
    
      document.getElementById('btnplus4').addEventListener('click', () => {handlePlusButtonClick('FC');
      updatetableFC();
      cal_charge()});
      document.getElementById('btnmin4').addEventListener('click', () => {handleMinusButtonClick('FC');
      updatetableFC();
      cal_charge()});
    
      document.getElementById('btnplus5').addEventListener('click', () => {handlePlusButtonClick('IC');
      updatetableIC();
      cal_charge()});
      document.getElementById('btnmin5').addEventListener('click', () => {handleMinusButtonClick('IC');
      updatetableIC();
      cal_charge()});


// Duration update and storing
const time = document.getElementById("duration");
const selectedtime = document.getElementById("selectedduration"); // Existing element
const selectedtimes = document.getElementById("selecttime"); // New element
const peakHours = [4, 5, 6, 9, 10, 11]; // Peak hours values

time.addEventListener("change", selectedduration);

function selectedduration() {
  localStorage.removeItem('peakHoursCount')
  localStorage.removeItem('normalHoursCount')
  const selectElement = document.getElementById("duration");
  const selectedOptions = Array.from(selectElement.options).filter(option => option.selected);

  localStorage.setItem("Duration", selectedOptions.map(option => option.value).join(','));

  // Count peak hours, normal hours, and total hours for each selected option
  let peakHoursCount = 0;
  let normalHoursCount = 0;
  const totalHoursCount = selectedOptions.length;

  const selectedTimeTexts = selectedOptions.map(option => option.innerText);
  
  selectedTimeTexts.forEach(selectedTimeText => {
    const isSelectedPeak = peakHours.includes(Number(selectedOptions.find(option => option.innerText === selectedTimeText).value));
    if (isSelectedPeak) {
      peakHoursCount++;
      localStorage.setItem('peakHoursCount' , peakHoursCount);
    } else {
      normalHoursCount++;
      localStorage.setItem('normalHoursCount' , normalHoursCount);
    }
  });

  selectedtime.innerText = `${selectedTimeTexts.join(', ')}`; // Update the existing element
  selectedtimes.innerText = `${totalHoursCount} hrs (${normalHoursCount} Normal : ${peakHoursCount} Peak)`; // Update the new element
  cal_charge();
}




//Total Payble

  
function total_payable()
{
  const SL_Adult=parseInt(localStorage.getItem('SL_Adult'));
  const SL_Child=parseInt(localStorage.getItem('SL_Child'));
  const Foreigner_Adult=parseInt(localStorage.getItem('Foreigner_Adult'));
  const Foreigner_Child=parseInt(localStorage.getItem('Foreigner_Child'));
  const totalamount = document.getElementById("totalamount");

  const total_pay=(SL_Adult+SL_Child+Foreigner_Adult+Foreigner_Child);
  totalamount.innerText = "$" + total_pay;
  console.log(total_pay);
}

function cal_charge(){
  const sumtable = document.getElementById("Summary-Table");
  const rows = sumtable.querySelectorAll("tr");
  normalHoursCount = localStorage.getItem("normalHoursCount");
  peakHoursCount= localStorage.getItem("peakHoursCount");
  const countSLAdult = localStorage.getItem('countSL Adult')
  const countSLChild = localStorage.getItem('countSL Child')
  const countForeignerAdult = localStorage.getItem('countForeigner Adult')
  const countForeignerChild = localStorage.getItem('countForeigner Child')

  for (let i = 0; i < rows.length; i++) 
    {
      const row = rows[i];
      const cells = row.getElementsByTagName("td");
      const span = cells[0].querySelector("span");
      if (span){
         const guest = span.innerText;
         if (guest === "SL Adult"){
          count = parseInt(localStorage.getItem("count"));
          const charge = '$'+ ((normalHoursCount*4)+(peakHoursCount*6))*countSLAdult;
          chargeCell = cells[1];
          chargeCell.innerText = charge;
          const SL_Adult = (((normalHoursCount*4)+(peakHoursCount*6))*countSLAdult);
          localStorage.setItem('SL_Adult' , SL_Adult);

         }
         else if (guest === "SL Child"){
          count = parseInt(localStorage.getItem("count"));
          const charge ='$'+ (((normalHoursCount*2)+(peakHoursCount*3))*countSLChild);
          chargeCell = cells[1];
          chargeCell.innerText = charge;
          const SL_Child =(((normalHoursCount*2)+(peakHoursCount*3))*countSLChild);
          localStorage.setItem('SL_Child' , SL_Child);
          
         }
         else if (guest === "Foreigner Adult"){
          count = parseInt(localStorage.getItem("count"));
          const charge = '$'+(((normalHoursCount*10)+(peakHoursCount*13))*countForeignerAdult);
          chargeCell = cells[1];
          chargeCell.innerText = charge;
          const Foreigner_Adult =(((normalHoursCount*10)+(peakHoursCount*13))*countForeignerAdult);
          localStorage.setItem('Foreigner_Adult' , Foreigner_Adult);

         }
         else if (guest === "Foreigner Child"){
          count = parseInt(localStorage.getItem("count"));
          const charge = '$'+(((normalHoursCount*5)+(peakHoursCount*8))*countForeignerChild);
          chargeCell = cells[1];
          chargeCell.innerText = charge;
          const Foreigner_Child = (((normalHoursCount*5)+(peakHoursCount*8))*countForeignerChild);
          localStorage.setItem('Foreigner_Child' , Foreigner_Child);
         }
      }
      
    }
    total_payable();
}

const nextbtn = document.getElementById('nextbtn');
nextbtn.addEventListener('click' , ()=>{
  const currentDate = document.getElementById('currentDate');
  const selectedduration = document.getElementById('selectedduration');
  const selecttime = document.getElementById('selecttime');
  const totalamount = document.getElementById('totalamount');
  const SummaryTable = document.getElementById('Summary-Table');
  localStorage.setItem('currentDate' , currentDate.innerText);
  localStorage.setItem('selectedduration' , selectedduration.innerText);
  localStorage.setItem('selecttime' , selecttime.innerText);
  localStorage.setItem('totalamount' , totalamount.innerText);
  localStorage.setItem('SummaryTable' , SummaryTable.innerHTML);

})