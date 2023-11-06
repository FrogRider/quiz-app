<template>
	<div class="result">
		quiz is over! <br />
		Your time: {{ getTimeTotal }} <br />
		you got {{ correctAnswers }} correct answers
		<p>
			<CustomButton @click="restartQuiz" type="custom" label="restart" />
		</p>
	</div>
</template>

<script setup>
	import CustomButton from '@/components/CustomButton.vue'
	import useQuestionsStore from '@/store/questionsStore.js'
	import { storeToRefs } from 'pinia'
	import { computed } from 'vue'

	const questionsStore = useQuestionsStore()

	const { getTimeTotal } = storeToRefs(questionsStore)

	const correctAnswers = computed(() => {
		return questionsStore.correctAnswers.length
	})

	const restartQuiz = () => {
		questionsStore.eraseData()
		questionsStore.isUserReady = false
	}
</script>

<style lang="scss" scoped></style>
