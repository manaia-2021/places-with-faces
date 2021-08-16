const request = require('supertest')
const cheerio = require('cheerio')
const server = require('./server')

test('working', () => {
	expect(1 + 2).toBe(3)
})

test('GET / returns home page with list of places', (done) => {
	request(server)
		.get('/')
		.expect(200)
		.end((err, res) => {
			const $ = cheerio.load(res.text)
			const placeElems = $('img')
			expect(placeElems).not.toBeNull()
			expect(err).toBeNull()
			done()
		})
})

test('GET /places/:id returns details of a specific place', (done) => {
	request(server)
		.get('/places/1')
		.expect(200)
		.end((err, res) => {
			const $ = cheerio.load(res.text)
			const placeName = $('h2').text()
			expect(placeName).toMatch('Milford')
			expect(err).toBeNull()
			done()
		})
})
