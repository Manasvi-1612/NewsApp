import React, {useState} from 'react'
import NewsItem from './NewsItem'

import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect } from 'react';


const News =(props)=> {

  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [totalResults,setTotalResults] = useState(0);
  const [page,setPage] = useState(1);

  


  const updateNews = async ()=> {

    props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${props.category.slice(0, 1).toUpperCase() + props.category.slice(1)}-NewsMonkey`
    updateNews();
    //the below comment line is used to disable the warning
    
    // eslint-disable-next-line  
  }, [])


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


  const fetchMoreData = async () => {
    
    setPage(page+1)

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;


    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)

  };


  
    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {props.category.slice(0, 1).toUpperCase() + props.category.slice(1)} Headlines</h1>

        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

          <div className="container">

            <div className="row">
              {articles.map((ele) => {

                return <div className="col-md-4" key={ele.url}>
                  <NewsItem title={ele.title != null ? ele.title : ""} description={ele.description != null ? ele.description : ""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                </div>

              })}

            </div>

          </div>


        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrev}> &larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr; </button>
        </div> */}

      </>
    )

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}


export default News
