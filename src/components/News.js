import React, { useEffect, useState } from 'react';

import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [category, setCategory] = useState('general');
    const [country, setCountry] = useState('us');
    const [progress, setProgress] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const fetchNews = async () => {
        const { country, category, pageSize } = props;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f83ff72750f04d93ba88b5c4e205418e&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        props.setProgress(30);
        try {
            let data = await fetch(url);
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            let parsedData = await data.json();
            props.setProgress(70);
            if (parsedData.status === "ok") {
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults);
                setLoading(false);
                setError(null);
                props.setProgress(100);
            } else {
                throw new Error(parsedData.message);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
            setError(error.message);
            props.setProgress(100);
        }
    }

    const handlePreviousClick = async () => {
        setPage(page - 1);
        fetchNews();
    }

    const handleNextClick = async () => {
        if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
            setPage(page + 1);
            fetchNews();
        }
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        fetchNews();
    }, [page, props.category]);
    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '20px' }}>
            <h1 className="text-center">News Monkey - Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {loading && <Spinner />}
            <div className="row">
                {!error && articles.map((element) => {
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
            <div className="container d-flex justify-content-between my-3">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>
                    &larr; Previous
                </button>
                <button
                    disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
                    type="button"
                    className="btn btn-dark" onClick={handleNextClick}>
                    Next &rarr;
                </button>
            </div>
        </div>
    );
}
News.defaultProps = {
    country: 'us',
    pageSize: 10,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired
}

export default News;