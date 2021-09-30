import React, { useMemo } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";
import { getHeroById } from "../../selectors/getHeroById";

// const heroImages = require.context("../../assets/heroes/", true);

export const HeroScreen = ({ history }) => {
  const { heroeid } = useParams();
  const hero = useMemo(() => getHeroById(heroeid), [heroeid])

  // const hero = getHeroById(heroeid);

  if (!hero) {
    return <Redirect to="/" />;
  }

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push("2");
    } else {
      history.goBack();
    }
  };

  const {  superhero, alter_ego, first_appearance, characters, publisher } =
    hero;

    console.log(heroeid);
  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={heroImages(`./${heroeid}.jpg`).default}
          alt={superhero}
          className="img-thumbnail"
        />
      </div>
      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego:</b> {alter_ego}
          </li>
          <li className="list-group-item">
            <b>publisher:</b> {publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance:</b> {first_appearance}
          </li>
        </ul>
        <h5>Characters</h5>
        <p>{characters}</p>

        <button className="btn btn-outline-info" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};
