<template>
  <div class="home">
    home
    <!-- <div v-for="quiz in quizesList" :key="quiz.key"></div> -->
    <QuizLabel v-for="quiz in quizesList" :key="quiz.key" :quiz="quiz" />

    <!-- <Quiz /> -->
  </div>
</template>

<script setup>
import useQuizesStore from "@/store/quizesStore.js";
import { storeToRefs } from "pinia";
import QuizLabel from "@/components/QuizLabel.vue";

const quizesStore = useQuizesStore();

const { quizesList } = storeToRefs(quizesStore);


// import Quiz from "@/components/Quiz.vue";
</script>
