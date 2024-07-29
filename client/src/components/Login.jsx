import React, {  useState } from "react";
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { loginUser } from "../service/user";
import { toast } from "react-toastify";

const CustomTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    borderRadius: '12px',
  },
  '& .MuiFilledInput-root.Mui-focused': {
    borderColor: 'green',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'green',
  },
});

const CustomCheckbox = styled(Checkbox)({
  color: 'white',
  '&.Mui-checked': {
    color: '#4caf50',
  },
});

export default function Login({ onLoginSuccess }) {

  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsLoading(true)
        const result = await loginUser(formState);
        if (result.status) {
          localStorage.setItem("token", result.token);
          setFormState({
            email: "",
            password: ""
          })
          onLoginSuccess(result.data);
          toast.success("Login successfully");
          setIsLoading(false)
          return
        } else {
          toast.error(result.message || "Invalid credential!")
          setIsLoading(false)
          return
        }
      } catch (error) {
        toast.error("Error in Loogin");
        setIsLoading(false)
      }
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formState.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }

    if (!formState.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formState.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="login_page_container_fluid">
      <Container className="main_container_login_page">

        <div className="formcontainer main_login_form_div">
          <form onSubmit={handleSubmit}>
            <div className="logo_sec">
              <img
                src="/images/logo.png"
                alt="logo"
              />
            </div>
            <Typography variant="h6" className="welcome_heading">
              Welcome to Brandclever! <span className="hand_icn">👋🏻 </span>
            </Typography>
            <p className="please_sign_text">
              Please sign-in to your account and start the adventure
            </p>

            <CustomTextField
              variant="filled"
              label="Email"
              name="email"
              fullWidth
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              value={formState.email}
            />
            <br /> <br />
            <CustomTextField
              variant="filled"
              label="Password"
              name="password"
              type="password"
              fullWidth
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              value={formState.password}
            />
            <div className="remember_me_main">
              <CustomCheckbox defaultChecked color="success" />
              <p>Remember me</p>
            </div>
            <div className="login_btn">
              {
                isLoading ? (
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                ) : (

                  <Button type="submit" variant="outlined">
                    Login
                  </Button>
                )
              }
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
