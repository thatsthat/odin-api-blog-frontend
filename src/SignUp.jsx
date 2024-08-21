import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [isNameInvalid, setIsNameInvalid] = React.useState(false);
  const [isName2Invalid, setIsName2Invalid] = React.useState(false);
  const [isPwInvalid, setIsPwInvalid] = React.useState(false);

  if (typeof context.env.CF_PAGES !== "undefined") {
    const apiURL = context.env.API_URL;
  } else {
    const apiURL = import.meta.env.VITE_context.env.API_URL;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (event.currentTarget.checkValidity()) {
      const formData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      };
      var url = apiURL + "/users/signup";
      const resp = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await resp.json();
      console.log(response);
    } else {
      event.currentTarget.reportValidity();
      return false;
    }
  };

  const handleEmailChange = (e) => {
    if (e.target.validity.valid) {
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
    }
  };

  const handleNameChange = (e) => {
    if (e.target.validity.valid) {
      setIsNameInvalid(false);
    } else {
      setIsNameInvalid(true);
    }
  };

  const handleName2Change = (e) => {
    if (e.target.validity.valid) {
      setIsName2Invalid(false);
    } else {
      setIsName2Invalid(true);
    }
  };

  const handlePwChange = (e) => {
    if (e.target.validity.valid) {
      setIsPwInvalid(false);
    } else {
      setIsPwInvalid(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={isNameInvalid}
                  helperText={
                    isNameInvalid ? "Please enter a valid first name." : ""
                  }
                  autoFocus
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={isName2Invalid}
                  helperText={
                    isName2Invalid ? "Please enter a valid last name." : ""
                  }
                  onChange={handleName2Change}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={isEmailInvalid}
                  helperText={
                    isEmailInvalid ? "Please enter a valid email address." : ""
                  }
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputProps={{
                    type: "email",
                  }}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={isPwInvalid}
                  helperText={isPwInvalid ? "Please enter a password" : ""}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePwChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
