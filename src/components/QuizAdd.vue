<template>
	<div>
		<input type="" v-model="quizId" />
		<button @click="add">add</button>
	</div>
</template>

<!-- eslint-disable no-unused-vars -->

<script setup>
	import useQuestionsStore from '@/store/questionsStore.js'
	import useQuizesStore from '@/store/quizesStore.js'
	import { storeToRefs } from 'pinia'
	import { ref, computed } from 'vue'
	import { QUIZES_PER_PAGE } from '@/utils/constants.js'
	import firebase from 'firebase'

	const quizesStore = useQuizesStore()
	
	const { quizesIdsList } = storeToRefs(quizesStore)

	const quizId = ref(1)

	const add = async () => {
		// console.log(getQuiz.value)
		const newQuiz = await firebase.database().ref('quizes').push(getQuiz.value)
		await firebase.database().ref('quizesIds').push(newQuiz.key)
		if (quizesIdsList.value.length < QUIZES_PER_PAGE || quizesIdsList.value.length == 0) {
			quizesStore.addQuiz({ ...getQuiz.value, key: newQuiz.key })
		}
		quizesStore.addQuizId(newQuiz.key)
		// console.log({ ...getQuiz.value, key: newQuiz.key })
		// quizesStore.addQuiz({ ...getQuiz.value, key: newQuiz.key })
		// quizesStore.addQuiz(1111)
		// console.log(result.key)
	}

	const getQuiz = computed(() => {
		return {
			quizName: `quiz${quizId.value} name`,
			quizQuestions: [
				{
					questionText: `quiz${quizId.value} first question`,
					questionId: 1,
					answers: [
						{
							answerId: 1,
							answerText: `quiz${quizId.value} question1 answer1`,
							correct: false,
						},
						{
							answerId: 2,
							answerText: `quiz${quizId.value} question1 answer2`,
							correct: true,
						},
						{
							answerId: 3,
							answerText: `quiz${quizId.value} question1 answer3`,
							correct: false,
						},
						{
							answerId: 4,
							answerText: `quiz${quizId.value} question1 answer4`,
							correct: false,
						},
					],
				},
				{
					questionText: `quiz${quizId.value} second question`,
					questionId: 2,
					answers: [
						{
							answerId: 1,
							answerText: `quiz${quizId.value} question2 answer1`,
							correct: false,
						},
						{
							answerId: 2,
							answerText: `quiz${quizId.value} question2 answer2`,
							correct: true,
						},
						{
							answerId: 3,
							answerText: `quiz${quizId.value} question2 answer3`,
							correct: false,
						},
						{
							answerId: 4,
							answerText: `quiz${quizId.value} question2 answer4`,
							correct: false,
						},
					],
				},
				{
					questionText: `quiz${quizId.value} third question`,
					questionId: 3,
					answers: [
						{
							answerId: 1,
							answerText: `quiz${quizId.value} question3 answer1`,
							correct: false,
						},
						{
							answerId: 2,
							answerText: `quiz${quizId.value} question3 answer2`,
							correct: true,
						},
						{
							answerId: 3,
							answerText: `quiz${quizId.value} question3 answer3`,
							correct: false,
						},
						{
							answerId: 4,
							answerText: `quiz${quizId.value} question3 answer4`,
							correct: false,
						},
					],
				},
				{
					questionText: `quiz${quizId.value} fourth question`,
					questionId: 4,
					answers: [
						{
							answerId: 1,
							answerText: `quiz${quizId.value} question4 answer1`,
							correct: false,
						},
						{
							answerId: 2,
							answerText: `quiz${quizId.value} question4 answer2`,
							correct: true,
						},
						{
							answerId: 3,
							answerText: `quiz${quizId.value} question4 answer3`,
							correct: false,
						},
						{
							answerId: 4,
							answerText: `quiz${quizId.value} question4 answer4`,
							correct: false,
						},
					],
				},
			],
		}
	})
</script>

<style scoped lang="scss">
	input {
		color: #000;
	}
</style>
