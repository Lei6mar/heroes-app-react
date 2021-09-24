import React from 'react'
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {
  const {heroeid} = useParams();
  const hero = getHeroById(heroeid)
  if(!hero){
    return <Redirect to="/"/>
  }
  const {
    id,
  superhero,
  alter_ego,
  first_appearance,
  characters,
  } = hero
  return (
    <div>
      <h1>HeroScreen</h1>
    </div>
  )
}
