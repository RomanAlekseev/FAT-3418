import * as React from "react";

export default function Display(props) {
  return (
    <div className="container">
      <h2
        className="font-weight-bold text-left mb-5"
        style={{ marginLeft: "-1rem" }}
      >
        Friends
      </h2>
      <ul className="list-unstyled person text-left my-3 d-flex flex-wrap pl-0">
        {props.users &&
          props.users.map(function(item, index) { return index < 50 ? (
              <li
                key={item.id}
                className="position-relative mb-5 col-12 col-md-6 pl-0"
                style={{ marginLeft: "-1rem" }}
              >
                <div className="icon rounded-circle position-absolute bg-secondary px-3 py-3 text-center">
                  <div className="my-auto" style={{ width: "1.5rem" }}>
                    {(function(str) {
                      var result = str.split(" ");
                      return result[0][0] + result[1][0];
                    })(item.name)}
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
                    {/* {Math.ceil(Math.random() * (72 - 18) + 18)} */}
                    {item.age} y.o.,
                  </span>
                  <span className="specifed mr-1 small"> works for {item.company}</span>
                </div>
              </li>
            ) : null;
          })}
      </ul>
    </div>
  );
}
