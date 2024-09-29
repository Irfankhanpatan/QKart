// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Avatar, Button, Stack } from "@mui/material";
// import Box from "@mui/material/Box";
// import React from "react";
// import "./Header.css";
// import { useHistory, Link } from "react-router-dom";
// import { ReplayOutlined } from "@mui/icons-material";

// // import Avatar from '@mui/material/Avatar';

// const Header = ({ children, hasHiddenAuthButtons }) => {
//   const history=useHistory();
// console.log(hasHiddenAuthButtons);
// const username=localStorage.getItem("username");
// console.log("username is",username);

// const redirect=()=>{
//   localStorage.clear();
//   history.push("/", { from: "Products" })
//   window.location.reload();
// }


//     return (
//       username ?
//       (
//       <Box className="header">
//       <Box className="header-title">
//           <img src="logo_light.svg" alt="QKart-icon"></img>
//       </Box>

//       <Stack spacing={2} direction="row" alignItems="center">
//           <Avatar alt={username} src="avatar.png" />  
//            <p >{username}</p> 
//       <Button
//       className="explore-button"
//       variant="text"
//       onClick={() => redirect() }
//     >
//       LOGOUT
//     </Button>
//     </Stack>
//     </Box>)
//     :
//       (hasHiddenAuthButtons ?
//       (<Box className="header">
//         <Box className="header-title">
//             <img src="logo_light.svg" alt="QKart-icon"></img>
//         </Box>
//         <Button
//           className="explore-button"
//           startIcon={<ArrowBackIcon />}
//           variant="text"
//           onClick={() => history.push("/", { from: "Products" })}
//         >
//         Back to explore
//         </Button>
//       </Box>)
//       :
//       (<Box className="header">
//       <Box className="header-title">
//           <img src="logo_light.svg" alt="QKart-icon"></img>
//       </Box>
//       <Stack direction="row" spacing={1}>
//       <Button
//         className="explore-button"
//         variant="text"
//         onClick={() => history.push("/login", { from: "Products" })}
//       >
//       LOGIN
//       </Button>
//       <Button
//         className="explore-button"
//         variant="text"
//         onClick={() => history.push("/register", { from: "Products" })}
//       >
//       REGISTER
//       </Button>
//     </Stack>
//     </Box>)
//     )
// )
// };

// export default Header;


//  git code 

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";
const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const routeToExplore = () => {
    history.push("/");
  };

  const routeToRegister = () => {
    history.push("/register");
  };

  const routeToLogin = () => {
    history.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    history.push("/");
    window.location.reload();
  };
  if (hasHiddenAuthButtons) {
    return (
      <Box className="header">
        <Box className="header-title">
          <Link to="/">
            <img src="logo_light.svg" alt="QKart-icon"></img>
          </Link>
        </Box>
        {children}
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={routeToExplore}
        >
          Back to explore
        </Button>
      </Box>
    );
  }

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>
      {children}
      <Stack direction="row" spacing={1} alignItems="center">
        {localStorage.getItem("username") ? (
          <>
            <Avatar
              src="avatar.png"
              alt={localStorage.getItem("username") || "profile"}
            />

            <p className="username-text">{localStorage.getItem("username")}</p>

            <Button type="primary" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button onClick={routeToLogin}>Login</Button>

            <Button variant="contained" onClick={routeToRegister}>
              Register
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
