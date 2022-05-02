import Product from "../interfaces/Product";
import FilterItem from "../interfaces/FilterItem";
import ProductComment from "../interfaces/Comment";

export type ProductContextState = {
  likes: number[];
  products: Array<Product> | null;
  unfilteredProducts: Array<Product> | null;
  likeProduct: (id: number) => void;
  getMiniCollection: (id: string) => any;
  getProduct: (id: string) => any;
  filterLikes: (state: Boolean) => void;
  filterItems: Array<FilterItem> | null;
  filterSubItems: Array<FilterItem> | null;
  filterProductsTab: (id: number) => void;
  filterSubTab: (id: number) => void;
  findKeyword: (keyword: string) => void;
  searchKeyword: string | null;
  filterState: {
    likeFilter: boolean;
    tagFilter: boolean;
    subFilter: boolean;
    searchFilter: boolean;
  };
  miniCollectionId: string;
};

export type CommentContextState = {
  clickedCard: (product: Product) => void;
  clickedProduct: Product | null;
  productComment: Array<ProductComment> | null;
  postComment: (comment: string) => void;
};

export type UserContextState = {
  loginUser: (user: any) => void;
  logout: () => void;
  user: Object | null;
};

export type SharedContextState = {
  changeNotification: (open: boolean, message: string) => void;
  changeLoading: (state: boolean) => void;
  notification: { open: boolean; message: String };
  loading: boolean;
  setLocation: (state: boolean) => void;
  home: boolean;
};
