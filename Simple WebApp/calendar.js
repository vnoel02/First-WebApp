"use strict";


var thisDay = new Date();

document.getElementById("calendar").innerHTML = createCalendar(thisDay);

function createCalendar(calDate) {

   var calendarHTML = "<table id='calendar_table'>";

   calendarHTML+=calCaption(calDate);
   calendarHTML+= calWeekdayRow();
   calendarHTML+= calDays(calDate);
   calendarHTML+="</table>";

   return calendarHTML;
}

function calCaption(calDate) {
   var monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];

   var thisMonth = calDate.getMonth();
   var thisYear = calDate.getFullYear();

   return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";

}

function calWeekdayRow() {
   var dayName = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];

   var rowHTML = "<tr>";

   for(var i=0; i<dayName.length; i++) {
      rowHTML += "<th classname='calendar_weekdays'>" + dayName[i] +"</th>";
   }

   rowHTML += "</tr>";

   return rowHTML;
}



function daysInMonth(calDate) {
   var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];

   var thisYear = calDate.getFullYear();
   var thisMonth = calDate.getMonth();

   if(thisYear%4===0) {
      if ((thisYear%100!=0) || (thisYear%400===0))
         dayCount[1] = 29;
   }


   return dayCount[thisMonth];
}


function calDays(calDate) {

   var day = new Date(calDate.getFullYear(), calDate.getMonth(),1);
   var weekDay = day.getDay();

   var htmlCode = "<tr>";

   for (var i=0; i<weekDay; i++) {
      htmlCode += "<td></td>";
   }


   var totalDays = daysInMonth(calDate);
   var highlight = calDate.getDate();

   for (var i=1; i<=totalDays; i++) {
      day.setDate(i);
      weekDay = day.getDay();

      if(weekDay===0) htmlCode += "<tr>";
      

      if (i===highlight) {
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";

      } else {
         htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] +"</td>";
      }

      if(weekDay===6) htmlCode+="</tr>";
      
   }

   htmlCode+="</tr>";
      
   return htmlCode;
}