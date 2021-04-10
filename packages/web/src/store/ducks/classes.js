import { API, ApiActionCreator } from '../helpers';

export const GET_CLASSES = ApiActionCreator('auth/GET_CLASSES');

const DEFAULT_STATE = {
  classes: [],
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_CLASSES.SUCCESS:
      return { ...state, classes: action.payload };
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
