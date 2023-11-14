import { defineStore } from 'pinia'
// import questionsBase from '@/questions.json';
import firebase from 'firebase'
import { timeout } from '@/utils'
import { QUIZES_PER_PAGE } from '@/utils/constants.js'

const useQuizesStore = defineStore('quizesStore', {
	state: () => ({
		quizesPerPage: QUIZES_PER_PAGE,
		currentPage: 0,
		quizesList: [],
		quizesIdsList: [],
		isQuizesLoading: false,
	}),
	getters: {
		getQuizesQuantity() {
			return this.quizesIdsList.length
		},

		hasNextPage() {
			return (
				this.getQuizesQuantity > (this.currentPage + 1) * this.quizesPerPage
			)
		},
		hasPreviousPage() {
			return this.currentPage > 0
		},
	},
	actions: {
		async getQuizes(startAfter = '') {
			console.log(startAfter)
			this.isQuizesLoading = true
			const quizesResponse = await firebase
				.database()
				.ref('quizes')
				.orderByKey()
				.startAfter(startAfter)
				.limitToFirst(QUIZES_PER_PAGE)
				.once('value')
			const quizesData = quizesResponse.val()
			console.log(quizesData)

			if (!quizesData) return []

			this.quizesList = Object.entries(quizesData).map((quiz) => {
				return {
					key: quiz[0],
					...quiz[1],
				}
			})
			await timeout(1000)
			this.isQuizesLoading = false
		},

		async getQuizesByPage(page) {
			console.log('GET FOR PAGE', page)
			const startAfter = this.quizesIdsList.at((page - 1) * QUIZES_PER_PAGE - 2)
			this.getQuizes(startAfter)
			// QUIZES_PER_PAGE
		},

		addQuiz(quiz) {
			this.quizesList.push(quiz)
			console.log(this.quizesList)
		},

		async getQuizesIds() {
			const quizKeysRef = await firebase
				.database()
				.ref('quizesIds')
				.once('value')
			const quizesIds = Object.values(quizKeysRef.val())
			this.quizesIdsList = quizesIds
		},

		addQuizId(id) {
			this.quizesIdsList.push(id)
		},

		async getNextPage() {
			await this.getQuizes(this.quizesList.at(-1).key)
			this.currentPage += 1
		},

		async getPreviousPage() {
			this.currentPage -= 1
			const previousPageStartFromId = this.currentPage * this.quizesPerPage - 1
			this.currentPage == 0
				? await this.getQuizes()
				: await this.getQuizes(this.quizesIdsList.at(previousPageStartFromId))
		},
	},
})

export default useQuizesStore
