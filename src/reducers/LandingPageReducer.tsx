interface stateType {
  counter: number;
}

interface actionType {
  type: string;
  payload: string;
}
const initialState = {
  counter: 1,
};
export default function LandingPageReducer(
  state: stateType = initialState,
  action: actionType
) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
