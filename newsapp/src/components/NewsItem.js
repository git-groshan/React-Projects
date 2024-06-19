import React, { Component } from 'react'

export default class NewsItem extends Component {

    // constructor(){
    //     super();
    // }
  render() {
    let {title , description , imgUrl , newsUrl , author , date , source}  = this.props;
    return (
      <div className='my-3'>
        <div  className="card">
          <div>
          <span className='badge rounded-pill bg-danger ' style={{display:'flex',justifyContent:'flex-end' , right:'0' , position:'absolute'}}>{source}</span>
          </div>
            <img src={imgUrl?imgUrl:'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/3333OZTDFRLIT4KWITCC7W2HEA.jpg&w=767'}  className="card-img-top" alt="..."/>
            <div  className="card-body">
                <h5  className="card-title">{title}...</h5>
                <p  className="card-text">{description}...</p>
                <p className='card-text'> <small className=''text-muted>By {!author?'Unknown':author} on {new Date(date).toGMTString()} </small> </p>
                <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
