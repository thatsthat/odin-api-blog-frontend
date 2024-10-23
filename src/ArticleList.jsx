import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import { userLoggedIn, userLogOut } from "./utils/userInfo";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({});

export default function CheckboxList() {
  const [articles, setArticles] = React.useState();
  const [status, setStatus] = React.useState();

  const handleToggle = (articleId) => async () => {
    const token = localStorage.getItem("currentToken");
    var url = import.meta.env.VITE_API_URL + "/private/" + articleId;
    const resp = await fetch(url, {
      method: "PATCH",
      // prettier-ignore
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });
    const updatedArticle = await resp.json();
    fetchArticles();
  };

  const handleDelete = (articleId) => async () => {
    const token = localStorage.getItem("currentToken");
    var url = import.meta.env.VITE_API_URL + "/private/" + articleId;
    const resp = await fetch(url, {
      method: "delete",
      // prettier-ignore
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });
    const updatedArticle = await resp.json();
    fetchArticles();
  };

  const fetchArticles = async () => {
    const token = localStorage.getItem("currentToken");
    var url = import.meta.env.VITE_API_URL + "/private/";
    const resp = await fetch(url, {
      method: "get",
      // prettier-ignore
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });
    setStatus(resp.status);
    const articleList = await resp.json();
    setArticles(articleList);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  }));

  if (!userLoggedIn()) return <Navigate to="/" />;

  if (!articles) return null; // Check that articles have been fetched from backend

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={3}>
          <Item sx={{ fontWeight: "bold", boxShadow: 0 }}>Post Title</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ fontWeight: "bold", boxShadow: 0 }}>Post Date</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ fontWeight: "bold", boxShadow: 0 }}>Published</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ fontWeight: "bold", boxShadow: 0 }}>Delete</Item>
        </Grid>
        {articles.map((article) => {
          const labelId = `checkbox-list-label-${article.title}`;
          const niceDate = new Date(article.date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <>
              <Grid item xs={3}>
                <Item sx={{ boxShadow: 0 }}>{article.title}</Item>
              </Grid>
              <Grid item xs={3}>
                <Item sx={{ boxShadow: 0 }}>{niceDate} </Item>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Switch
                  edge="end"
                  onChange={handleToggle(article._id)}
                  checked={article.isPublished}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-bluetooth",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <IconButton
                  edge="end"
                  aria-label="delete-article"
                  onClick={handleDelete(article._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </>
          );
        })}
      </Grid>
    </Box>
  );
}
