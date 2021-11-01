const loginUrl = "http://localhost:9889/api/auth/login";
const authProvider = {
  // authentication
  login: ({ username, password }) => {
    const request = new Request(loginUrl, {
      method: "POST",
      body: JSON.stringify({ email: username, password: password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        console.log(response);

        return response.json();
      })
      .then((auth) => {
        if (!auth.data.isAdmin) {
          throw new Error("You must be an admin");
        }
        return auth;
      })
      .then((auth) => {
        localStorage.setItem(
          "auth",
          JSON.stringify({ token: auth.token, fullName: auth.data.name })
        );
        localStorage.setItem("permissions", "admin");
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  checkError: (error) => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "login required" }),
  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  getIdentity: () => Promise.resolve(),
  // authorization
  getPermissions: () => {
    const role = localStorage.getItem("permissions");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
