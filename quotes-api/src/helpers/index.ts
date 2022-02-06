export const isEmpty = (str: string) => !str.length;

export const isValidEmailAddress = (email: string) => {
  const emailRGX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRGX.test(email);
};
