//domain.com/news

import Link from "next/link";
import { Fragment } from "react";

const NewsPage = () => {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="/news/article-1">Article 1</Link>
        </li>
        <li>
          <Link>Article 2</Link>
        </li>
        <li>
          <Link>Article 3</Link>
        </li>
      </ul>
      ;
    </Fragment>
  );
};

export default NewsPage;
