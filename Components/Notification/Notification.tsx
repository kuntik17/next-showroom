import { useContext } from "react";
import { SharedContext } from "../../context/SharedProvider";
import Snackbar from "@mui/material/Snackbar";

export default function Notification() {
  const { notification, changeNotification } = useContext(SharedContext);

  const handleClose = () => {
    changeNotification(false, "");
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={1500}
      onClose={handleClose}
      message={notification.message}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
}
