<template>
  <div>
    <div
      v-show="index === currentQuestionNumber"
      v-for="(question, index) in randomizedQuestions"
      :key="question.questionId"
      class="question"
    >
      <p>{{ `#${index + 1} ${question.questionText}` }}</p>
      <ol>
        <li v-for="answer in question.answers" :key="answer.answerId">
          {{ answer.answerText }}
          <button @click="answerQuestion(answer)">add</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import useQuestionsStore from "@/store/questionsStore.js";
import { storeToRefs } from "pinia";

const questionsStore = useQuestionsStore();

const {
  randomizedQuestions,
  currentQuestionNumber,
} = storeToRefs(questionsStore);

const answerQuestion = (elem) => {
  questionsStore.addUserQuestion(elem);
};

</script>

<style lang="scss" scoped>

</style>