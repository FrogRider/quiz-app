import { defineStore } from 'pinia'
import { shuffle } from '@/utils'

const useQuestionsStore = defineStore('questionsStore', {
	state: () => ({
		questions: [],
		randomizedQuestions: [],
		userAnswers: [],
		timeStart: null,
		timeEnd: null,
		isUserReady: false,
	}),
	getters: {
		correctAnswers(state) {
			return state.userAnswers.filter((answer) => answer.correct)
		},
		questionsLeft(state) {
			return state.randomizedQuestions.length - state.userAnswers.length
		},
		currentQuestionNumber(state) {
			return state.userAnswers.length
		},
		getTimeTotal(state) {
			const time = state.timeEnd - state.timeStart

			return new Date(time).toISOString().slice(11, 19)
		},
		getQuestionsAmount(state) {
			return state.questions.length
		},
	},
	actions: {
		setTimeStart() {
			this.timeStart = performance.now()
		},
		randomizeQuestions() {
			this.randomizedQuestions = shuffle(this?.questions)
			// this.timeStart = performance.now();
		},
		setQuestions(questions) {
			this.questions = questions
		},
		addUserQuestion(question) {
			this.userAnswers.push(question)
		},
		eraseData() {
			// this.questions = [];
			this.randomizedQuestions = []
			this.userAnswers = []
			this.timeStart = null
			this.timeEnd = null
		},
		restartQuiz() {
			this.userAnswers = []
			this.timeEnd = null
			this.randomizeQuestions()
		},
	},
})

export default useQuestionsStore
