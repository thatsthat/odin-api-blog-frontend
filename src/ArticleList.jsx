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

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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

  if (!(typeof articles === "undefined")) {
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {articles.map((article) => {
          const labelId = `checkbox-list-label-${article.title}`;

          return (
            <ListItem
              key={article.title}
              secondaryAction={
                <IconButton edge="end" aria-label="delete-article">
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(article)}
                dense
              >
                <ListItemIcon>
                  <Switch
                    edge="end"
                    onChange={handleToggle(article)}
                    checked={checked.indexOf(article) !== -1}
                    inputProps={{
                      "aria-labelledby": "switch-list-label-bluetooth",
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={article.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  }
}
