import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";
import Comments from "./Comments";
import Box from "@mui/material/Box";

function Main({ posts, reload, title }) {
  if (!posts) return null; // Check that posts have been fetched from backend
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
      {posts.map((post, index) => (
        <Box
          sx={{
            borderRadius: 4,
            bgcolor: "#2a2b2b",
            p: 5,
            pt: 0,
            m: 2,
          }}
        >
          <Markdown className="markdown" key={index}>
            {post.body}
          </Markdown>
          <Comments post={post} reload={reload} />
        </Box>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
