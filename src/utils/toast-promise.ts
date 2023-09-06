import { toast } from "react-toastify";

import toastDefaults from "../utils/toast-defaults";

export type ToastID = ReturnType<typeof toast> | null;

export default {
  loading: (title: string) => {
    return toast<string>(title, {
      ...toastDefaults,
      isLoading: true,
    });
  },
  success: (title: string, id: ToastID) => {
    toast.update(id, {
      render: title,
      type: "success",
      autoClose: 5000,
      isLoading: false,
    });
  },
  error: (title: string, id: ToastID) => {
    toast.update(id, {
      render: title,
      type: "error",
      autoClose: 5000,
      isLoading: false,
    });
  },
};
