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
const defaultTheme = createTheme();

export default function Blog() {
  const [articles, setArticles] = React.useState();

  const fetchArticles = async () => {
    if (typeof CF_PAGES !== "undefined") {
      var url = API_URL + "/blog/article_list/";
    } else {
      var url = import.meta.env.VITE_API_URL + "/blog/article_list/";
    }
    console.log(url);
    const resp = await fetch(url, {
      method: "get",
    });
    const articleList = await resp.json();
    const articleStrings = articleList.map((art) => art);
    setArticles(articleStrings);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (!(typeof articles === "undefined")) {
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
                    <Grid container spacing={0} sx={{ mt: 1 }}>
                      <Main posts={articles} />
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
}
