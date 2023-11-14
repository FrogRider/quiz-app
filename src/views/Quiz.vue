<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
	<div>
		<StartQuiz v-if="isStage('start')" />
		<Question v-if="isStage('inProgress')" />
		<Final v-if="isStage('finish')" />
		<p>Current stage: {{ currentStage }}</p>
		<CustomButton label="Back to menu" />
	</div>
</template>

<!-- eslint-disable no-unused-vars -->

<script setup>
	import useQuestionsStore from '@/store/questionsStore.js'
	import useQuizesStore from '@/store/quizesStore.js'
	import { storeToRefs } from 'pinia'
	import { computed, watch, onBeforeUnmount, reactive } from 'vue'
	import { useRoute } from 'vue-router'
	import Final from '@/components/FinalResult.vue'
	import StartQuiz from '@/components/StartQuiz.vue'
	import Question from '@/components/Question.vue'
	import CustomButton from '@/components/CustomButton.vue'

	const route = useRoute()

	const idOfQuizToShow = computed(() => {
		return route.params.quizId
	})

	const questionsStore = useQuestionsStore()
	const quizesStore = useQuizesStore()

	const { timeEnd, questionsLeft, questions, isUserReady } =
		storeToRefs(questionsStore)
	const { quizesList, isQuizesLoading } = storeToRefs(quizesStore)

	const stages = reactive([
		{
			name: 'start',
			condition: () => {
				return !isUserReady.value
			},
		},
		{
			name: 'inProgress',
			condition: () => {
				return isUserReady.value && questionsLeft.value > 0
			},
		},
		{
			name: 'finish',
			condition: () => {
				return (
					isUserReady.value &&
					questionsLeft.value == 0 &&
					!isQuizesLoading.value
				)
			},
		},
	])

	const currentStage = computed(() => {
		return stages.reverse().find((stage) => stage.condition()).name
		// return stages;
	})

	const isStage = (stage) => {
		return currentStage.value === stage
	}

	const questionsForQuiz = computed(() => {
		return quizesList.value.length
			? quizesList.value.find((quiz) => quiz.key === idOfQuizToShow.value)
					.quizQuestions
			: []
	})

	watch(questionsLeft, () => {
		if (questionsLeft.value == 0) {
			timeEnd.value = performance.now()
		}
	})

	watch(
		questionsForQuiz,
		() => {
			if (questionsForQuiz.value.length) {
				questions.value = questionsForQuiz.value
			}
		},
		{ immediate: true }
	)

	onBeforeUnmount(() => {
		questionsStore.eraseData()
		questionsStore.isUserReady = false
	})
</script>

<style scoped lang="scss"></style>
