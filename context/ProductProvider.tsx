import { createContext, useState, FC, useEffect, useContext } from "react";
import { ProductContextState } from "./ContextType";
import Product from "../interfaces/Product";
import FilterItem from "../interfaces/FilterItem";
import axios from "axios";
import { SharedContext } from "./SharedProvider";
import { UserContext } from "./UserProvider";
import { CommentContext } from "./CommentProvider";
import { getCookie } from "cookies-next";
const contextDefaultValues: ProductContextState = {
  likes: [],
  products: [],
  unfilteredProducts: [],
  likeProduct: function (): void {},
  filterLikes: function (): void {},
  filterProductsTab: function (): void {},
  filterSubTab: function (): void {},
  filterItems: [],
  filterSubItems: [],
  findKeyword: function (): void {},
  getMiniCollection: function (): any {},
  getProduct: function (): any {},
  searchKeyword: "",
  filterState: {
    likeFilter: false,
    tagFilter: false,
    subFilter: false,
    searchFilter: false,
  },
  miniCollectionId: "",
};

type Props = {
  children?: React.ReactNode;
};

export const ProductContext =
  createContext<ProductContextState>(contextDefaultValues);

const ProductProvider: FC<Props> = ({ children }) => {
  const { changeNotification, changeLoading } = useContext(SharedContext);
  const { clickedCard } = useContext(CommentContext);
  const { user } = useContext(UserContext);
  const [likes, setLikes] = useState<number[]>(contextDefaultValues.likes);
  const [products, setProducts] = useState<Array<Product> | null>(
    contextDefaultValues.products
  );
  const [unfilteredProducts, setUnfilteredProducts] =
    useState<Array<Product> | null>(contextDefaultValues.unfilteredProducts);

  const [filterItems, setFilterItems] = useState<Array<FilterItem> | null>(
    contextDefaultValues.filterItems
  );
  const [filterSubItems, setFilterSubItems] =
    useState<Array<FilterItem> | null>(contextDefaultValues.filterItems);

  const [miniCollectionId, setMiniCollectionId] = useState<string>(
    contextDefaultValues.miniCollectionId
  );

  const [unFilterSubItems, setUnFilterSubItems] =
    useState<Array<FilterItem> | null>(contextDefaultValues.filterItems);
  useEffect(() => {
    if (getCookie("token")) {
      fetchData();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchData = async () => {
    changeLoading(true);
    let responseProduct = await axios.get(`/api/product/getProducts`, {
      params: {
        token: getCookie("token"),
      },
    });

    let responseLikes = await axios.post(`/api/product/likedProduct`, {
      token: getCookie("token"),
    });

    let responseModal = await axios.get(`/api/product/getModal`);

    let responseTag = await axios.get(`/api/product/getSubModel`);

    let filterSubItemsArr: {
      id: number;
      modalId: number;
      label: string;
      type: string;
      checked: boolean;
    }[] = [];

    responseTag.data.tags.ResponseSubModelGroup.forEach(
      (t: { Id: number; ModelGroupId: number; SubModelGroupName: string }) => {
        let filterSubItem = {
          id: t.Id,
          modalId: t.ModelGroupId,
          label: t.SubModelGroupName,
          type: "SubTag",
          checked: false,
        };

        filterSubItemsArr.push(filterSubItem);
      }
    );
    setUnFilterSubItems(filterSubItemsArr);
    //setFilterSubItems(filterSubItemsArr);

    let filterItemsArr: {
      id: number;
      modalId: number;
      label: string;
      type: string;
      checked: boolean;
    }[] = [];
    responseModal.data.collection.ResponseModelGroup.forEach(
      (t: { Id: number; ModelGroupName: string }) => {
        let filterItem = {
          id: t.Id,
          modalId: t.Id,
          label: t.ModelGroupName,
          type: "Tag",
          checked: false,
        };
        filterItemsArr.push(filterItem);
      }
    );

    setFilterItems(filterItemsArr);

    if (responseLikes.data.likes.length > 0) {
      let likedId = responseLikes.data.likes.map((e: { Id: number }) => {
        return e.Id;
      });
      setLikes(likedId);
    }

    let responseImage = await axios.get(`/api/product/getImages`);

    responseProduct.data.products.ResponseProduct.forEach((e: any) => {
      e.Images = [];

      responseImage.data.images.ResponseProductImages.forEach(
        (i: { ProductId: any }) => {
          if (e.Id === i.ProductId && i !== undefined) {
            e.Images.push(i);
          }
        }
      );
    });
    setUnfilteredProducts(responseProduct.data.products.ResponseProduct);
    setProducts(responseProduct.data.products.ResponseProduct);
    changeLoading(false);
  };

  const getProduct = async (id: string) => {
    let responseProduct = await axios.get(`/api/product/getProduct`, {
      params: {
        token: getCookie("token"),
        productId: id,
      },
    });

    let responseImage = await axios.get(`/api/product/getImages`, {
      params: {
        productId: id,
      },
    });

    responseProduct.data.products.ResponseProduct.forEach((e: any) => {
      e.Images = [];

      responseImage.data.images.ResponseProductImages.forEach(
        (i: { ProductId: any }) => {
          if (e.Id === i.ProductId && i !== undefined) {
            e.Images.push(i);
          }
        }
      );
    });
    clickedCard(responseProduct.data.products.ResponseProduct[0]);
    return responseProduct.data.products.ResponseProduct[0];
  };

  const getMiniCollection = async (id: string) => {
    setMiniCollectionId(id);
    if (id !== "") {
      changeLoading(true);
      let responseProduct = await axios.get(`/api/product/getMiniCollection`, {
        params: {
          token: getCookie("token"),
          link: id,
        },
      });

      let responseImage = await axios.get(`/api/product/getImages`);

      responseProduct.data.products.ResponseProduct.forEach((e: any) => {
        e.Images = [];

        responseImage.data.images.ResponseProductImages.forEach(
          (i: { ProductId: any }) => {
            if (e.Id === i.ProductId && i !== undefined) {
              e.Images.push(i);
            }
          }
        );
      });
      changeLoading(false);
      return responseProduct.data.products.ResponseProduct;
    }
  };

  const likeProduct = async (id: number) => {
    if (!likes.includes(id)) {
      await axios.post(`/api/product/likeProduct`, {
        token: getCookie("token"),
        productId: id,
        state: true,
      });
      setLikes([...likes, id]);
    } else {
      await axios.post(`/api/product/likeProduct`, {
        token: getCookie("token"),
        productId: id,
        state: false,
      });
      setLikes(likes.filter((item: any) => item !== id));
    }
  };

  const [filterState, setFilterState] = useState(
    contextDefaultValues.filterState
  );
  const [beforeLikeFilter, setBeforeLikeFilter] = useState<Product[] | null>(
    null
  );
  const filterLikes = async (state: Boolean) => {
    changeLoading(true);
    if (!state) {
      setBeforeLikeFilter(products);
      setFilterState((prevState) => {
        return {
          ...prevState,
          likeFilter: true,
        };
      });
      setProducts(products!.filter((product) => likes.includes(product.Id)));
    } else {
      setFilterState((prevState) => {
        return {
          ...prevState,
          likeFilter: false,
        };
      });
      setProducts(beforeLikeFilter);
    }
    changeLoading(false);
  };

  const [beforeFilter, setBeforeFilter] = useState<Product[] | null>(null);
  const filterProductsTab = async (id: number) => {
    changeLoading(true);
    setFilterSubItems([]);
    setBeforeSubFilter(null);
    let subFilter: FilterItem[] = [];
    unFilterSubItems?.forEach((e) => {
      if (e.modalId === id) {
        subFilter!.push(e);
      }
    });
    setFilterSubItems(subFilter);
    let filteredProducts: Product[] = [];
    if (beforeFilter === null) {
      setBeforeFilter(products);
    }
    if (id === 0) {
      setFilterState((prevState) => {
        return {
          ...prevState,
          tagFilter: false,
        };
      });
      setProducts(beforeFilter);
    } else {
      findKeyword("");
      setFilterState((prevState) => {
        return {
          ...prevState,
          tagFilter: true,
          likeFilter: false,
          subFilter: false,
          searchFilter: false,
        };
      });
      beforeFilter !== null
        ? beforeFilter.forEach((e) => {
            if (e.ModelGroupRef === id) {
              filteredProducts.push(e);
            }
          })
        : products?.forEach((e) => {
            if (e.ModelGroupRef === id) {
              filteredProducts.push(e);
            }
          });
      setProducts(filteredProducts);
    }
    changeLoading(false);
  };
  const [beforeSubFilter, setBeforeSubFilter] = useState<Product[] | null>(
    null
  );
  const filterSubTab = (id: number) => {
    changeLoading(true);
    let filteredProducts: Product[] = [];
    if (beforeSubFilter === null) {
      setBeforeSubFilter(products);
    }
    if (id === 0) {
      setFilterState((prevState) => {
        return {
          ...prevState,
          subFilter: false,
        };
      });
      setProducts(beforeSubFilter);
      setBeforeSubFilter(null);
    } else {
      findKeyword("");
      setFilterState((prevState) => {
        return {
          ...prevState,
          tagFilter: true,
          likeFilter: false,
          subFilter: true,
          searchFilter: false,
        };
      });

      beforeSubFilter !== null
        ? beforeSubFilter.forEach((e) => {
            let tags = e.SubModelGroups.split(",");
            tags.forEach((t) => {
              if (t === id.toString()) {
                filteredProducts.push(e);
              }
            });
          })
        : products?.forEach((e) => {
            let tags = e.SubModelGroups.split(",");
            tags.forEach((t) => {
              if (t === id.toString()) {
                filteredProducts.push(e);
              }
            });
          });
      setProducts(filteredProducts);
    }
    changeLoading(false);
  };

  const [beforeSearch, setBeforeSearch] = useState<Array<Product> | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string | null>("");
  const findKeyword = (keyword: string) => {
    let keywordLowered = keyword.toLowerCase();
    changeLoading(true);

    let foundProduct: Product[] = [];
    if (keyword.length === 0) {
      setFilterState((prevState) => {
        return {
          ...prevState,
          searchFilter: false,
        };
      });
      setSearchKeyword("");
      if (beforeSearch !== null) {
        setProducts(beforeSearch);
        setBeforeSearch(null);
      } else {
        setProducts(unfilteredProducts);
      }
    } else {
      if (keyword.length === 1 && beforeSearch === null) {
        setBeforeSearch(products);
      }
      setFilterState((prevState) => {
        return {
          ...prevState,
          searchFilter: true,
        };
      });
      setSearchKeyword(keyword);

      for (let i = 0; i < products!.length; i++) {
        if (
          products![i].ModelGroupName.toLowerCase().includes(keywordLowered)
        ) {
          foundProduct.push(products![i]);
        } else if (
          products![i].Hashtags.toLowerCase().includes(keywordLowered)
        ) {
          foundProduct.push(products![i]);
        } else if (
          products![i].Fabric1.toLowerCase().includes(keywordLowered)
        ) {
          foundProduct.push(products![i]);
        } else if (
          products![i].Fabric2.toLowerCase().includes(keywordLowered)
        ) {
          foundProduct.push(products![i]);
        } else if (
          products![i].Fabric3.toLowerCase().includes(keywordLowered)
        ) {
          foundProduct.push(products![i]);
        } else if (
          products![i].Fabric4.toLowerCase().includes(keywordLowered)
        ) {
          foundProduct.push(products![i]);
        } else if (
          products![i].Fabric5.toLowerCase().includes(keywordLowered)
        ) {
          foundProduct.push(products![i]);
        } else if (
          products![i].StyleNo.toLowerCase().includes(keywordLowered)
        ) {
          foundProduct.push(products![i]);
        }
      }
      let removedDuplicates = foundProduct.filter(
        (v, i, a) => a.indexOf(v) === i
      );

      setProducts(removedDuplicates);
      if (removedDuplicates.length < 1) {
        changeNotification(true, "Can't found products");
      }
    }
    changeLoading(false);
  };

  return (
    <ProductContext.Provider
      value={{
        unfilteredProducts,
        likes,
        products,
        getProduct,
        getMiniCollection,
        likeProduct,
        filterLikes,
        filterItems,
        filterSubItems,
        filterProductsTab,
        filterSubTab,
        findKeyword,
        searchKeyword,
        filterState,
        miniCollectionId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
