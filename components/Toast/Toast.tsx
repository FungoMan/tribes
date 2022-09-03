import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (props) => {
  return (
    <ToastContainer
      {...props}
      position="top-right"
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
    />
  );
};

export default Toast;
