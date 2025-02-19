import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            error: null
        };
    }

    async componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {
        const { country, category, pageSize } = this.props;
        const { page } = this.state;
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f83ff72750f04d93ba88b5c4e205418e&page=${page}&pageSize=${pageSize}`;
        this.setState({ loading: true });
        try {
            let data = await fetch(url);
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            let parsedData = await data.json();
            if (parsedData.status === "ok") {
                this.setState({
                    articles: parsedData.articles,
                    totalResults: parsedData.totalResults,
                    loading: false,
                    error: null
                });
            } else {
                throw new Error(parsedData.message);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false, error: error.message });
        }
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 }, this.fetchNews);
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ page: this.state.page + 1 }, this.fetchNews);
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">News Monkey - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
                <div className="row">
                    {!this.state.loading && !this.state.error && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 45) : ""}
                                    description={element.description ? element.description.slice(0, 88) : ""}
                                    imageURL={element.urlToImage}
                                    newsURL={element.url}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>
                        &larr; Previous
                    </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}