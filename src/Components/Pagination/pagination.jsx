import React, { Component } from 'react';
import "./pagination.css"

const Pagination = (props) => {
  return (
    <nav> 
    <ul className="pagination justify-content-center" >
      {props.currPage == 1? <li className="page-item disabled">
        <a className="page-link" href="#" tabindex="-1">PREVIOUS</a>
      </li>: <li className="page-item">
        <a className="page-link active" onClick={props.previousPage} href="#" tabindex="-1">NEXT</a>
      </li>}
      
    
     {props.page.map((pageNumber)=>{
      return props.currPage == pageNumber ? <li className="page-item active sr-only" ><a className="page-link"  href="#">{pageNumber}</a></li>:
       <li className="page-item" ><a className="page-link" href="#" onClick={()=>{props.setPage(pageNumber)}}>{pageNumber}</a></li>
     })}
      {props.currPage == props.page.length? <li className="page-item disabled">
        <a className="page-link" href="#" tabindex="-1">Next</a>
      </li>: <li className="page-item">
        <a className="page-link active" onClick={props.nextPage} href="#" tabindex="-1">Next</a>
      </li>}
     </ul>
    </nav>
  )
}

export default Pagination