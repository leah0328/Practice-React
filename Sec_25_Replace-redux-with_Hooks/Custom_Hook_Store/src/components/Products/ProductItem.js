import React from "react";

import Card from "../UI/Card";
import "./ProductItem.css";
import { useStore } from "../../hook-store/store";

const ProductItem = React.memo((props) => {
  const dispatch = useStore(false)[1];
  // shouldListen = false
  // so not setting a listener, so it shouldnt rebuild when the store changes

  const toggleFavHandler = () => {
    // toggleFav(props.id);
    dispatch("TOGGLE_FAV", props.id);
  };
  // the item (that we toggle will get a new props, which will go through React.memo, so the single item will be rebuild, not the others)

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

// React.memo so the items that didnt changed(not being toggle ) will not be reredner

export default ProductItem;
