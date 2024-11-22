import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title, description,imageUrl,url,author, publishedAt,source}=this.props
    return (
      <div className="my-3">
        <div className="card" >
          <span className="position-absolute top-2 start-1 translate-middle badge rounded-pill bg-danger" style={{left:'80%',zIndex:'100'}}>
        {source}</span>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title" >{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">By {!author?"unknown":author} on {new Date(publishedAt).toGMTString()}</small></p>
    <a href={url}  className="btn btn-sm btn-primary">
    Read more
  </a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
