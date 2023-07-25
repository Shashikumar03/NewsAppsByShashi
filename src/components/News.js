import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      pageSize: 8,
      totalResults: 0,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsByShashi`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7124738db4854e628101693b7e339442&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    //apiKey=420f69806b6a40aabfc45f8abb8a5391
    //apiKey=d093053d72bc40248998159804e0e67d
    //apiKey=8cb8c8c8a74d42c48b23feb01b0a765a
    //apiKey=7124738db4854e628101693b7e339442
    this.props.setProgress(10);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);

    console.log(parseData);

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      pageSize: this.totalResults,
    });
    this.props.setProgress(100);
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7124738db4854e628101693b7e339442&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
    
  };

  // prevHandle = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.componentDidMount();
  // };

  // nextHandle = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.componentDidMount();
  // };

  render() {
    return (
      <>
        <h1 className="text-center">
          Top news on {this.capitalizeFirstLetter(this.props.category)}
          {this.state.loading && <Spinner />}
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className=" container">
            <div className="row  ">
              {this.state.articles.map((element) => {
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
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.prevHandle}
          >
            &larr;previous
          </button>
          <button
            disabled={
              this.state.page ===
              Math.ceil(this.state.totalResults / this.state.pageSize)
            }
            className="btn btn-dark"
            onClick={this.nextHandle}
          >
            next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
