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

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({});

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);
  const [articles, setArticles] = React.useState();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const fetchArticles = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("currentToken");
    const url = "http://localhost:3000/blog/user_articles_list";
    const resp = await fetch(url, {
      method: "get",
      // prettier-ignore
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });
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

  if (!(typeof articles === "undefined")) {
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
            const niceDate = new Date(article.date).toLocaleDateString(
              "en-GB",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }
            );

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
                    onChange={handleToggle(article)}
                    checked={checked.indexOf(article) !== -1}
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
                  <IconButton edge="end" aria-label="delete-article">
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
}

{
  /* <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
  <ListItem>
    <ListItemText primary={"Post Title"} />
    <ListItemText primary={"Post Date"} />
    <ListItemText primary={"Published"} />
    <ListItemText primary={"Delete"} />
  </ListItem>
  {articles.map((article) => {
    const labelId = `checkbox-list-label-${article.title}`;
    const niceDate = new Date(article.date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return (
      <ListItem key={article.title}>
        <ListItemText primary={article.title} />
        <ListItemText primary={niceDate} />

        <ListItemIcon>
         
        </ListItemIcon>


      </ListItem>
    );
  })}
</List>; */
}
