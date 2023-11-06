<template>
	<div class="home">
		<p
			class="text-orangeviy flex justify-center bg-fioletoviy p-[40px] text-4xl border-b-2 border-orangeviy"
		>
			Quiz App
		</p>
		<!-- <div v-for="quiz in quizesList" :key="quiz.key"></div> -->
		<Loader v-if="isQuizesLoading" />
		<div v-else class="flex flex-col">
			<QuizLabel v-for="quiz in quizesList" :key="quiz.key" :quiz="quiz" />
		</div>
		<QuizesPagination />
		<!-- <Quiz /> -->
	</div>
</template>

<script setup>
	import useQuizesStore from '@/store/quizesStore.js'
	import { storeToRefs } from 'pinia'
	import QuizLabel from '@/components/QuizLabel.vue'
	import Loader from '@/components/Loader.vue'
	import QuizesPagination from '@/components/QuizesPagination.vue'

	const quizesStore = useQuizesStore()

	const { quizesList, isQuizesLoading } = storeToRefs(quizesStore)

	// import Quiz from "@/components/Quiz.vue";
</script>
