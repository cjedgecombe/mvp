import React from 'react';
import App from './app.jsx';
import './styles.css';

const CharacterInfo = (props) => {


  return (
    <div className="charDetails">
      <div>Name: {props.charDetails.name}</div>
      <div>Race: {props.charDetails.race}</div>
      <div>Gender: {props.charDetails.gender}</div>
      <div>Birth: {props.charDetails.birth}</div>
      <div>Death: {props.charDetails.death}</div>
      <div>Hair: {props.charDetails.hair}</div>
      <div>Height: {props.charDetails.height}</div>
      <div>Spouse: {props.charDetails.spouse}</div>
      <div>Realm: {props.charDetails.realm}</div>
      <div>wikiURL: <a href={props.charDetails.wikiUrl} target="_blank">{props.charDetails.wikiUrl}</a></div>
    </div>
  )
}

export default CharacterInfo;