<template>
	<div>
		<div class="pagination flex">
			<div
				@click="prev"
				class="pagination__page w-[50px] aspect-square bg-orangeviy cursor-pointer"
				:class="{
					'opacity-50 cursor-not-allowed': !hasPreviousPage || isQuizesLoading,
				}"
			>
				prev
			</div>
			<div
				@click="next()"
				class="pagination__page w-[50px] aspect-square bg-orangeviy cursor-pointer ml-[20px]"
				:class="{
					'opacity-50 cursor-not-allowed': !hasNextPage || isQuizesLoading,
				}"
			>
				next
			</div>
		</div>
		<span>page #{{ currentPage + 1 }}</span>
	</div>
</template>

<script setup>
	import useQuizesStore from '@/store/quizesStore.js'
	import { storeToRefs } from 'pinia'
	import { useRoute, useRouter } from 'vue-router'
	import { watch } from 'vue'

	const route = useRoute()
	const router = useRouter()

	const quizesStore = useQuizesStore()

	const { hasNextPage, hasPreviousPage, isQuizesLoading, currentPage } =
	storeToRefs(quizesStore)

	const next = () => {
		hasNextPage.value && !isQuizesLoading.value && quizesStore.getNextPage()
	}

	const prev = () => {
		hasPreviousPage.value &&
			!isQuizesLoading.value &&
			quizesStore.getPreviousPage()
	}

	watch(currentPage, () => {
		console.log(currentPage.value);
		router.push({name: 'home', params: {page: +currentPage.value + 1}})
	})
</script>

<style lang="scss" scoped></style>
