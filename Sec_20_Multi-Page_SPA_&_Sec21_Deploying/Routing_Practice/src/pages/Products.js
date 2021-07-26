import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <h1>Products Page</h1>
      <ul>
        <li>
          <Link to="/products/book">Book</Link>
        </li>
        <li>
          <Link to="/products/carpet">Carpet</Link>
        </li>
        <li>
          <Link to="/products/mug">Mug</Link>
        </li>
      </ul>
    </div>
  );
};

export default Products;
