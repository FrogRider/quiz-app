<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <h1 class="text text_mod">lorem</h1>
    <button @click="change">color</button>
    <div v-if="isLoading">loading...</div>
    <div v-else-if="questionsLeft > 0">
      <div
        v-show="index === currentQuestionNumber"
        v-for="(question, index) in randomizedQuestions"
        :key="question.questionId"
        class="question"
      >
        <p>{{`#${index + 1} ${question.questionText}`}}</p>
        <ol>
          <li v-for="answer in question.answers" :key="answer.answerId">
            {{ answer.answerText }}
            <button @click="answerQuestion(answer)">add</button>
          </li>
        </ol>
      </div>
    </div>
    <div v-else>
      quiz is over! <br>
      Your time: {{ getTimeTotal }} <br>
      you got {{ correctAnswers }} correct answers
      <button @click="restartQuiz">restart</button>
    </div>
  </div>
</template>

<!-- eslint-disable no-unused-vars -->

<script setup>
import useQuestionsStore from '@/store/questionsStore.js';
import { storeToRefs } from 'pinia';
import { computed, onMounted, watch, ref } from 'vue';

const color = ref('red');

const change = () => {
  color.value === 'red' ? color.value = "blue" : color.value = "red"
}

const questionsStore = useQuestionsStore();

const { randomizedQuestions, timeEnd, questionsLeft, getTimeTotal, isLoading } = storeToRefs(questionsStore);

const currentQuestionNumber = computed(() => {
  return questionsStore.currentQuestionNumber;
})
const answerQuestion = (elem) => {
  questionsStore.addUserQuestion(elem)
}

const correctAnswers = computed(() => {
  return questionsStore.correctAnswers.length;
})

const restartQuiz = () => {
  questionsStore.restartQuiz()
}

onMounted(async () => {
  await questionsStore.getQuestions();
  questionsStore.randomizeQuestions();
})

watch(questionsLeft, () => {
  if (questionsLeft.value == 0) timeEnd.value = performance.now();
})


</script>

<style scoped lang="scss">
.text {
  color: v-bind(color);
}
</style>