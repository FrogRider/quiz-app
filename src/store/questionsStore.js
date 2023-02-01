import { defineStore } from 'pinia';
// import questionsBase from '@/questions.json';
import firebase from 'firebase';
import { shuffle, timeout } from '@/utils';

const useQuestionsStore = defineStore('questionsStore', {
  state: () => ({
    isLoading: false,
    questions: [],
    randomizedQuestions: [],
    userAnswers: [],
    timeStart: null,
    timeEnd: null,
  }),
  getters: {
    correctAnswers(state) {
      return state.userAnswers.filter(answer => answer.correct);
    },
    questionsLeft(state) {
      return state.randomizedQuestions.length - state.userAnswers.length;
    },
    currentQuestionNumber(state) {
      return state.userAnswers.length;
    },
    getTimeTotal(state) {
      const time =  state.timeEnd - state.timeStart;

      return new Date(time).toISOString().slice(11, 19)
    }
  },
  actions: {
    randomizeQuestions() {
      this.randomizedQuestions = shuffle(this.questions);
      this.timeStart = performance.now();
    },
    async getQuestions() {
      this.isLoading = true;
      const questionsResponse = await firebase.database().ref('questions').once('value');
      const questionsData = questionsResponse.val();
      const res = Object.entries(questionsData).map(question => {
        return {...question[1]}
      })
      this.questions = res;
      console.log(res);
      await timeout(1000);
      this.isLoading = false;
    },
    addUserQuestion(question) {
      this.userAnswers.push(question)
    },
    restartQuiz() {
      this.userAnswers = [];
      this.randomizeQuestions();
    }
  },
});

export default useQuestionsStore;
