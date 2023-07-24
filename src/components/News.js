import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 4,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=420f69806b6a40aabfc45f8abb8a5391&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    this.setState({ loading: true });

    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  prevHandle = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=420f69806b6a40aabfc45f8abb8a5391&page=${
      this.state.page - 1
    }&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    this.setState({ loading: true });

    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  nextHandle = async () => {
    console.log("sdd");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=420f69806b6a40aabfc45f8abb8a5391&page=${
      this.state.page + 1
    } &pageSize=2`;
    let data = await fetch(url);
    this.setState({ loading: true });
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      page: this.state.page + 1,
      loading: false,
    });
  };

  render() {
    return (
      <>
        {console.log(this.state.articles)}
        <h1 className="text-center">This is a news </h1>
        {this.state.loading && <Spinner />}
        <div className=" container my-3">
          <div className="row  ">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 20) : null}
                      discription={
                        element.description
                          ? element.description.slice(0, 40)
                          : null
                      }
                      imageUrl={element.urlToImage}
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
        <div className="container d-flex justify-content-between">
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
        </div>
      </>
    );
  }
}
