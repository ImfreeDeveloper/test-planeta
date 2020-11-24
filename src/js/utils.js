export function parseQrString (str) {
  const params = str.split('&')

  const date = getDate(params[0].split('t=')[1])
  const summa = params[1].split('s=')[1]
  const fn = params[2].split('fn=')[1]
  const i = params[3].split('i=')[1]
  const fp = params[4].split('fp=')[1]

  return {
    date,
    summa,
    fn,
    i,
    fp
  }
}

export function parseDateForSend (strDate) {
  const params = strDate.split('.')

  const day = params[0]
  const month = params[1]
  const year = params[2]

  return `${year}-${month}-${day}`
}

function getDate (dateTimeFormat) {
  let dateAsString = dateTimeFormat.split('')
  let year = dateAsString.splice(0, 4).join('')
  let month = dateAsString.splice(0, 2).join('')
  let day = dateAsString.splice(0, 2).join('')
  // let hours = dateAsString.splice(1, 2).join('')
  // let minutes = dateAsString.splice(1, 2).join('')
  // let seconds = dateAsString.splice(1, 2).join('')
  let date = day + '.' + month + '.' + year
  return date
}
