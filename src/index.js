import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import FilterContainer from "./containers/FilterContainer";

import { store } from "./store/store";

import "./styles.css";

function App() {
  return (
    <Provider store={store}>
      <FilterContainer />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
