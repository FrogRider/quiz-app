<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
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
import firebase from 'firebase';

//  await firebase.database().ref('users').push(user);
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
  const newQuiz = {
    'quiz3 name': [
  {
    "questionText": "quiz3 first question",
    "questionId": 1,
    "answers": [
      {
        "answerId": 1,
        "answerText": "quiz3 one1",
        "correct": false
      },
      {
        "answerId": 2,
        "answerText": "quiz3 two1",
        "correct": true
      },
      {
        "answerId": 3,
        "answerText": "quiz3 three1",
        "correct": false
      },
      {
        "answerId": 4,
        "answerText": "quiz3 four1",
        "correct": false
      }
    ]
  },
  {
    "questionText": "quiz3 second question",
    "questionId": 2,
    "answers": [
      {
        "answerId": 1,
        "answerText": "quiz3 one2",
        "correct": false
      },
      {
        "answerId": 2,
        "answerText": "quiz3 two2",
        "correct": true
      },
      {
        "answerId": 3,
        "answerText": "quiz3 three2",
        "correct": false
      },
      {
        "answerId": 4,
        "answerText": "quiz3 four2",
        "correct": false
      }
    ]
  },
  {
    "questionText": "quiz3 third question",
    "questionId": 3,
    "answers": [
      {
        "answerId": 1,
        "answerText": "quiz3 one3",
        "correct": false
      },
      {
        "answerId": 2,
        "answerText": "quiz3 two3",
        "correct": true
      },
      {
        "answerId": 3,
        "answerText": "quiz3 three3",
        "correct": false
      },
      {
        "answerId": 4,
        "answerText": "quiz3 four3",
        "correct": false
      }
    ]
  },
  {
    "questionText": "quiz3 fourth question",
    "questionId": 4,
    "answers": [
      {
        "answerId": 1,
        "answerText": "quiz3 one4",
        "correct": false
      },
      {
        "answerId": 2,
        "answerText": "quiz3 two4",
        "correct": true
      },
      {
        "answerId": 3,
        "answerText": "quiz3 three4",
        "correct": false
      },
      {
        "answerId": 4,
        "answerText": "quiz3 four4",
        "correct": false
      }
    ]
  }
]
  }
  // await firebase.database().ref('quizes').push(newQuiz);
})

watch(questionsLeft, () => {
  if (questionsLeft.value == 0) timeEnd.value = performance.now();
})


</script>

<style scoped lang="scss">

</style>