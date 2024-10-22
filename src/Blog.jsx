import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SignIn from "./SignIn";
import Compose from "./Compose";
import ArticleList from "./ArticleList";
import SignUp from "./SignUp";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#74baf2",
    },
  },
});

defaultTheme.palette.background.default = "#1f1f1f";
defaultTheme.palette.text.primary = "#b2aea8";

export default function Blog() {
  const [articles, setArticles] = React.useState();
  const [trigger, setTrigger] = React.useState(0);

  const reRender = () => {
    setTrigger((a) => a + 1);
  };

  const fetchArticles = async () => {
    // Bajar también los comentarios asociados a cada articulo para pasarlo al componente
    // Puedo crear una función extra para solo tener una vez estas lineas extra en la llamada a la api
    const url = import.meta.env.VITE_API_URL + "/";
    const resp = await fetch(url, {
      method: "get",
    });
    const articleList = await resp.json();
    const articlesData = articleList.map((art) => ({
      body: art.markDownText,
      comments: art.comments,
      id: art._id,
    }));
    setArticles(articlesData);
  };

  useEffect(() => {
    fetchArticles();
  }, [trigger]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <BrowserRouter>
          <Header title="Blog" />
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Grid
                    container
                    spacing={0}
                    sx={{ mt: 1, justifyContent: "center" }}
                  >
                    <Main posts={articles} reload={reRender} />
                  </Grid>
                </main>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/admin" element={<ArticleList />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}
