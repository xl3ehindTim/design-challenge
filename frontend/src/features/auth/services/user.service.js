export function getUser() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user"));
  }

  return {};
}

export function setUser(user) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export function removeUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}
