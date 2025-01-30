import React, { Component } from 'react';
import NewsItem from './NewsItem';

export default class News extends Component {
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [], // Initialize with articles
            loading: false
        };   
    }
    componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f83ff72750f04d93ba88b5c4e205418e";
        fetch(url)
            .then((response)=>response.json())
            .then((data)=>{
            this.setState({articles:data.articles})
        });
    }
    render() {
        return (
            <div className="container my-3">
                <h2>News Monkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articles && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}> 
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageURL={element.urlToImage} newsURL={element.url}/>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}
