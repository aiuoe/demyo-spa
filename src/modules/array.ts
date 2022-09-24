interface Array<T>
{
	upsert(item: any): any
	delete(id: number): any
	orderBy(params: any): any
	where(key: string, operator: string, value: string): any
	get(id: number): any
	paginate(page: number, max: number): any
	next(id: number): any
	previous(id: number): any
}

Array.prototype.upsert = function (item: any): any
{
	if (!!this.find((i: any) => i.id == item.id))
		return this.splice(this.findIndex((i: any) => i.id == item.id), 1, item)
	else
		return this.push(item)
}

Array.prototype.delete = function (id: number): any
{
	return this.splice(this.findIndex((item: any) => item.id == id ), 1)
}

Array.prototype.orderBy = function (params: any): any
{
	Object.entries(params).map((p: any) => {
		const [key, value] = p

		if (value == 'asc')
			return this.sort((a, b) => (b[key] < a[key])? 1 : -1)
		else if (value == 'desc')
			return this.sort((a, b) => (b[key] > a[key])? 1 : -1)
	})
}

Array.prototype.where = function (key: string, operator: string, value: string)
{
	switch(operator)
	{
		case '==':
			return this.filter((i: any) => i[key] == value)
		break
		case '!=':
			return this.filter((i: any) => i[key] != value)
		break
		case '>=':
			return this.filter((i: any) => i[key] >= value)
		break
		case '<=':
			return this.filter((i: any) => i[key] <= value)
		break
    case '<':
      return this.filter((i: any) => i[key] < value)
    break
    case '>':
      return this.filter((i: any) => i[key] > value)
    break
	}
}

Array.prototype.get = function (id: number): any
{
	return this[this.findIndex((i: any) => i.id == id)]
}

Array.prototype.paginate = function (page: number, max: number = 5): any
{
	let index = (page - 1) * max
	let last = (Math.round(this.length / max) - 1) * max
	if (index < this.length)
		return this.slice(index, index + max)
	else
		return this.slice(last, index + max)	
}

Array.prototype.next = function (id: number): any
{ 
	let index = this.findIndex(i => i.id == id)
	return this[index + 1] 
}

Array.prototype.previous = function (id: number): any
{ 
	let index = this.findIndex(i => i.id == id)
	return this[index - 1] 
}

// search(keyword: string)
// {
//   this.heroes = this.heroes
//   .filter((i: any) => Object.keys(i).filter((p: any) => i[p].toString().includes(keyword)).length)
// }