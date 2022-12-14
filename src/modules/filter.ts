export function capitalize (value: any)
{
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function upperCase(value: any)
{
	if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
}

export function extract(value: any, len: number)
{
	if (!value) return ''
  value = value.toString()
  return value.substr(0, len).trim().concat('')
}

export function date(value: any)
{
	let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

	if (!value) return ''
  value = value.split('-')
	let month = parseInt(value[1]) - 1
  return `${months[month]} ${value[2]}, ${value[0]}`
}

export function age(value: any)
{  
  let age = 0,
  date = new Date(),
  month = date.getMonth(),
  year = date.getFullYear(),
  birth_year = value.split('-')[0],
  birth_month = value.split('-')[1]

  age = year - parseInt(birth_year)

  if (month <= parseInt(birth_month))
    age--

  return age
}