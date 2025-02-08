import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async (pageToken = "") => {
    props.setProgress(10);
    let url = `https://newsdata.io/api/1/latest?apikey=${
      props.apiKey
    }&country=in&language=en&category=${props.category}&${
      pageToken ? `&page=${pageToken}` : ""
    }`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.results);
    setNextPage(parsedData.nextPage);
    setLoading(false);
    setTotalResults(parsedData.totalResults);

    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    if (nextPage) {
      let pageToken = nextPage;
      let url = `https://newsdata.io/api/1/latest?apikey=${
        props.apiKey
      }&country=in&language=en&category=${props.category}&${
        pageToken ? `&page=${pageToken}` : ""
      }`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.results));
      setNextPage(parsedData.nextPage);
      setTotalResults(parsedData.totalResults);
    }
  };

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - DNews`;
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px",marginTop:'90px' }}>
        DNews - Top{" "}
        {props.category !== "top" ? capitalizeFirstLetter(props.category) : ""}{" "}
        Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.article_id}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 188)
                        : ""
                    }
                    imageurl={element.image_url}
                    newsUrl={element.link}
                    src={element.source_name}
                    date={element.pubDate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;

News.defaultProps = {
  category: "top",
};

News.propTypes = {
  category: PropTypes.string,
};
