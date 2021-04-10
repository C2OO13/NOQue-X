import { API, ApiActionCreator } from '../helpers';

export const GET_CLASSES = ApiActionCreator('auth/GET_CLASSES');
export const GET_STUDENTS = ApiActionCreator('auth/GET_STUDENTS');

const DEFAULT_STATE = {
  classes: [],
  students: [],
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_CLASSES.SUCCESS:
      return { ...state, classes: action.payload };
    case GET_STUDENTS.SUCCESS:
      return { ...state, students: action.payload };
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
