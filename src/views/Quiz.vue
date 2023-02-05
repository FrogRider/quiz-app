<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <div v-if="isQuizesLoading">loading...</div>
    <div v-else-if="questionsLeft > 0">
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
    <Final v-else v-if="!isQuizesLoading"/>
  </div>
</template>

<!-- eslint-disable no-unused-vars -->

<script setup>
import useQuestionsStore from "@/store/questionsStore.js";
import useQuizesStore from "@/store/quizesStore.js";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import Final from '@/components/FinalResult.vue';

const route = useRoute();

const idOfQuizToShow = computed(() => {
  return route.params.quizId;
});

const questionsStore = useQuestionsStore();
const quizesStore = useQuizesStore();

const {
  randomizedQuestions,
  timeEnd,
  questionsLeft,
  questions,
  currentQuestionNumber,
} = storeToRefs(questionsStore);
const { quizesList, isQuizesLoading } = storeToRefs(quizesStore);

const restartQuiz = () => {
  questionsStore.restartQuiz();
};

const answerQuestion = (elem) => {
  questionsStore.addUserQuestion(elem);
};

const questionsForQuiz = computed(() => {
  return quizesList.value.length ? quizesList.value.find((quiz) => quiz.key === idOfQuizToShow.value).quizQuestions : [];
});

watch(questionsLeft, () => {
  if (questionsLeft.value == 0) timeEnd.value = performance.now();
});

watch(questionsForQuiz, () => {
  restartQuiz();
  if (questionsForQuiz.value.length) {
    questions.value = questionsForQuiz.value;
    questionsStore.randomizeQuestions();
  }
}, {immediate: true})
</script>

<style scoped lang="scss"></style>
