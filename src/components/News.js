import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  // constructor(props) {
  //   super(props);
  //   state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     pageSize: 8,
  //     totalResults: 0,
  //   };

  //   document.title = `${capitalizeFirstLetter(
  //     props.category
  //   )} - NewsByShashi`;
  // }

  const updateNews = async () => {
    setPageSize(8);
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  // useEffect is in the place of componenrDidMount
  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  // prevHandle = async () => {
  //   setState({
  //     page: page - 1,
  //   });
  //   componentDidMount();
  // };

  // nextHandle = async () => {
  //   setState({
  //     page: page + 1,
  //   });
  //   componentDidMount();
  // };

  return (
    <>
      <h1 className="text-center" style={{marginTop:'90px', color:'red'}}>
        Top news on {capitalizeFirstLetter(props.category)}
        {loading && <Spinner />}
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className=" container">
          <div className="row  ">
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : null}
                    discription={
                      element.description ? element.description : null
                    }
                    imageUrl={
                      element.urlToImage ? element.urlToImage : "/logo.png"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={prevHandle}
          >
            &larr;previous
          </button>
          <button
            disabled={
              page ===
              Math.ceil(totalResults / pageSize)
            }
            className="btn btn-dark"
            onClick={nextHandle}
          >
            next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
