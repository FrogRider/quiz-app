<template>
  <div class="result">
    quiz is over! <br />
    Your time: {{ getTimeTotal }} <br />
    you got {{ correctAnswers }} correct answers
    <button @click="restartQuiz">restart</button>
  </div>
</template>

<script setup>
import useQuestionsStore from "@/store/questionsStore.js";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const questionsStore = useQuestionsStore();

const {
  getTimeTotal,
} = storeToRefs(questionsStore);

const correctAnswers = computed(() => {
  return questionsStore.correctAnswers.length;
});

const restartQuiz = () => {
  questionsStore.restartQuiz();
};
</script>

<style lang="scss" scoped></style>
