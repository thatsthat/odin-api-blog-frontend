import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Markdown from "./Markdown";

export default function Comments(props) {
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
        {props.postComments.map((comment, index) => (
          <>
            <Markdown className="markdown" key={index}>
              {comment.text}
            </Markdown>
            <hr />
          </>
        ))}
      </Grid>
    </Box>
  );
}
