export const sanitizeDate = (string) => {
  // console.log(string.slice(5,7))
  let month_number = parseInt(string.slice(5,7), 10)
  let year = string.slice(0,4)
  let date = parseInt(string.slice(8,10), 10)
  let month_name;
  if (month_number === 1) {
    month_name = "January"
  }
  else if (month_number === 2) {
    month_name = "February"
  }
  else if (month_number === 3) {
    month_name = "March"
  }
  else if (month_number === 4) {
    month_name = "April"
  }
  else if (month_number === 5) {
    month_name = "May"
  }
  else if (month_number === 6) {
    month_name = "June"
  }
  else if (month_number === 7) {
    month_name = "July"
  }
  else if (month_number === 8) {
    month_name = "August"
  }
  else if (month_number === 9) {
    month_name = "September"
  }
  else if (month_number === 10) {
    month_name = "October"
  }
  else if (month_number === 11) {
    month_name = "November"
  }
  else if (month_number === 12) {
    month_name = "December"
  }
  return `${month_name} ${date}, ${year}`
};//format date end
