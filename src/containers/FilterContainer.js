import { connect } from "react-redux";
import FilterComponent from "../components/SearchComponent";
import { fetchUsers } from "../actions/actions";

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
}
const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponent);

export default FilterContainer;
