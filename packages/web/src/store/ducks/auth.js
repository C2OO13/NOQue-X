import { API, ApiActionCreator } from '../helpers';

export const CHECK_AUTH = ApiActionCreator('auth/CHECK_AUTH');

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
};

// Reducer - default export
const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHECK_AUTH.SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};
export default reducer;

// side effects
export const checkAuth = () => ({
  type: API,
  payload: {
    method: 'GET',
    url: '/api/auth/check-auth',
    formData: null,
  },
  onRequest: CHECK_AUTH.REQUEST,
  onSuccess: CHECK_AUTH.SUCCESS,
  onFailure: CHECK_AUTH.FAILURE,
});
