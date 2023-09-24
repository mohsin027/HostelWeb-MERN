

export const login = (token) => {
    return {
      type: 'LOGIN',
      token,
    };
  };
  
  export const logout = () => {
    console.log('lllo');
    return {
      type: 'LOGOUT',
    };
  };
  