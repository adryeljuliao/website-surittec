export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const userType = localStorage.getItem('userType');
  if (user && userType) {
    return { user_id: user, user_type: userType };
  }
  return null;
};
