import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { userLoggedIn, userLogOut } from "./utils/userInfo";

function HeaderButton({ loggedIn }) {
  if (!loggedIn) {
    return (
      <Button variant="outlined" size="small" href="/signin">
        Signin
      </Button>
    );
  }
  return (
    <>
      <Button variant="outlined" size="small" href="/admin" sx={{ mr: 1 }}>
        Admin
      </Button>
      <Button variant="outlined" size="small" href="/compose" sx={{ mr: 1 }}>
        Write
      </Button>
      <Button variant="outlined" size="small" onClick={userLogOut}>
        Logout
      </Button>
    </>
  );
}

function Header({ sections, title }) {
  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Link
          href="/"
          sx={{ flex: 1, textDecoration: "none", boxShadow: "none" }}
        >
          <Typography
            component="h2"
            variant="h5"
            color="#b2aea8"
            align="center"
            noWrap
          >
            {title}
          </Typography>
        </Link>
        <HeaderButton loggedIn={userLoggedIn()}></HeaderButton>
      </Toolbar>
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
