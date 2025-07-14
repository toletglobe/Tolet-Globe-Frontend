export const initialState = {
  compareProperty: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_COMPARE":
      return {
        ...state,
        compareProperty: [...state.compareProperty, action.item],
      };

    case "REMOVE_FROM_COMPARE":
      return {
        ...state,
        compareProperty: state.compareProperty.filter(
          (item) => item._id !== action.item._id
        ),
      };

    case "CLEAR_COMPARE":
      return {
        ...state,
        compareProperty: [],
      };

    default:
      return state;
  }
};
