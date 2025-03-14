import Cookies from "js-cookie";

class AuthUserHelper {
  saveLoginData(authData) {
    if (!authData) return;

    const token = authData.token || "";
    const user = authData.user || null;

    Cookies.set("access_token", token, {
      expires: 5, // 5 days
      secure: true,
      sameSite: "Strict",
    });

    localStorage.setItem("auth_user", JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem("auth_user");
    return user ? JSON.parse(user) : null;
  }

  getToken() {
    return Cookies.get("access_token") || null;
  }

  isAuthenticated() {
    return !!this.getToken() && !!this.getUser();
  }

  logout() {
    Cookies.remove("access_token");
    localStorage.removeItem("auth_user");
  }
}

export const AuthUser = new AuthUserHelper();
