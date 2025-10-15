export const validateUsername = (username) => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters long";
  if (username.length > 20) return "Username must be less than 20 characters";
  if (!/^[a-zA-Z0-9_]+$/.test(username))
    return "Username can only contain letters, numbers, and underscores";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (password.length > 50) return "Password must be less than 50 characters";
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password))
    return "Password must contain both uppercase and lowercase letters";
  if (!/(?=.*\d)/.test(password))
    return "Password must contain at least one number";
  if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password))
    return "Password must contain at least one special character";
  return "";
};

export const validateForm = (
  username,
  password,
  usernameError,
  passwordError
) => {
  usernameError.value = validateUsername(username.value);
  passwordError.value = validatePassword(password.value);
  return !usernameError.value && !passwordError.value;
};
