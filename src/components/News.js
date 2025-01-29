import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  render() {
    return (
      <div className="comtainer my-3">
        <h2>News Monkey Top Headlines</h2>
        <div className="row">
            <div className="col-md-3"> 
                <NewsItem title="myTitle" description="mydesc"/>
            </div>
            <div className="col-md-3"> 
                <NewsItem title="myTitle" description="mydesc"/>
            </div>
            <div className="col-md-3"> 
                <NewsItem title="myTitle" description="mydesc"/>
            </div>
        </div>
      </div>
    )
  }
}
