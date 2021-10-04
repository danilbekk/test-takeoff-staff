const inttialState = {
  loading: false,
  token: localStorage.getItem("token"),
  error: null,
};

export default function reducers(state = inttialState, action) {
  switch (action.type) {
    case "user/login/pending":
      return {
        ...state,
        loading: true,
      };
    case "user/login/rejected": {
      return {
        ...state,
        error: action.error,
        loading: false
      };
    }
    case "user/login/fulfilled":
      return {
        ...state,
        token: action.payload.token,
        loading: false
      };

    case "token/remove":
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}

export const authUser = (dataUser) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });

      const json = await response.json();

      if (json.status === "error") {
        dispatch({
          type: "user/load/rejected",
          error: json.message,
        });
      } else {
        dispatch({
          type: "user/login/fulfilled",
          payload: json
        });
        dispatch({
          type: "get/token",
          payload: json.token,
        });

        localStorage.setItem("token", json.token);
      }
    } catch (e) {
      dispatch({ type: "user/login/rejected", error: e.toString() });
    }
  };
};

export const tokenRemove = () => {
  localStorage.removeItem("token");

  return (dispatch) => {
    dispatch({
      type: "token/remove",
    });
  };
};
