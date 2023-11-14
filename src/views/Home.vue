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
	import { QUIZES_PER_PAGE } from '@/utils/constants.js'
	import QuizLabel from '@/components/QuizLabel.vue'
	import Loader from '@/components/Loader.vue'
	import QuizesPagination from '@/components/QuizesPagination.vue'
	import { useRoute, useRouter } from 'vue-router'
	import { onMounted } from 'vue'

	const route = useRoute()
	const router = useRouter()

	const quizesStore = useQuizesStore()

	const { quizesList, isQuizesLoading, quizesIdsList, currentPage } = storeToRefs(quizesStore)

	onMounted(() => {
		const pageFromParams = Number(route.params.page || 1)
		const maximumAmountOfPages = Math.ceil(quizesIdsList.value.length / QUIZES_PER_PAGE)
		console.log({pageFromParams, maximumAmountOfPages});
		if (pageFromParams <= maximumAmountOfPages && pageFromParams != 1) {
			// router.push({name: 'home', params: {page: pageFromParams + 1}})
			quizesStore.getQuizesByPage(route.params.page)
			currentPage.value = route.params.page
		}
		// console.log(router);
	})

	// import Quiz from "@/components/Quiz.vue";
</script>
