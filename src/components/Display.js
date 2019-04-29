import * as React from "react";
import './Display.css';
import Pagination from "./Pagination";

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     personPerPage: 24
    };
  }
  currentPageResult(pageNumber, itemsPerPage = 24){
    let i = (pageNumber <= 1) ? (0) : ((itemsPerPage * pageNumber) - itemsPerPage);
    let users = this.props.users.slice(i, itemsPerPage * pageNumber);
    return users;
  }
  makeUserIcon = (str) => {
      var result = str.split(" ");
      return result[0][0] + result[1][0];
  }
  render(){
    if(this.props.isLoading){
        return <h2 className="text-center item-message">Page is loading...</h2>
    }
    return (
    <div>    
      <div className="display container">
        <h2
          className="title font-weight-bold text-left item-title">
          Friends
        </h2>
        <Pagination
          currentPage={this.props.currentPage}
          changeCurrentPage={this.props.changeCurrentPage}
          lastPage={this.props.lastPage()}/>
        <small className='text-muted'>{this.props.users.length} users was find:</small>
        <ul className="list-unstyled person text-left mt-4  mb-3 d-flex flex-wrap pl-0">
          {this.props.users &&
            this.currentPageResult(this.props.currentPage).map((item, index) => { return (
                <li
                  key={item.id}
                  className="position-relative mb-5 col-12 col-md-6 pl-0 item item-li">
                  <div className="icon rounded-circle position-absolute bg-secondary px-3 py-3 text-center">
                    <div className="my-auto icon__inicial">
                      {this.makeUserIcon(item.name)}
                    </div>
                  </div>
                  <div className="name pl-4 ml-5">
                    <a href="#">
                      <ins>{item.name}</ins>
                    </a>
                  </div>
                  <div className="info text-muted pl-4 ml-5">
                    <span className="specifed mr-1 small">{item.gender},</span>
                    <span className="specifed mr-1 small">
                      {item.age} y.o.,
                    </span>
                    <span className="specifed mr-1 small"> works for {item.company}</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {(this.props.currentPage === this.props.lastPage()) ? null : (<Pagination
        currentPage={this.props.currentPage}
        changeCurrentPage={this.props.changeCurrentPage}
        lastPage={this.props.lastPage()}
        scroll={this.props.scroll}/>)}
    </div>
     )
   }
}

export default Display;