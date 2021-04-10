import { API, ApiActionCreator } from '../helpers';

export const GET_CLASSES = ApiActionCreator('classes/GET_CLASSES');
export const GET_STUDENTS = ApiActionCreator('classes/GET_STUDENTS');
export const GET_QUESTIONS = ApiActionCreator('classes/GET_QUESTIONS');

const DEFAULT_STATE = {
  classes: [],
  students: [],
  questions: [],
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_CLASSES.SUCCESS:
      return { ...state, classes: action.payload };
    case GET_STUDENTS.SUCCESS:
      return { ...state, students: action.payload };
    case GET_QUESTIONS.SUCCESS:
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};
export default reducer;

// side effects
export const getClasses = () => ({
  type: API,
  payload: {
    method: 'GET',
    url: '/classes',
  },
  onRequest: GET_CLASSES.REQUEST,
  onSuccess: GET_CLASSES.SUCCESS,
  onFailure: GET_CLASSES.FAILURE,
});

export const getStudents = classId => ({
  type: API,
  payload: {
    method: 'GET',
    url: `/classes/${classId}/students`,
  },
  onRequest: GET_STUDENTS.REQUEST,
  onSuccess: GET_STUDENTS.SUCCESS,
  onFailure: GET_STUDENTS.FAILURE,
});

export const getQuestions = ({ classId, qdate }) => ({
  type: API,
  payload: {
    method: 'GET',
    url: `/questions/${classId}/stats/${qdate}`,
  },
  onRequest: GET_QUESTIONS.REQUEST,
  onSuccess: GET_QUESTIONS.SUCCESS,
  onFailure: GET_QUESTIONS.FAILURE,
});
