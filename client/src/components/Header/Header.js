import style from "./Header.module.css";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

const Header = ({ mode, setMode }) => {
  const [modalWindow, setModalWindow] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const titles = {
    "/": "Report Creator",
  };
  const toggleColorMode = () => {
    mode === "dark" ? setMode("light") : setMode("dark");
  };
  const handleSubmit = async () => {
    // const url = "http://192.168.54.38:5000/about";
    // const payload = {
    //   tool: location.pathname,
    // };
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // };
    // const response = await fetch(url, options);
    // const data = await response.text();
    // setModalDescription(data);
    // setModalWindow(true);
  };
  const handleClose = () => setModalWindow(false);

  return (
    <Box sx={{ bgcolor: "primary.main" }} className={style.header}>
      <Typography
        variant="h3"
        sx={{ color: "text.title" }}
        className={style.tool_name}
      >
        Report Creator
      </Typography>
      <IconButton
        size="large"
        sx={{ position: "absolute", right: 0 }}
        onClick={handleSubmit}
        color="inherit"
      >
        <QuestionMarkIcon fontSize="large" htmlColor="white" />
      </IconButton>
      <IconButton
        sx={{ mr: "50px", position: "absolute", right: 0 }}
        onClick={toggleColorMode}
        color="inherit"
      >
        {mode === "dark" ? (
          <Brightness7Icon fontSize="large" />
        ) : (
          <Brightness4Icon fontSize="large" htmlColor="white" />
        )}
      </IconButton>
      <Modal open={modalWindow} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
            variant="h6"
            component="h2"
          >
            Report Creator
          </Typography>
          <Typography sx={{ mt: 2 }}>{modalDescription}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};
export default Header;
