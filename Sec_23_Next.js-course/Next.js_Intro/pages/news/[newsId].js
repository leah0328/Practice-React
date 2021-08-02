//domain.com/news/abc

import { useRouter } from "next/router";

const DetailPage = () => {
  const router = useRouter();
  console.log(router.query.newsId); // the item after query should be whatever we named inside the [ ].js dynamic page!

  return <h1>The Detail Page</h1>;
};

export default DetailPage;
