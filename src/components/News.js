import React, { Component } from 'react'
import NewsItem from './NewsItem'

import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      articles: [],
      loading: true,
      totalResults: 0
    }

    document.title = `${this.props.category.slice(0, 1).toUpperCase() + this.props.category.slice(1)}-NewsMonkey`
  }


  async updateNews() {

    this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })

    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }


  // handleNext = async () => {

  //     await this.setState({
  //       page: 1 + this.state.page,
  //     })

  //     this.updateNews();
  //   }


  // handlePrev = async () => {

  //   await this.setState({
  //     page: this.state.page - 1,
  //   })
  //   this.updateNews();
  // }


  fetchMoreData = async () => {

    this.setState({
      page: this.state.page+1,
    })

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;


    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })


  };


  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.props.category.slice(0, 1).toUpperCase() + this.props.category.slice(1)} Headlines</h1>

        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

          <div className="container">

            <div className="row">
              {this.state.articles.map((ele) => {

                return <div className="col-md-4" key={ele.url}>
                  <NewsItem title={ele.title != null ? ele.title : ""} description={ele.description != null ? ele.description : ""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                </div>

              })}

            </div>

          </div>


        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr; </button>
        </div> */}

      </>
    )
  }
}

export default News
