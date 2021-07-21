import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_DATA = [
  {
    id: "p1",
    price: 6,
    title: "Pride and Prejudice",
    description: "Timeless Classic",
  },
  {
    id: "p2",
    price: 8,
    title: "The King and I",
    description: "Hopeless Romantic",
  },
  {
    id: "p3",
    price: 7,
    title: "Titanic",
    description: "A (way) better love story than Twilight",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
