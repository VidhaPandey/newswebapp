import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsURL } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageURL ? imageURL : "https://cdn.mos.cms.futurecdn.net/7NdiZMLZkP6UviNtFGWHJL-1200-80.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}