const initialState = {
    adminSidebarOpen:false,
    hostelSidebarOpen:false,
    searchQuery:"",
    // userHostelData:""
    hostels:""
  };
  
  const commonReducer = (state = initialState, action) => {
    switch (action.type) {
      case "TOGGLE-ADMIN-SIDEBAR": 
        return {
          ...state,
         adminSidebarOpen:!state.adminSidebarOpen
        }
      case "TOGGLE-HOSTEL-SIDEBAR": 
        return {
          ...state,
          hostelSidebarOpen:!state.hostelSidebarOpen
        }
      case "SET-SEARCH-QUERY": 
        return {
          ...state,
         searchQuery:action.payload
        }
      case "SET-HOSTEL-DATA": 
        return {
          ...state,
         hostels:{hostels:action.payload}
        }
        default: {
          return state
        }

  };
}
  
  export default commonReducer;
  