import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/system";
// import { theme } from "./theme"
import { BrowserRouter } from "react-router-dom";


// TODO: CRIO_TASK_MODULE_REGISTER - Add Target container ID (refer public/index.html)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
     {/* <ThemeProvider > */}
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={5000}
          preventDuplicate
        >
          <App />
        </SnackbarProvider>
        </BrowserRouter>
        {/* </ThemeProvider> */}
  </React.StrictMode>,
   document.getElementById('root')
);
