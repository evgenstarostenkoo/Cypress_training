// Random string
export const myRandomString = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Random 9 digits
export const myRandomDigits = () => {
  let text = "";
  let possible = "0123456789";
  for (let i = 0; i < 9; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
