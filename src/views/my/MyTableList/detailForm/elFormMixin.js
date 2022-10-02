// import { getToken } from "@/utils/auth";
// import * as Api from "./api.js";

export default {
  props: {
    mode: {
      type: String,
      default: () => {
        return "view"; // ["view", "add", "update"]
      },
    },
  },
};
