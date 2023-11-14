<template>
	<div class="bg-temnoFioletoviy text-bezheviy h-screen text-amber-950">
		<!-- <router-view v-if="!isQuizesLoading"/>
    <div v-else>idinahuiiiii</div> -->
		<router-view v-if="isDataReady" />
	</div>
</template>

<script setup>
	import { onBeforeMount, onMounted, ref } from 'vue'
	import useQuizesStore from '@/store/quizesStore.js'
	import { storeToRefs } from 'pinia'

	const quizesStore = useQuizesStore()

	const isDataReady = ref(false)

	// const { isQuizesLoading } = storeToRefs(quizesStore);

	onMounted(async () => {
		await quizesStore.getQuizesIds()
		await quizesStore.getQuizes()
		isDataReady.value = true
	})
	// import Quiz from "@/components/Quiz.vue";
</script>

<style lang="scss"></style>
