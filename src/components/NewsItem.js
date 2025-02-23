import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsURL, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1', left: '90%' }}>
            {source}
          </span>
          <img src={imageURL ? imageURL : "https://cdn.mos.cms.futurecdn.net/7NdiZMLZkP6UviNtFGWHJL-1200-80.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-muted'>By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}