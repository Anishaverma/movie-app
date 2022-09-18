import React, { Component } from 'react';
import "./pagination.css"

const Pagination = (props) => {
  return (
    <nav> 
    <ul class="pagination justify-content-center" >
      {props.currPage == 1? <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">PREVIOUS</a>
      </li>: <li class="page-item">
        <a class="page-link active" onClick={props.previousPage} href="#" tabindex="-1">NEXT</a>
      </li>}
      
    
     {props.page.map((pageNumber)=>{
      return props.currPage == pageNumber ? <li class="page-item active sr-only" ><a class="page-link"  href="#">{pageNumber}</a></li>:
       <li class="page-item" ><a class="page-link" href="#" onClick={()=>{props.setPage(pageNumber)}}>{pageNumber}</a></li>
     })}
      {props.currPage == props.page.length? <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">Next</a>
      </li>: <li class="page-item">
        <a class="page-link active" onClick={props.nextPage} href="#" tabindex="-1">Next</a>
      </li>}
     </ul>
    </nav>
  )
}

export default Pagination