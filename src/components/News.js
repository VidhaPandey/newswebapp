import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            error: null,
        }
    }

    async componentDidMount() {
        this.props.setProgress(10);
        this.fetchNews();
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    fetchNews = async () => {
        const { country, category, pageSize } = this.props;
        const { page } = this.state;
        this.props.setProgress(30);
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f83ff72750f04d93ba88b5c4e205418e&page=${page}&pageSize=${pageSize}`;
        this.setState({ loading: true });
        try {
            let data = await fetch(url);
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            let parsedData = await data.json();
            this.props.setProgress(70);
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
        this.props.setProgress(100);
    }
    
    fetchMoreData = async () => {
        const { country, category, pageSize } = this.props;
        const { page } = this.state;
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f83ff72750f04d93ba88b5c4e205418e&page=${page + 1}&pageSize=${pageSize}`;
        this.setState({ loading: true });
        try {
            let data = await fetch(url);
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            let parsedData = await data.json();
            if (parsedData.status === "ok") {
                this.setState({
                    articles: this.state.articles.concat(parsedData.articles),
                    totalResults: parsedData.totalResults,
                    loading: false,
                    error: null,
                    page: this.state.page + 1
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
            <div className="container" style={{ paddingTop: '80px', paddingBottom: '20px' }}>
                <h1 className="text-center">News Monkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="row">
                        {!this.state.error && this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 88) : ""}
                                        imageURL={element.urlToImage}
                                        newsURL={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}