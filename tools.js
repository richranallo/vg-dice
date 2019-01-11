const _ = require('lodash')

let die = () => _.random(1,6)

let roll = (pool) => {
	let res = []
	for(i=0; i<pool; i++) {
		res.push(die())
	}
	return _.chain(res)
		.thru(takeOnes)
		.thru(formSets)
		.thru(sort)
		.thru(_.reverse)
		.value()
}

let sort = (r) => {
	return _.sortBy(r)
}

let takeOnes = (r) => {
	return _.filter(r, v => v>1)
}

let formSets = (r) => {
	let heights = _.uniq(r)
	return _.chain(heights)
		.map(h => `${r.filter(v => v===h).length} ☆ ${h}`)
		.filter(s => s[0] !== '1')
		.value()
}

module.exports = {
	die,
	roll,

}