import { defineStore } from "pinia";
import Cookies from "js-cookie";
import router from "@/router";

const useAuthUser = defineStore("authUser", {
  state() {
    return {
      isAuth: false,
      user: {},
      errors: {},
    };
  },
  actions: {
    async getUser() {
      const token = Cookies.get("token");
      if (token) {
        const res = await fetch("/api/user", {
          headers: { authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          this.user = data;
          this.isAuth = true;
          router.push("/");
        }
      }
    },
    async authentication(apiRoute, formData) {
      const res = await fetch(`/api/${apiRoute}`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.user = data.user;
        Cookies.set("token", data.token, { expires: 0.00694 });
        this.isAuth = true;
        router.push("/");
      }
      return data;
    },
  },
});
export default useAuthUser;
