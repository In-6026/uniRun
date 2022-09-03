class Getdate {
	nextSevenDay() {
		let date = []
		let timeStamp = new Date().getTime()
		for (let i = 0; i < 7; i++) {
			date.push(
				new Date(timeStamp + i * 24 * 60 * 60 * 1000)
			)
		}
		return date
	}
	formDate() {
		const date = new Date()
		const detail = date.toString().split(' ')
		let month = date.getMonth() + 1
		month = month > 9 ? month : '0' + month
		return `${detail[3]}-${month}-${detail[2]} ${detail[4]}`
	}
}
export default new Getdate();
