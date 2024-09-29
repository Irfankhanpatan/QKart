import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box, shouldForwardProp } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setformData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  

  const register = async (formData) => {
    if (validateInput(formData)) {
      try {
        setLoading(true);
        // `${config.endpoint}/auth/register`
        console.log(`${config.endpoint}/auth/register`);
        let response=await axios.post(`${config.endpoint}/auth/register`, {
          username: formData.username,
          password: formData.password
        });
        
        setformData({ username: "", password: "", confirmPassword: "" });
        //  let response=await fetch(`${config.endpoint}/auth/register/`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({username:formData.username,password:formData.password})
        //  })
         if (response.status === 201) {
          enqueueSnackbar("Registered successfully", { variant: "success" });
         }

        setLoading(false);
        history.push("/login", { from: "Registration Page" });

      } catch (error) {
        setLoading(false);
        console.log("errror",error.response);
        if(error.response && error.response.status===400){
          enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
        }
        else{
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", {variant:"error"});
        } 
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic

  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const handleChange = (e) => {
    const [name, value] = [e.target.name, e.target.value];
    console.log("handlechange", name, value);
    // setformData( {...formData,[name]:value} );
    // setformData((prevFormData) => ({ ...prevFormData, [name]: value }) );
    setformData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const validateInput = (data) => {
    console.log("validInput", data);
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "error",
      });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "error",
      });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header children="" hasHiddenAuthButtons={1} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            autoComplete="off"
            fullWidth
            // value={formData.username}
            // onChange={(e)=>{setformData({...formData,username:e.target.value})}}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            // onChange={(e)=>{setformData({...formData,password:e.target.value})}}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            // onChange={(e)=>{setformData({...formData,confirmPassword:e.target.value})}}
            onChange={(e) => handleChange(e)}
          />
  
          {loading ? (
           <Box display="flex" justifyContent="center">
              <CircularProgress color="primary" />{" "}
            </Box>
          ) : (
            <Button
              className="button"
              variant="contained"
              onClick={(e) => register(formData)}
            >
              Register Now
            </Button>
          )}
          <p className="secondary-action">
            Already have an account?{" "}
            <a className="link" href="#" onClick={() => history.push("/login", { from: "" })}>
              Login here
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
