`use strict`
var date = new Date();
var datetime = date.toLocaleString();
//var datetime = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date);
document.querySelector(".real-time").textContent = datetime; //it will print on html page
