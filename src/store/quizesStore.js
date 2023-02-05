import { defineStore } from 'pinia';
// import questionsBase from '@/questions.json';
import firebase from 'firebase';
import { timeout } from '@/utils';

const useQuizesStore = defineStore('quizesStore', {
  state: () => ({
    quizesList: [],
    isQuizesLoading: false,
  }),
  getters: {
  },
  actions: {
    async getQuizes() {
      this.isQuizesLoading = true;
      const quizesResponse = await firebase.database().ref('quizes').once('value');
      const quizesData = quizesResponse.val();
      if(!quizesData) return [];
      // console.log(quizesData);
      this.quizesList = Object.entries(quizesData).map(quiz => {
        return {
          key: quiz[0],
          ...quiz[1]
        }
      });
      timeout(1000);
      this.isQuizesLoading = false;

    }
  },
});

export default useQuizesStore;