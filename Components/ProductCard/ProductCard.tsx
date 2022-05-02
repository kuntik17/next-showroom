import Product from "../../interfaces/Product";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { ProductContext } from "../../context/ProductProvider";
import { useRouter } from "next/router";
import { CommentContext } from "../../context/CommentProvider";
import { motion } from "framer-motion";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const ProductCard: React.FC<{
  obj: Product;
}> = (props) => {
  const { likeProduct, likes } = useContext(ProductContext);
  const { clickedCard } = useContext(CommentContext);

  const handleLikeButton = async (e: any) => {
    likeProduct(e.Id);
  };

  const navigate = useRouter();
  const handleCardClick = (e: any) => {
    clickedCard(e);

    navigate.push(`/${e.Id}`);
  };

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
        {" "}
        <motion.div
          initial={{ x: 5 }}
          animate={{ x: 10 }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ position: "absolute" }}
        >
          {props.obj.IsNew === 1 && (
            <FiberNewIcon color="error" fontSize="large" />
          )}
        </motion.div>
        <LazyLoadComponent>
          <CardMedia
            component="img"
            height="350"
            image={
              props.obj.Images.length > 0
                ? props.obj.Images[0].ImageUrl
                : "https://lightwidget.com/wp-content/uploads/local-file-not-found.png"
            }
            alt={props.obj.Description}
            loading="lazy"
            style={{
              objectFit: "contain",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={() => handleCardClick(props.obj)}
          />
        </LazyLoadComponent>
        <CardHeader
          title={`${props.obj.StyleNo}`}
          subheader={`${props.obj.Description}`}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              borderRadius: "10px",
              padding: "5px",
              display: "inline-block",
              bgcolor: "#ffc400",
              cursor: "pointer",
            }}
          >
            {props.obj.ModelGroupName}
          </Typography>
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleLikeButton(props.obj)}
          >
            {" "}
            {likes.includes(props.obj.Id) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
