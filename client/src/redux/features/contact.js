const inttialState = {
  items: [],
  search: "",
  loading: false,
  editing: false,
  error: null,
  token: localStorage.getItem("token"),
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
        loading: false,
      };
    }
    case "user/login/fulfilled":
      return {
        ...state,
        token: action.payload.token,
        loading: false,
      };

    case "token/remove":
      return {
        ...state,
        token: null,
      };
    case "contacts/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "contacts/load/rejected":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "contacts/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case "add/contact/pending":
      return {
        ...state,
        loading: true,
      };
    case "add/contact/ rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "add/contact/fulfilled":
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case "edit/contact/pending":
      return {
        ...state,
        editing: true,
      };
    case "edit/contact/rejected":
      return {
        ...state,
        editing: false,
        error: action.error,
      };
    case "edit/contact/fulfilled":
      return {
        ...state,
        items: state.items.map((contact) => {
          if (contact._id === action.payload.contactId) {
            return {
              ...contact,
              ...action.payload.data,
            };
          }

          return contact;
        }),
        editing: false,
      };
    case "delete/cotact/pending":
      return {
        ...state,
        deleting: true,
      };
    case "delete/contact/rejected":
      return {
        ...state,
        deleting: false,
        error: action.payload,
      };
    case "delete/contact/fulfilled":
      return {
        ...state,
        items: state.items.filter((contact) => contact._id !== action.payload),
        deleting: false,
      };

    case "search/contact":
      return {
        ...state,
        search: action.payload,
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
          payload: json,
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

export const loadContacts = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "contacts/load/pending" });
    try {
      const response = await fetch("/getContacts", {
        headers: {
          Authorization: `Bearer ${state.contacts.token}`,
        },
      });
      const json = await response.json();
      if (json.status === "error") {
        dispatch({
          type: "contacts/load/rejected",
          error: json.message,
        });
      } else {
        dispatch({
          type: "contacts/load/fulfilled",
          payload: json,
        });
      }
    } catch (e) {
      dispatch({ type: "contacts/load/rejected", error: e.toString() });
    }
  };
};

export const addContact = (contact) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const responce = await fetch("/addContact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.contacts.token}`,
        },
        body: JSON.stringify(contact),
      });

      const json = await responce.json();

      if (json.status === "error") {
        dispatch({ type: "add/contact/rejected", error: json.message });
      } else {
        dispatch({
          type: "add/contact/fulfilled",
          payload: json.contact,
        });
      }
    } catch (e) {
      dispatch({ type: "add/contact/rejected", error: e.toString() });
    }
  };
};

export const editContact = (contactId, data) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "edit/contact/pending" });
    try {
      const response = await fetch(`/editContact/${contactId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.contacts.token}`,
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.status === "error") {
        dispatch({
          type: "edit/contact/rejected",
          error: json.message,
        });
      } else {
        dispatch({
          type: "edit/contact/fulfilled",
          payload: { contactId, data },
        });
      }
    } catch (e) {
      dispatch({
        type: "edit/contact/rejected",
        error: e.toString(),
      });
    }
  };
};

export const deleteContact = (contactId) => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({ type: "delete/contact/pending" });
    try {
      const response = await fetch(`/deleteContact/${contactId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.contacts.token}`,
        },
      });
      const json = await response.json();
      if (json.status === "error") {
        dispatch({ type: "delete/contact/rejected", error: json.message });
      } else {
        dispatch({ type: "delete/contact/fulfilled", payload: contactId });
      }
    } catch (e) {
      dispatch({ type: "delete/contact/rejected", error: e.toString });
    }
  };
};
