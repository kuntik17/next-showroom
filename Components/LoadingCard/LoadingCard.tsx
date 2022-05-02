import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";

const LoadingCard = () => {
  return (
    <motion.div layout>
      <Card
        sx={{
          maxWidth: 380,
          margin: 1,
          boxShadow: 0,
          border: 0,
          height: 500,
          borderRadius: 5,
        }}
      >
        <Skeleton sx={{ height: 344 }} animation="wave" variant="rectangular" />
        <CardHeader
          title={<Skeleton animation="wave" height={38} width="30%" />}
          subheader={<Skeleton animation="wave" height={20} width="45%" />}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton
            animation="wave"
            height={30}
            width="60%"
            sx={{
              borderRadius: "10px",
              padding: "5px",
              display: "inline-block",
              bgcolor: "#ffc400",
            }}
          />
          <IconButton aria-label="add to favorites" sx={{ marginTop: 0.4 }}>
            <FavoriteBorderIcon color="error" />
          </IconButton>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoadingCard;
