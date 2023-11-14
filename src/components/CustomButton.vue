<template>
	<div role="button" class="button bg-orangeviy pointer" @click="handleClick">
		{{ props.label }}
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'
	import { useRouter } from 'vue-router'
	import useQuizesStore from '@/store/quizesStore.js'
	import { storeToRefs } from 'pinia'

	const router = useRouter()

	const props = defineProps({
		label: {
			required: true,
			default: 'button',
		},
		type: {
			required: false,
			default: 'home',
		},
	})

	const quizesStore = useQuizesStore()

	const { currentPage } = storeToRefs(quizesStore)

	const goHome = () => {
		console.log(+currentPage.value + 1);
		router.push({ name: 'home', params: { page: +currentPage.value + 1 } })
	}

	const handleClick = () => {
		switch (props.type) {
			case 'home':
				goHome()
				break

			default:
				console.error(`there is no ${props.type} in button types`)
				break
		}
	}
</script>

<style lang="scss" scoped>
	.button {
		padding: 5px 10px;
		border-radius: 5px;
		display: inline-block;
	}
</style>
