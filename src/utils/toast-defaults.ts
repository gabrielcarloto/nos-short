import type { ToastOptions } from "react-toastify";
import { Slide } from "react-toastify";

const opts: ToastOptions = {
  position: "bottom-center",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  transition: Slide,
};

export default opts;
