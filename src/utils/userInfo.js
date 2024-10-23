export function userLoggedIn() {
  return Date.now() < localStorage.getItem("currentTokenExpires") * 1000;
}

export function userLogOut() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentToken");
  localStorage.removeItem("currentTokenExpires");
  location.reload();
}
