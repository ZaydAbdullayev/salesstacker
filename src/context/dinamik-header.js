export const reHeader = (state = 0, action) => {
  switch (action.type) {
    case "QR_P":
      return state + action.payload;
    case "QR_F":
      return 0;
    default:
      return state;
  }
};

export const acHeader = (payload) => ({ type: "QR_P", payload });
export const acFinish = (payload) => ({ type: "QR_F", payload });
