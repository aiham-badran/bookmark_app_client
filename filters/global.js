import Vue from 'vue'

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Return text if the creation date is less than a day, and if it is in the same year,
 * the day and month are returned, otherwise a full date is returned
 * @param {Date} creation
 * @returns String
 */
const read_date = (creation) => {
  let result,
    now = new Date(),
    date = new Date(creation)

  // for Get difference between the date of created bookmark and date of now by Minutes
  let time =  Math.floor(Math.abs(now.getTime() - date.getTime()) /(1000*60))

  // If creation before 10 min
  if(time < 10){
    result = 'a few minutes ago'
  }
  // If creation before 1 hour
  else if(time < 60 ){
    result = 'before one hour'
  }
  // If creation before 1 day
  else if( time < 1440 ){
    result = 'before one day'
  }
  // If creation in this year
  else if(now.getFullYear() == date.getFullYear() ){
    result = `${date.getDate()} ${month[date.getMonth()]}`
  }
  else{
    result = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
  }

  return result;
}


/**
 * Return url host name only
 *
 * @param {url}
 * @returns String
 */
 const url_hostname = (url) => {
  return new URL(url).hostname
}

// filters registration
Vue.filter('readable_date',read_date)
Vue.filter('url_hostname',url_hostname)
