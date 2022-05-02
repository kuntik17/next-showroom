import React, { createContext, useState, FC, useContext } from "react";
import { CommentContextState } from "./ContextType";
import { SharedContext } from "./SharedProvider";
import Product from "../interfaces/Product";
import ProductComment from "../interfaces/Comment";
import axios from "axios";
const contextDefaultValues: CommentContextState = {
  clickedCard: function (): void {},
  postComment: function (): void {},
  clickedProduct: null,
  productComment: [],
};

type Props = {
  children?: React.ReactNode;
};

export const CommentContext =
  createContext<CommentContextState>(contextDefaultValues);

const CommentProvider: FC<Props> = ({ children }) => {
  const { changeLoading } = useContext(SharedContext);

  const [clickedProduct, setClickedProduct] = useState<Product | null>(
    contextDefaultValues.clickedProduct
  );

  const [productComment, setComments] = useState<ProductComment[] | null>(null);

  const clickedCard = async (product: Product) => {
    changeLoading(true);
    setClickedProduct(product);
    await axios.post(
      `${process.env.REACT_APP_SERVER}/api/product/clickProduct`,
      {
        token: localStorage.getItem("token"),
        productId: product.Id,
      }
    );

    let comments = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/product/getComments`,
      {
        token: localStorage.getItem("token"),
        productId: product.Id,
      }
    );

    if (comments.data.comments !== null) {
      setComments(comments.data.comments.ResponseProductComments);
    } else {
      setComments([]);
    }
    changeLoading(false);
  };

  const postComment = async (commentText: string) => {
    changeLoading(true);

    await axios.post(
      `${process.env.REACT_APP_SERVER}/api/product/postComment`,
      {
        token: localStorage.getItem("token"),
        productId: clickedProduct?.Id,
        comment: commentText,
        userName: localStorage.getItem("userName"),
        userMail: localStorage.getItem("userMail"),
        adminMail: localStorage.getItem("adminMail"),
      }
    );

    changeLoading(false);
  };

  return (
    <CommentContext.Provider
      value={{
        clickedCard,
        postComment,
        clickedProduct,
        productComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
