import { useContext, useEffect } from "react";
import ProductCard from "../Components/ProductCard/ProductCard";
import { Grid } from "@mui/material";
import { ProductContext } from "../context/ProductProvider";
import LoadingCard from "../Components/LoadingCard/LoadingCard";
import Notification from "../Components/Notification/Notification";
import SearchBarAlternate from "../Components/SearchBarAlternate/SearchBarAlternate";
import FilterTabs from "../Components/FilterTabs/FilterTabs";
import FilterSubTabs from "../Components/FilterSubTabs/FilterSubTabs";
import { SharedContext } from "../context/SharedProvider";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Product from "../interfaces/Product";
const Home = () => {
  const { products } = useContext(ProductContext);
  const router = useRouter();
  const { loading, setLocation } = useContext(SharedContext);

  useEffect(() => {
    setLocation(true);
  }, [setLocation]);

  let loader = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <Notification />
      <Grid
        container
        spacing={1}
        sx={{ background: "#F5F5F5" }}
        direction="row"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchBarAlternate />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FilterTabs />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FilterSubTabs />
        </Grid>

        {loading
          ? loader?.map((item) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  key={item}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <motion.div layout>
                    <LoadingCard key={item} />
                  </motion.div>
                </Grid>
              );
            })
          : products?.map((product: Product) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  key={product.Id}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <motion.div layout>
                    <ProductCard obj={product} key={product.Id} />
                  </motion.div>
                </Grid>
              );
            })}
      </Grid>
    </>
  );
};

export default Home;
