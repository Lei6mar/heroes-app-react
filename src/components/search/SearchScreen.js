import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { useMemo } from "react";

export const SearchScreen = ({ history }) => {
  const location = useLocation();

  // console.log(location.search);
  const { q = "" } = queryString.parse(location.search);

  // const heroesFiltered = heroes;
  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });
  const { searchText } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
    console.log(searchText);
  };
  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Find your Hero"
              className="form-control"
              name="searchText"
              value={searchText}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" && <div className="alert alert-info">Search a Hero</div>}

          {(q !== '' && heroesFiltered.length === 0) && <div className="alert alert-danger">Not Heroes with {q}</div>}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
