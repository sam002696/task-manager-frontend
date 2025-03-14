import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToastAlert, clearToastAlert } from "../../store/errorSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastAlert = () => {
  const { type, message } = useSelector(selectToastAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type && message) {
      switch (type) {
        case "info":
          toast.info(message);
          break;
        case "success":
          toast.success(message);
          break;
        case "warning":
          toast.warning(message);
          break;
        case "warn":
          toast.warn(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "dark":
          toast.dark(message);
          break;
        case "basic":
        default:
          toast(message);
      }

      // Clear toast alert after showing
      dispatch(clearToastAlert());
    }
  }, [type, message, dispatch]);

  return <ToastContainer />;
};

export default ToastAlert;
