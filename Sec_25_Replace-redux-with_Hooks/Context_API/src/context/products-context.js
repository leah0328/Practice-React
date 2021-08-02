import React from "react";
import { useState } from "react";

export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {},
});

export default (props) => {
  const [productsList, setProductsList] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);
  //using useState to manage the productList so whenever that state changes (product changes), all of the props.chilren will know

  const toggleFavourite = (productId) => {
    setProductsList((currentProdList) => {
      const prodIndex = currentProdList.findIndex((p) => p.id === productId);
      const newFavStatus = !currentProdList[prodIndex].isFavorite;
      const updatedProducts = [...currentProdList];
      updatedProducts[prodIndex] = {
        ...currentProdList[prodIndex],
        isFavorite: newFavStatus,
      };
      return updatedProducts;
    });
  };
  // line 39: using a function to make sure we get the latest product snapshot
  // line 42: create an updatedProductsList based on the old list,
  // then swap the one item we're updating by coping all the properties
  // and replacing the favourite status, then return the updated products

  return (
    <ProductsContext.Provider
      value={{ products: productsList, toggleFav: toggleFavourite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
