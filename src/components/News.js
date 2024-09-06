import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News   extends Component {
  
    constructor(){
        super();
        this.state = {
         articles: [],
         loading: false, 
         page:1

        }
    }

    async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=b58b94680f0f44579dbe28f361f656a2&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles,totalArticles:parsedData.totalResults,
    loading: false
    })

    } 

    handlPrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=b58b94680f0f44579dbe28f361f656a2&page=
        ${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({})
        this.setState({
            page:this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
     
    handlNextClick = async ()=>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=b58b94680f0f44579dbe28f361f656a2&page=
    ${this.state.page +1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({})
    this.setState({
        page:this.state.page + 1,
        articles: parsedData.articles,  
        loading: false

    })
    }
      }
  render() {
    return (
      <div className= "container my-3">
        <h2 className="text-center">SACHNEWS--Top Headlines</h2>
       {this.state.loading && <Spinner/>} 
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage}
            newsUrl={element.url}/>
            </div>
          })}      
           
   </div>
   <div className="container d-flex justify-content-between">
   <button disabled={this.state.page<=1} type="button" className="btn btn-primary"onClick={this.handlPrevClick}>&larr; Previous</button>
   <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handlNextClick}>Next &rarr;</button>
    </div>       
      </div>
    )
  }
}

export default  News
 