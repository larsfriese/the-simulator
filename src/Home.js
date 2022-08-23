import React from 'react'

export default function Home() {
  return (
    <>
    <h1 className="display-4 m-3" style={{ textAlign: "center" }}>The Simulator</h1>
    <p className="text-center mb-4">
      Down below is a list of detailed explanations to university physics problems.
    </p>

    <div className="container">
      <div className="row">
        <div className="col">
          
        </div>
      </div>
      <div className="row">
        <div className="col">
          
        </div>
        <div className="col-6">
          <div className="list-group">
            <a href="analytical-mechanics/spring-and-rotating-mass" className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Analytical Mechanics (Theoretical Physics 2nd semester)</h5>
                <small>2 sims</small>
              </div>
              <p className="mb-1">Solve mechanics problems usig the lagrange and hamilton functions.</p>
              <small>3/5 difficulty</small>
            </a>
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Special Relativity</h5>
                <small className="text-muted">1 sim</small>
              </div>
              <p className="mb-1">Detailed explanation of time and space dilation.</p>
              <small className="text-muted">4/5 difficulty</small>
            </a>
          </div>
        </div>
        <div className="col">
          
        </div>
      </div>
    </div>

    <figure className="text-center mt-4">
      <blockquote className="blockquote">
        <p>What we know is a drop, what we don’t know is an ocean.</p>
      </blockquote>
      <figcaption className="blockquote-footer">
        Isaac Newton <cite title="Source Title"></cite>
      </figcaption>
    </figure>
    </>
  )
}
