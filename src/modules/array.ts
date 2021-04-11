interface Array<T>
{
	upsert(item: any): any
	delete(id: number): any
	orderBy(params: any): any
	where(key: string, operator: string, value: string): any
	get(id: number): any
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