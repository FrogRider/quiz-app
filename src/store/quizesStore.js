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
			this.isQuizesLoading = true
			const quizesResponse = await firebase
				.database()
				.ref('quizes')
				.orderByKey()
				.startAfter(startAfter)
				.limitToFirst(QUIZES_PER_PAGE)
				.once('value')
			const quizesData = quizesResponse.val()

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
			console.log(quizesIds)
			this.quizesIdsList = quizesIds
		},

		addQuizId(id) {
			this.quizesIdsList.push(id)
		},

		async getNextPage() {
			console.log('page next')
			await this.getQuizes(this.quizesList.at(-1).key)
			this.currentPage += 1
		},

		async getPreviousPage() {
			console.log('page prev')
			this.currentPage -= 1
			this.currentPage == 0
				? await this.getQuizes()
				: await this.getQuizes(
						this.quizesIdsList.at(this.currentPage * this.quizesPerPage - 1)
				  )
			// TODO: implement logic to select last element's id from current page - 1 or "" if we are on the secod page
		},
	},
})

export default useQuizesStore
