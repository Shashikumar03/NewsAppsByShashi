import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
      loading: false,
      page: 1,
      pageSize: 4,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsByShashi`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8cb8c8c8a74d42c48b23feb01b0a765a&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    //apiKey=420f69806b6a40aabfc45f8abb8a5391
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  prevHandle = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.componentDidMount();
  };

  nextHandle = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.componentDidMount();
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          Top news on {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <div className=" container my-3">
          <div className="row  ">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : null}
                      discription={
                        element.description ? element.description : null
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}{" "}
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
