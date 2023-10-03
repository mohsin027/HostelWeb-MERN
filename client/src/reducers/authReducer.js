const initialState = {
  user: { login: null },
  userRefresh: false,
  hostelRefresh: false,
  adminRefresh: false,
  hostelAdmin: { login: null },
  admin: { login: null },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-USER":
      return {
        ...state,
        user: { login: action.payload.loggedIn, user: action.payload.user },
      };
    case "REFRESH-USER":
      return {
        ...state,
        userRefresh: !state.userRefresh,
      };
    case "SET-ADMIN":
      return {
        ...state,
        admin: { login: action.payload.loggedIn, admin: action.payload.admin },
      };
    case "REFRESH-ADMIN":
      return {
        ...state,
        adminRefresh: !state.adminRefresh,
      };
    case "SET-HOSTEL":
      return {
        ...state,
        hostel :{
          login: action.payload.loggedIn,
          hostel: action.payload.hostel,
        },
      };

    case "REFRESH-HOSTEL":
      return {
        ...state,
        hostelRefresh: !state.hostelRefresh,
      };
    default:
      return state;
  }
};

export default authReducer;
