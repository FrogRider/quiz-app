<template>
  <div @click="goToQuiz">
    {{ currentQuizName }}
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter();

const props = defineProps({
  quiz: {
    required: true,
  },
});

const currentQuizName = computed(() => {
  return props.quiz.quizName;
});

const goToQuiz = () => {
  router.push({ name: "quiz", params: { 'quizId': props.quiz.key } });
};
</script>

<style lang="scss" scoped></style>
