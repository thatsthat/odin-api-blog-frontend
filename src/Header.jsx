import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function HeaderButton({ loggedIn }) {
  if (loggedIn) {
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("currentToken");
          location.reload();
        }}
      >
        Logout
      </Button>
    );
  }
  return (
    <Button variant="outlined" size="small" href="/signin">
      Signin
    </Button>
  );
}

function Header(props) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <HeaderButton
          loggedIn={localStorage.getItem("currentToken")}
        ></HeaderButton>
      </Toolbar>
    </React.Fragment>
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
