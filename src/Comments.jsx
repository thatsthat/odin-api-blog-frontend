import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Markdown from "./Markdown";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Comments({ post, reload }) {
  const [isBodyInvalid, setIsBodyInvalid] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("currentToken");
    if (event.currentTarget.checkValidity()) {
      const formData = {
        text: data.get("body"),
        author: user,
      };
      var url = import.meta.env.VITE_API_URL + "/private/comments/" + post.id;
      const resp = await fetch(url, {
        method: "PATCH",
        // prettier-ignore
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
          text: data.get("body"),
        }),
      });
      reload();
      event.target.reset();
    } else {
      event.currentTarget.reportValidity();
      return false;
    }
  };

  const handleBodyChange = (e) => {
    if (e.target.validity.valid) {
      setIsBodyInvalid(false);
    } else {
      setIsBodyInvalid(true);
    }
  };

  const loggedIn =
    Date.now() > localStorage.getItem("currentTokenExpires") * 1000;

  if (!loggedIn && post.comments.length == 0) return null;

  if (loggedIn && post.comments.length == 0)
    return ()

    return (
      <Box
        sx={{
          borderRadius: 4,
          bgcolor: "#454647",
          p: 5,
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            "& .markdown": {
              py: 3,
            },
          }}
        >
          {post.comments.map((comment, index) => (
            <>
              <Markdown className="markdown" key={index}>
                {comment.text}
              </Markdown>
              <hr />
            </>
          ))}
        </Grid>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                error={isBodyInvalid}
                helperText={
                  isBodyInvalid ? "Please write some text for your comment" : ""
                }
                name="body"
                multiline
                label="Enter comment"
                type="text"
                id="body"
                autoComplete="body"
                onChange={handleBodyChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    );
}
