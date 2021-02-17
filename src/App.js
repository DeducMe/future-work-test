import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './css/style.css';
import './css/global.css';
import './css/normalize.css';
import './fonts/stylesheet.css';
import './css/media.css';


export default class App extends Component {
  render() {
    return (
      <Link to="/table" className="f-medium semi link-anim nav-el">Таблица</Link>
    )
  }
}
