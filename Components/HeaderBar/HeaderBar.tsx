import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductContext } from "../../context/ProductProvider";
import { UserContext } from "../../context/UserProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { SharedContext } from "../../context/SharedProvider";

export default function HeaderBar() {
  const {
    filterLikes,
    likes,
    filterState,
    miniCollectionId,
    getMiniCollection,
  } = useContext(ProductContext);
  const { user, logout } = useContext(UserContext);
  const { home } = useContext(SharedContext);

  const navigate = useRouter();

  const handleLogout = () => {
    logout();
    navigate.push("/login");
  };

  const goBack = () => {
    if (miniCollectionId !== "") {
      navigate.push("/collection/" + miniCollectionId);
    } else {
      navigate.push("/");
    }
  };

  const goHome = () => {
    getMiniCollection("");
    navigate.push("/");
  };

  const handleFilterLikes = () => {
    filterLikes(filterState.likeFilter);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "#FFFFFF", zIndex: 10000 }}>
        <Toolbar>
          {home ? (
            <>
              <img
                src="/logo.png"
                loading="lazy"
                alt="Logo"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  height: 40,
                }}
                onClick={() => goHome()}
              />
            </>
          ) : (
            <IconButton onClick={() => goBack()}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              flexDirection: "row-reverse",
              justifyContent: "flex-end",
            }}
          >
            {user && home ? (
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleFilterLikes}
              >
                <Badge badgeContent={likes.length} color="error">
                  {filterState.likeFilter ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </Badge>
              </IconButton>
            ) : null}
            {user ? (
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
