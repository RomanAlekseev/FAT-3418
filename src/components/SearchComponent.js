import * as React from "react";
import Display from "./Display";

class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "all",
      name: "",
      ageFrom: 18,
      ageTo: 40,
      boss: "",
      users: []
    };
    this.onChange = this.onChange.bind(this);
    this.filterByAge = this.filterByAge.bind(this);
    this.filterByName = this.filterByName.bind(this);
    this.filterByBoss = this.filterByBoss.bind(this);
    this.filterStart = this.filterStart.bind(this);
  }
  filterStart() {
    let arr = this.props.users;
    let from = this.state.ageFrom;
    let to = this.state.ageTo;
    let gender = this.state.gender;
    let pattern = new RegExp("\\b" + this.state.name, "gi");
    let pattern2 = new RegExp("\\b" + this.state.boss, "gi");
    let newArr =
      gender === "female"
        ? arr.filter(function(person) {
            return (
              person.gender === "female" &&
              person.name.match(pattern) &&
              person.company.match(pattern2) &&
              person.age >= from &&
              person.age <= to
            );
          })
        : gender === "male"
        ? arr.filter(function(person) {
            return (
              person.gender === "male" &&
              person.name.match(pattern) &&
              person.company.match(pattern2) &&
              person.age >= from &&
              person.age <= to
            );
          })
        : arr.filter(function(person) {
            return (
              person.name.match(pattern) && person.company.match(pattern2) && person.age >= from && person.age <= to
            );
          });
    this.setState({ users: newArr });
  }
  onChange = e => {
    let target = e.target.id;
    if (target === "all") {
      return this.setState(
        {
          gender: "all"
        },
        () => this.filterStart()
      );
    }
    // let arr = this.props.users;
    // let newArr =
    //   e.target.id === "male"
    //     ? arr.filter(function(person) {
    //         return person.gender === "male";
    //       })
    //     : arr.filter(function(person) {
    //         return person.gender === "female";
    //       });
    this.setState(
      {
        gender: target
      },
      () => this.filterStart()
    );
  };
  filterByAge(e) {
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
    this.setState(
      {
        ageFrom: from,
        ageTo: to
      },
      () => this.filterStart()
    );
  }
  filterByName(e) {
    const value = e.target.value;
    // let arr = this.props.users;
    // //console.log(value);
    // let newUsers = [];
    // let pattern = new RegExp("\\b" + value, "gi");
    // this.props.users.map((item, i) => {
    //   item.name.match(pattern) ? newUsers.push(arr[i]) : null;
    // });
    this.setState(
      {
        name: value
      },
      () => this.filterStart()
    );
  }
  filterByBoss(e){
    const value = e.target.value;
    this.setState(
      {
        boss: value
      },
      () => this.filterStart()
    );
  }
  componentDidMount() {
    this.props
      .fetchUsers("http://www.mocky.io/v2/5cab54d63000007e19904ac6")
      .then(() => this.setState({ users: this.props.users }));
  }
  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <input
              className="mt-5 col-12"
              id="filterInput"
              name="filterInput"
              type="text"
              placeholder="Search"
              onChange={this.filterByName}
            />
          </div>
          <div className="form-row small d-flex justify-content-between text-left text-lg-center">
            <div className="form-group text-left px-1 col-4">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input d-none"
                  type="checkbox"
                  name="male"
                  checked={this.state.male}
                  onChange={this.onChange}
                  id="male"
                />
                <label
                  className={
                    this.state.gender !== "male"
                      ? "form-check-label text-muted"
                      : "form-check-label"
                  }
                  htmlFor="male"
                >
                  male
                </label>
                <span className="pl-2">/</span>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input d-none"
                  type="checkbox"
                  id="female"
                  name="female"
                  checked={this.state.female}
                  onChange={this.onChange}
                />
                <label
                  className={
                    this.state.gender !== "female"
                      ? "form-check-label text-muted"
                      : "form-check-label"
                  }
                  htmlFor="female"
                >
                  female
                </label>
                <span className="pl-2">/</span>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input d-none"
                  type="checkbox"
                  id="all"
                  name="every"
                  checked={this.state.male || this.state.female ? false : true}
                  onChange={this.onChange}
                />
                <label
                  className={
                    this.state.gender !== "all"
                      ? "form-check-label text-muted"
                      : "form-check-label"
                  }
                  htmlFor="all"
                >
                  not specifed
                </label>
              </div>
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
                onChange={this.filterByAge}
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
                onChange={this.filterByAge}
                defaultValue="40"
              />
            </div>
            <div className="form-group d-flex align-self-baseline col-sm-3">
              <label className="ml-sm-auto pt-2" htmlFor="work">
                works for
              </label>
              <input type="text" id="work" className="mx-1 col-3 px-1" onChange={this.filterByBoss}/>
            </div>
          </div>
        </form>
        <Display users={this.state.users} />
      </div>
    );
  }
}

export default FilterComponent;
