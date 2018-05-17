const initialState = {
  paper: 15,
  ink: 120
};
const CHANGE_PRICE = "CHANGE_PRICE";
export function changePrice(price) {
  return {
    type: CHANGE_PRICE,
    payload: price
  };
}
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PRICE:
      return {
        ...state,
        price: action.payload
      };
    default:
      return state;
  }
}
