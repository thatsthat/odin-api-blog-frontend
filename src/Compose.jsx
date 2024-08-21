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

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Compose() {
  const [isTitleInvalid, setIsTitleInvalid] = React.useState(false);
  const [isBodyInvalid, setIsBodyInvalid] = React.useState(false);

  if (typeof context.env.CF_PAGES !== "undefined") {
    const apiURL = context.env.API_URL;
  } else {
    const apiURL = import.meta.env.VITE_context.env.API_URL;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("currentToken");
    if (event.currentTarget.checkValidity()) {
      const formData = {
        title: data.get("title"),
        text: data.get("body"),
        author: user,
        isPublished: true,
      };
      console.log(formData.author);
      var url = apiURL + "/blog/article";
      //console.log(JSON.stringify(formData));
      const resp = await fetch(url, {
        method: "post",
        // prettier-ignore
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
          title: data.get("title"),
          text: data.get("body"),
          author: user,
          isPublished: true,
        }),
      });
      const response = await resp.json();
      console.log(response);
    } else {
      event.currentTarget.reportValidity();
      return false;
    }
  };

  const handleTitleChange = (e) => {
    if (e.target.validity.valid) {
      setIsTitleInvalid(false);
    } else {
      setIsTitleInvalid(true);
    }
  };

  const handleBodyChange = (e) => {
    if (e.target.validity.valid) {
      setIsBodyInvalid(false);
    } else {
      setIsBodyInvalid(true);
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
          <Typography component="h1" variant="h5">
            Blog writing tool
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={isTitleInvalid}
                  helperText={isTitleInvalid ? "Please enter a post title" : ""}
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  inputProps={{
                    type: "text",
                  }}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={isBodyInvalid}
                  helperText={
                    isBodyInvalid ? "Please write some text for your post" : ""
                  }
                  fullWidth
                  name="body"
                  label="Post content"
                  type="text"
                  id="body"
                  autoComplete="body"
                  onChange={handleBodyChange}
                  multiline
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
