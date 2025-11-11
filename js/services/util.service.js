'use strict'

function makeId(length = 6) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var id = ''
    
	for (var i = 0; i < length; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return id
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomImg() {
    const imgs = [BLUE_IMG, RED_IMG, YELLOW_IMG]
    return imgs[getRandomInt(0, imgs.length - 1)]
}