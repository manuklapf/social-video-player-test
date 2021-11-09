import { defineStore } from "pinia";
import User from "@/models/user";
import axios from "axios";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    user: {} as User,
  }),
  actions: {
    async getUser(): Promise<User> {
      return await new Promise((resolve, reject) => {
        axios.get("/api/user").then(
          (response) => {
            const user = response.data.data as User;
            this.user = user;
            resolve(user);
          },
          (e) => {
            reject(e);
            console.error(e);
          }
        );
      });
    },

    async setFirstTimeDrawingToFalse(): Promise<boolean> {
      return await new Promise((resolve, reject) => {
        axios.put("/api/user/firstTimeDrawing").then(
          (response) => {
            const status = response.data.data as boolean;
            this.user.first_time_drawing = false;
            resolve(status);
          },
          (e) => {
            reject(e);
            console.error(e);
          }
        );
      });
    },
  },
});
