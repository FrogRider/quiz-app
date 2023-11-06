<template>
	<div class="getReady" v-if="!isUserReady">
		get ready <br />
		<p>Questions amount: {{ getQuestionsAmount }}</p>
		<CustomButton label="Start" type="custom" @click="startQuiz" />
	</div>
</template>

<script setup>
	import CustomButton from '@/components/CustomButton.vue'
	import useQuestionsStore from '@/store/questionsStore.js'
	import { storeToRefs } from 'pinia'

	const questionsStore = useQuestionsStore()

	const { isUserReady, getQuestionsAmount } = storeToRefs(questionsStore)

	const startQuiz = () => {
		questionsStore.restartQuiz()
		questionsStore.setTimeStart()
		isUserReady.value = true
	}
</script>

<style lang="scss" scoped></style>
