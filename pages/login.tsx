import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserContext } from "../context/UserProvider";
import { SharedContext } from "../context/SharedProvider";
import { useRouter } from "next/router";

export default function SignInSide() {
  const router = useRouter();

  const { loginUser } = useContext(UserContext);
  const { loading } = useContext(SharedContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    await loginUser(user);
    router.push("/");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={5}
        sm={5}
        md={7}
        sx={{
          zIndex: -10,
        }}
      >
        <video className="videoTag" id="videoTag" autoPlay loop muted>
          <source
            src={
              "https://video.wixstatic.com/video/07fd54_c47c72a9a29d474dabc8d45f4cc905da/1080p/mp4/file.mp4"
            }
            type="video/mp4"
          />
        </video>
      </Grid>
      <Grid item xs={7} sm={7} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "error", mt: 10 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, background: "white", color: "white" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="primary"
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="primary"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "primary", boxShadow: 0 }}
              loading={loading}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
