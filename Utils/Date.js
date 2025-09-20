// Utils/getFormattedDate.js
function getFormattedDate() {
 const now = new Date(); // safe, using built-in Date
 const options = {
  day: '2-digit',
  month: 'short', // "Sep"
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
 };
 return now.toLocaleString('en-US', options);
}

module.exports = getFormattedDate;
