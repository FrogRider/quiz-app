<template>
	<div role="button" class="button bg-orangeviy pointer" @click="handleClick">
		{{ props.label }}
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'
	import { useRouter } from 'vue-router'

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

	const goHome = () => {
		router.push({ name: 'home' })
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
