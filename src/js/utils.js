export function parseQrString (str) {
  const params = str.split('&')

  const date = getDate(params[0].split('t=')[1])
  const summa = params[1].split('s=')[1]
  const fn = params[2].split('fn=')[1]
  const i = params[3].split('i=')[1]
  const fp = params[4].split('fp=')[1]
  const qr = str

  return {
    date,
    summa,
    fn,
    i,
    fp,
    qr
  }
}

export function parseDateForSend (strDate) {
  const params = strDate.split('.')

  const day = params[0]
  const month = params[1]
  const year = params[2]

  return `${year}-${month}-${day}`
}

export function getDatesPromo (start, end) {
  return {
    start: parseDateForValid(start),
    end: parseDateForValid(end)
  }
}

export function phoneForSend (phone) {
  return ``
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

function parseDateForValid (strDate) {
  const date = strDate.split(' ')
  const parseDate = date[0].split('-')

  const day = parseDate[2]
  const month = parseDate[1]
  const year = parseDate[0]

  return new Date(year, month - 1, day)
}
