import React from 'react'

export default function Navbar_analyticalMechanics(props) {
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light">Learn Mechanics</div>
        <div className="list-group list-group-flush">
            { props.active === '1' ? <a className="list-group-item list-group-item-action list-group-item-light p-3 active" href="/analytical-mechanics/spring-and-rotating-mass">Spring and rotating mass</a> : <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/analytical-mechanics/spring-and-rotating-mass">Spring and rotating mass</a> }
            { props.active === '2' ? <a className="list-group-item list-group-item-action list-group-item-light p-3 active" href="/analytical-mechanics/spring-and-rotating-mass">Rotating circular wire</a> : <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/analytical-mechanics/spring-and-rotating-mass">Rotating circular wire</a> }
        </div>
    </div>
  )
}
