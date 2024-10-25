import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Markdown from "./Markdown";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import WriteComment from "./WriteComment";
import { userLoggedIn, userLogOut } from "./utils/userInfo";

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

  if (!userLoggedIn() && !post.comments.length) return null;

  return (
    <Box
      sx={{
        borderRadius: 4,
        bgcolor: "#454647",
        p: 5,
      }}
    >
      <Grid
        container
        direction="column"
        xs={12}
        md={8}
        sx={{
          "& .markdown": {
            py: 3,
          },
        }}
      >
        {post.comments.map((comment, index) => (
          <Grid
            item
            container
            direction="column"
            spacing={1}
            sx={{ borderBottom: "1px solid grey", mb: 1, pb: 1 }}
          >
            <Grid
              item
              container
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Grid item>{comment.author.firstName}</Grid>
              <Grid item>{new Date(comment.date).toLocaleDateString()}</Grid>
            </Grid>
            <Grid item>{comment.text}</Grid>
          </Grid>
        ))}
      </Grid>
      {userLoggedIn() && <WriteComment post={post} reload={reload} />}
    </Box>
  );
}
