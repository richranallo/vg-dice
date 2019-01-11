const {roll} = require('./tools.js')
const _ = require('lodash')
let diePool = process.argv[2]
let iterations = process.argv[3]
let depth = process.argv[4] || 3
let countTemplate = {}
for(w=diePool; w>=2; w--){
	for(h=6; h>=2; h--){
		countTemplate[`${w} ☆ ${h}`] = 0
	}
}
let fullCount = _.clone(countTemplate)
let orderedCount = new Array(depth)
let whiffs = 0
for(d=0; d<depth; d++){
	orderedCount[d] = _.clone(countTemplate)
}
let allRolls = []
for(j=0; j<iterations; j++){
	allRolls.push(roll(diePool))
}
_.each(allRolls, r => {
	whiffs += _.isEmpty(r) ? 1 : 0
	_.each(r, v => {
		fullCount[v]++
	})
	for(d=0; d<depth; d++){
		if(!_.isUndefined(r[d])) orderedCount[d][r[d]]++
	}
})
console.log('whiffs', whiffs)
console.log('fullCount', fullCount)
console.log('orderedCount', orderedCount)