import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Markdown from "./Markdown";

export default function Comments(props) {
  return (
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
      {props.postComments.length > 0 && // Check that posts have been fetched from backend
        props.postComments.map((comment, index) => (
          <>
            <Markdown className="markdown" key={index}>
              {comment.text}
            </Markdown>
            <hr />
          </>
        ))}
    </Grid>
  );
}
