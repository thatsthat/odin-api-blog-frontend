import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";

function Main({ posts, title }) {
  // Crear componente que muestre todos los comentarios del articulo
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
      {posts && // Check that posts have been fetched from backend
        posts.map((post, index) => (
          <>
            <Markdown className="markdown" key={index}>
              {post}
            </Markdown>
            <hr />
          </>
        ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
