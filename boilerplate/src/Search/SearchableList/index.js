import React from "react";
import { connect } from "react-redux";
import styles from "./styles.scss";
import Search from "../";
import { Link } from "react-router-dom";

export const SearchableList = ({ items, onClick, showSearch = true }) => (
  <>
    {showSearch && <Search />}
    {items.length > 0 ? (
      <ul className={styles.TextList}>
        {items.map(item => (
          <li key={item.label}>
            {item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <button
                onClick={event => {
                  event.preventDefault();
                  item.onClick ? item.onClick() : onClick(item.label);
                }}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <h1>
        We can't find anyone who matches your search, try being less specific
      </h1>
    )}
  </>
);

const mapStateToProps = ({ search: { term } }, { items }) => ({
  items: term
    ? items.filter(
        item =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(term) > -1
      )
    : items
});

export default connect(mapStateToProps)(SearchableList);
