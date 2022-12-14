const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const getDay = (date) => date.getDate()

const getMonth = (date) => months[date.getMonth()]

const getYear = (date) => date.getFullYear()

const dayOfWeek = (date) => days[date.getDay()]

const getDateParsered = (date) => {
  const myDate = new Date(date)
  return {
    day: getDay(myDate),
    month: getMonth(myDate),
    year: getYear(myDate),
    dayOfWeek: dayOfWeek(myDate),
  }
}

export default getDateParsered
