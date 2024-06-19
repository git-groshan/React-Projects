import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defautltProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  captializeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  constructor(props) {
    console.log("Inside Consturtor !!");
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.captializeFirstLetter(
      this.props.category
    )}- NewsMonkey`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    // console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

  }

  async componentDidMount() {
    // console.log("component Did Mount Function ");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f98254ae444439988f1fbbca30abd42&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data =  await fetch(url);
    // let parseData = await data.json();
    // // console.log(parseData);
    // this.setState({
    //     articles:parseData.articles ,
    //     totalResults:parseData.totalResults,
    //     loading:false
    // })
    this.updateNews();
  }

  //   handleNextClick = async () => {
  //     // console.log("Next Btn Clicked !!");
  //     // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

  //     //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f98254ae444439988f1fbbca30abd42&page=${this.state.page + 1 }&pageSize=${this.props.pageSize}`;
  //     //         this.setState({loading:true});
  //     //         let data =  await fetch(url);
  //     //         let parseData = await data.json();
  //     //         // console.log(parseData);
  //     //         this.setState({
  //     //             page: this.state.page + 1,
  //     //             articles:parseData.articles,
  //     //             loading:false
  //     //         })

  //     //     }
  //     this.setState({ page: this.state.page + 1 });
  //     this.updateNews();
  //   };

  //   handlePrevClick = async () => {
  //     console.log("Prev Btn Clicked !!");
  //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f98254ae444439988f1fbbca30abd42&page=${this.state.page - 1 }&pageSize=${this.props.pageSize}`;
  //     //     this.setState({loading:true});
  //     // let data =  await fetch(url);
  //     // let parseData = await data.json();
  //     // // console.log(parseData);
  //     // this.setState({
  //     //     page: this.state.page - 1,
  //     //     articles:parseData.articles,
  //     //     loading:false
  //     // })
  //     this.setState({ page: this.state.page - 1 });
  //     this.updateNews();
  //   };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    //    this.updateNews();
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  };
  render() {
    console.log("Inside Render !! ");
    return (
      <>
        {/* <div>
        <div className="container my-3"> */}
        <h1 className="text-center" style={{ margin: "33px 0px" }}>
          NewsMonkey - Top {this.captializeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        {/* This was by using spinner  */}
        {/* {!this.state.loading && this.state.articles.map((element)=>{
                return   <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,80):""} imgUrl={element.urlToImage } newsUrl={element.url} author={element.author}  date={element.publishedAt} source={element.source.name}/>
                </div>
            })} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imgUrl={element.urlToImage}
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
        {/* <div className="container d-flex justify-content-between ">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark mx-2"
              onClick={this.handlePrevClick}
            >
              {" "}
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark mx-2"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>

          </div>
             */}
        {/* </div>
      </div> */}
      </>
    );
  }
}
