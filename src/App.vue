<template>
	<div class="bg-temnoFioletoviy text-bezheviy h-screen text-amber-950">
		<!-- <router-view v-if="!isQuizesLoading"/>
    <div v-else>idinahuiiiii</div> -->
		<router-view />
	</div>
</template>

<script setup>
	import { onBeforeMount } from 'vue'
	import useQuizesStore from '@/store/quizesStore.js'
	import { storeToRefs } from 'pinia'

	const quizesStore = useQuizesStore()

	// const { isQuizesLoading } = storeToRefs(quizesStore);

	onBeforeMount(async () => {
		await quizesStore.getQuizesIds()
		await quizesStore.getQuizes()
	})
	// import Quiz from "@/components/Quiz.vue";
</script>

<style lang="scss"></style>
