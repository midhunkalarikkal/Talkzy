import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useHomeStore = create((set) => ({
  homeScrollerDataLoading: false,
  
  storyUploaderOpen: false,
  storyUploading: false,
  myStory: null,
  usersStories: null,

  getHomePostScrollerData: async () => {
    set({ homeScrollerDataLoading: true });
    try {
      const res = await axiosInstance.get("/user/getHomseSrollerData");
      return res.data.posts;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ homeScrollerDataLoading: false });
    }
  },

  setStoryUploaderOpen: (data) => set({ storyUploaderOpen: data }),

  setStoryUploading: (data) => set({ storyUploading: data }),

  uploadStory: async (data) => {
    try {
      set({ storyUploading: true });
      const res = await axiosInstance.post("/story/uploadStory", data);
      set({ myStory: res.data.story });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ storyUploading: false });
    }
  },

  getStories: async () => {
    try {
      const res = await axiosInstance("/story/getStories");
      set({ usersStories: res.data.stories });
      set({ myStory: res.data.myStory });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
