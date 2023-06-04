import React from 'react'

const NewsItem =(props)=> {

    let {title, description, imageUrl, newsUrl, author, date,source} = props
    return (
      <div className='my-3'>
        <div className="card">

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>

            <span className=" badge rounded-pill bg-danger" >{source}</span>
          </div>

          {/* sample image url if the image is null */}
          <img src={!imageUrl?"https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-1024.png?resize=1200,675":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text text-danger"><small>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItem;
