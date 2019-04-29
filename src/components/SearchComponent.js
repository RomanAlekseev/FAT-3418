import * as React from "react";
import Display from "./Display";
import FilterItem from "./FilterItem";

import {compose, filterAge, filterGender, filterName, filterWorkFor} from "../utilits/utils"

class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "not specifed",
      name: "",
      ageFrom: 18,
      ageTo: 40,
      company: "",
      users: this.props.users,
      //State for Pagination Перенёс из Display думаю нужно будет перенести на Redux
      currentPage: 1
    };
    this.top = React.createRef();
  }
    
//Переписал как compose: 
  filterStart = () => {
    this.setState({currentPage: 1}); 
    const user = this.state;
    let result = compose(
      [filterWorkFor(user.company),
      filterAge(user.ageFrom, user.ageTo),
      filterGender(user.gender),
      filterName(user.name)],
      this.props.users,
    );
    this.setState({ users: result });
  } 
//Scroll at top
  scroll = () => {
    this.top.current.scrollIntoView({behavior: 'smooth'})
  }
//Find the last page
 lastPage = () => {
      const page = this.state.users.length / 24;
      return Math.ceil(page);
  }

//Events & Parameters block
 changeCurrentPage = (e) => {
      e.preventDefault();
      this.scroll();
      const value = (e.target['innerHTML']);
      if(value === "Next"){
        this.setState((prevState) => ({
          currentPage: ++prevState.currentPage
        }))
      } else if(value === "Previous"){
        this.setState((prevState) => ({
          currentPage: --prevState.currentPage
        }))
      } else if(value === "to the first"){
           this.setState({currentPage: 1});     
      } else if(value === "to the last"){
           this.setState({currentPage: this.lastPage()});     
      } else{
          this.setState({currentPage: parseInt(value)});
      }
  }
  onChange = e => {
    let target = e.target.id;
    if (target === "not specifed") {
      return this.setState({
          gender: "not specifed"
        },() => this.filterStart()
      );
    }
    this.setState({
        gender: target
      }, () => this.filterStart());
  }
  
  setAgeParametr = (e) => {
    let from = this.state.ageFrom;
    let to = this.state.ageTo;
    if (e.target.id === "from") {
      from = e.target.value;
    } else if (e.target.id === "to") {
      to =
        this.state.ageFrom < e.target.value
          ? e.target.value
          : this.state.ageFrom;
    }
    this.setState({
        ageFrom: from,
        ageTo: to
      }, () => this.filterStart());
  }
  
  setNameParametr = (e) => {
    const value = e.target.value;
    this.setState({ 
        name: value
    }, () => this.filterStart());
  }
  
  setWorkParametr = (e) => {
    const value = e.target.value;
    this.setState({
        company: value
      }, () => this.filterStart());
  }
  
  componentDidMount() {
    this.props
      .fetchUsers()
      .then(() => this.setState({ users: this.props.users }));
  }
  render() {
    return (
      <div className="container" ref={this.top}>
        <form className="mb-2">
          <div className="form-group">
            <input
              className="mt-5 col-12"
              id="filterInput"
              name="filterInput"
              type="text"
              placeholder="Search"
              onChange={this.setNameParametr}
            />
          </div>
          <div className="form-row small d-flex justify-content-between text-left text-lg-center">
            <div className="form-group text-left px-1 col-4">
              <FilterItem
                name="male"
                onChange={this.onChange}
                gender={this.state.gender}
                divider="true"
              />
              <FilterItem
                name="female"
                onChange={this.onChange}
                gender={this.state.gender}
                divider="true"
              />
            <FilterItem
                name="not specifed"
                onChange={this.onChange}
                gender={this.state.gender}
              />
            </div>
            <div className="form-group col-sm-5">
              <label htmlFor="from">age from</label>
              <input
                type="number"
                min="18"
                max="40"
                id="from"
                className="mx-1 px-1"
                style={{ width: "50px" }}
                onChange={this.setAgeParametr}
                defaultValue="18"
              />
              <label htmlFor="to">to</label>
              <input
                type="number"
                min={this.state.ageFrom}
                max="40"
                id="to"
                className="ml-1 px-1"
                style={{ width: "50px" }}
                onChange={this.setAgeParametr}
                defaultValue="40"
              />
            </div>
            <div className="form-group d-flex align-self-baseline col-sm-3">
              <label className="ml-sm-auto pt-2" htmlFor="work">
                works for
              </label>
              <input type="text" id="work" className="mx-1 col-3 px-1" onChange={this.setWorkParametr}/>
            </div>
          </div>
        </form>
        <Display
         users={this.state.users}
         isLoading={this.props.isLoading}
         currentPage={this.state.currentPage}
         changeCurrentPage={this.changeCurrentPage}
         scroll={this.scroll}
         lastPage={this.lastPage}/>
      </div>
    );
  }
}

export default FilterComponent;
