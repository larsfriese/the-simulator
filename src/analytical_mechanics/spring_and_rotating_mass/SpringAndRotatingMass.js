import React, { useState } from 'react';

// sliders and jquery
import { Slider } from '@mui/material';

// math
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// dynamic equations
import ChangingEquations from './ChangingEquations';

// simulation
import Sim from './Sim';

// resourcess
import Image1 from "../../assets/wavy_pendulum.jpg";

// values for the simulation
var U = 10; // starting velocity
var L = 9; // distance between m1 and m2
var k = 10; // spring constant
var m1 = 1;
var m2 = 1;
// test comment

var M = m1 + m2;
var b = (U/L);

export default function SpringAndRotatingMass() {
    const [values, setValues] = useState({m1, m2, k, L})

    // Update values
    const updateMass1=(e,data)=>{
        m1 = data
        M = m1 + m2
        setValues( prevState => {
            return [{m1: m1}]
        })
    }

    const updateMass2=(e,data)=>{
        m2 = data
        M = m1 + m2
        setValues( prevState => {
            return [{m2: m2}]
        })
    }
    
    const updateSpringConstant=(e,data)=>{
        k = data
        setValues( prevState => {
            return [{k: k}]
        })
    }
    
    const updateRodLength=(e,data)=>{
        L = data
        b = (U/L)
        setValues( prevState => {
            return [{L: L}]
        })
    }

    // marks for the sliders
    const marks_m = [
        {
          value: 5,
          label: '5 kg',
        },
        {
          value: 10,
          label: '10 kg',
        },
        {
          value: 15,
          label: '15 kg',
        },
    ];

    const marks_sk = [
        {
          value: 10,
          label: '10 N/m',
        },
        {
          value: 20,
          label: '20 N/m',
        },
        {
          value: 30,
          label: '30 N/m',
        },
    ];

    const marks_rl = [
        {
          value: 10,
          label: '10 m',
        },
        {
          value: 20,
          label: '20 m',
        },
        {
          value: 30,
          label: '30 m',
        },
    ];

    return (
        <>
        <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div className="container-fluid">
                    <button className="btn btn-primary" id="sidebarToggle">Toggle Menu</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                            <li className="nav-item active"><a className="nav-link" href="../home">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="topics.html">Topics overview</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#!">Save solution as pdf</a>
                                    <a className="dropdown-item" href="#!">Report</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#!">Upvote</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">

                <div className="container">
                    <div className="row">

                        {/* Column with the derivation and explanation */}
                        <div className="col-sm" style={{marginTop: 2 + 'em'}}>

                            <h4>Problem</h4>

                            <img src={Image1} className="center" alt="."/>

                            <div className="card mb-4 mt-4">
                                <div className="card-body">
                                    <p>1. Determine the Lagrange-Function</p>
                                    <p>
                                        <button className="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSolution1" aria-expanded="false" aria-controls="collapseSolution1">
                                            Toggle Solutions
                                        </button>
                                    </p>
                                    <div className="collapse" id="collapseSolution1">

                                        <InlineMath>{'\\text{We will use the generalised coordinates} ~ (q_1,q_2) = (z, \\phi):'}</InlineMath> <br /><br />
                                        <InlineMath>{'V_g = (m_1+m_2)gl_f'}</InlineMath><br/>
                                        <InlineMath>{'V = -\\frac{1}{2}kz^2 + (m_1+m_2)gz'}</InlineMath><br/>
                                        <InlineMath>{'T_{spring} = \\frac{1}{2}m_2 \\dot{z}^2'}</InlineMath><br/>
                                        <InlineMath>{'T_{rotate} = \\frac{m_2}{2}(\\dot{\\phi}L^2 + \\dot{z^2})'}</InlineMath><br/>
                                        <InlineMath>{'T = \\frac{1}{2}kz^2 + \\frac{m_2}{2}(\\dot{\\phi}L^2 + \\dot{z^2})'}</InlineMath><br/><br/>
                                        <InlineMath>{'\\text{The Lagrange equation is therefore:}'}</InlineMath><br/>
                                        <InlineMath>{'L = T - V = \\frac{1}{2}kz^2 + \\frac{m_2}{2}(\\dot{\\phi}L^2 + \\dot{z^2}) + \\frac{1}{2}kz^2 - (m_1+m_2)gz'}</InlineMath><br/>

                                    </div>
                                </div>
                            </div>

                            <div className="card mb-4">
                                <div className="card-body">
                                    <p>2. Determine the equation of motion with the help of the Euler-Lagrange-Equations</p>
                                    <p>
                                        <button className="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSolution2" aria-expanded="false" aria-controls="collapseSolution2">
                                            Toggle Solutions
                                        </button>
                                    </p>
                                    <div className="collapse" id="collapseSolution2">
                                        
                                        <InlineMath>{'\\text{Now we can derive the equation of}'}</InlineMath> <br />
                                        <InlineMath>{'\\text{motion using the Euler-Lagrange Equation:}'}</InlineMath> <br /><br />
                                        <BlockMath>{'\\frac{d}{dt} \\frac{∂ L}{∂ \\dot{q^f}} - \\frac{∂ L}{∂ q^f} = 0,   f \\in \\{1, 2\\}'}</BlockMath><br/><br/>
                                        <InlineMath>{'1.\\quad \\frac{d}{dt} \\frac{∂ L}{∂ \\dot{\\phi}} - \\frac{∂ L}{∂ \\phi} = \\frac{d}{dt}(m_2 \\dot{\\phi} L^2)=m_2 \\ddot{\\phi} L^2 = 0'}</InlineMath><br/><br/>
                                        <InlineMath>{'\\implies \\boxed{\\ddot{\\phi}=0} \\implies \\phi=a+bt'}</InlineMath><br/><br/>
                                        <InlineMath>{'2.\\quad \\frac{d}{dt} \\frac{∂ L}{∂ \\dot{z}} - \\frac{∂ L}{∂ z} = \\frac{d}{dt}(m_1 \\dot{z} + m_2 \\dot{z}) + Mg + kz = (m_1 + m_2)\\ddot{z} + (m_1 + m_2)g + kz'}</InlineMath><br/><br/>
                                        <InlineMath>{'\\implies \\boxed{\\ddot{z}=-g-\\frac{k}{m_1 + m_2}z}'}</InlineMath><br/>
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-4">
                                <div className="card-body">
                                    <p>3. Determine the general solutions</p>
                                    <p>
                                        <button className="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSolution3" aria-expanded="false" aria-controls="collapseSolution3">
                                            Toogle Solutions
                                        </button>
                                    </p>
                                    <div className="collapse" id="collapseSolution3">

                                        <InlineMath>{'\\text{As you can see the second differential}'}</InlineMath>
                                        <InlineMath>{'\\text{equation is inhomogenus, which means we will}'}</InlineMath>
                                        <InlineMath>{'\\text{have to find the solution of the homogenus}'}</InlineMath>
                                        <InlineMath>{'\\text{equation and a specific solution for the inhomogenus equation.}'}</InlineMath><br /><br />
                                        <InlineMath>{'z=A sin(w_0 t)+B cos(w_o t)'}</InlineMath><br />
                                        <InlineMath>{'\\ddot{z}=-w^2t \\implies w=\\sqrt{\\frac{k}{m_1 + m_2}}'}</InlineMath><br /><br />
                                        <InlineMath>{'\\implies \\boxed{z = A sin(\\sqrt{\\frac{k}{m_1 + m_2}} t)+B cos(\\sqrt{\\frac{k}{m_1 + m_2}} t)}'}</InlineMath><br/>
                                        
                                    </div>
                                </div>
                            </div>
                            
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p>4. Determine the specific solutions for the following starting conditions:<br/>
                                    <InlineMath>{'\\vec r_1(t=0)=(0,0,0), \\vec r_2(t=0)=(L,0,0)'}</InlineMath><br/>
                                    <InlineMath>{'\\dot{\\vec{r_1}}(t=0)=(0,0,0), \\dot{\\vec{r_2}}(t=0)=(0,u,0)'}</InlineMath><br/>
                                    (Length of rod is L, starting velocity of M2 is u)</p>
                                    <p>
                                        <button className="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSolution4" aria-expanded="false" aria-controls="collapseSolution4">
                                            Toogle Solutions
                                        </button>
                                    </p>
                                    <div className="collapse" id="collapseSolution4">

                                        <InlineMath>{'\\ddot{z}=-g-\\frac{kz}{M} \\text{(Equation of motion from 2.)} (M=m_1+m_2)'}</InlineMath><br />
                                        <InlineMath>{'\\lrArr M\\ddot{z}=-Mg-kz'}</InlineMath><br /><br />
                                        <InlineMath>{'\\text{Because z is inhomogenus, it can be written as } z_{hom} + z_{specific}.'}</InlineMath><br />
                                        <InlineMath>{'M\\ddot{z}_{hom} + M\\ddot{z}_{sp} + k z_{hom} + k z_{sp} = Mg'}</InlineMath><br />
                                        <InlineMath>{'\\underbrace{M\\ddot{z}_{hom} + k z_{hom}}_{\\text{=0}}  \\underbrace{M\\ddot{z}_{sp}}_{\\text{=0}} + k z_{sp} = Mg'}</InlineMath><br />
                                        <InlineMath>{'\\implies z_{sp}(t) = -\\frac{M}{k}g'}</InlineMath><br /><br />
                                        <InlineMath>{'z(t) = z_{hom}(t) + z_{sp}(t) = A sin(\\sqrt{\\frac{k}{m_1 + m_2}} t)+B cos(\\sqrt{\\frac{k}{m_1 + m_2}} t) + -\\frac{M}{k}g'}</InlineMath><br />
                                        <InlineMath>{'\\dot{z}(t) = A \\sqrt{\\frac{k}{m_1 + m_2}} cos(\\sqrt{\\frac{k}{m_1 + m_2}} t) + B \\sqrt{\\frac{k}{m_1 + m_2}} sin(\\sqrt{\\frac{k}{m_1 + m_2}} t)'}</InlineMath><br /><br />
                                        
                                        <InlineMath>{'\\text{We now have an equation for the z position, but still need }'}</InlineMath>
                                        <InlineMath>{'\\text{a trajectory for the individual masses:}'}</InlineMath><br /><br />
                                        
                                        <InlineMath>{'\\vec{r_1(t)} = \\begin{bmatrix} 0 \\cr 0 \\cr z \\end{bmatrix} \\vec{\\dot{r_1(t)}} = \\begin{bmatrix} 0 \\cr 0 \\cr \\dot{z} \\end{bmatrix}'}</InlineMath><br />
                                        <InlineMath>{'\\vec{r_2(t)} = \\begin{bmatrix} Lcos(\\phi) \\cr Lsin(\\phi) \\cr z \\end{bmatrix} \\vec{\\dot{r_2(t)}} = \\begin{bmatrix} -Lsin(\\phi)\\dot{phi} \\cr Lcos(\\phi)\\dot{phi} \\cr \\dot{z} \\end{bmatrix}'}</InlineMath><br />
                                        <InlineMath>{'\\vec{\\dot{r_1}}(t)^2=\\dot{z}^2, \\vec{\\dot{r_2}}(t)^2=\\dot{\\phi}^2 L^2+\\dot{z}^2'}</InlineMath><br /><br />
                                        <InlineMath>{'\\text{Now we just have to input the conditions into the above formulas:}'}</InlineMath><br />

                                        <InlineMath>{'\\vec{r_1}(0) = \\begin{bmatrix} 0 \\cr 0 \\cr z(0) \\end{bmatrix} = \\begin{bmatrix} 0 \\cr 0 \\cr 0 \\end{bmatrix} \\implies B-\\frac{Mg}{k}=0 \\implies \\boxed{B=\\frac{Mg}{k}}'}</InlineMath><br />
                                        <InlineMath>{'\\dot{\\vec{r_1}}(0) = \\begin{bmatrix} 0 \\cr 0 \\cr \\dot{z}(0) \\end{bmatrix} = \\begin{bmatrix} 0 \\cr 0 \\cr 0 \\end{bmatrix} \\implies A \\sqrt{\\frac{k}{M}}=0 \\implies \\boxed{A=0}'}</InlineMath><br />
                                        <InlineMath>{'\\implies \\boxed{z(t) = \\frac{Mg}{k}(cos(\\sqrt{\\frac{k}{M}} t)-1)}'}</InlineMath><br /><br />

                                        <InlineMath>{'\\text{Now the same for the trajectory of the second mass:}'}</InlineMath><br />
                                        <InlineMath>{'\\vec{r_2}(0) = \\begin{bmatrix} Lcos(a+bt) \\cr Lsin(a+bt) \\cr B-\\frac{Mg}{k} \\end{bmatrix} = \\begin{bmatrix} L \\cr 0 \\cr 0 \\end{bmatrix} \\implies \\begin{cases} Lcos(a)=L \\cr Lsin(a)=0 \\end{cases} \\implies \\boxed{a=0}'}</InlineMath><br />
                                        <InlineMath>{'\\vec{r_2}(0) = \\begin{bmatrix} -Lsin(bt) b \\cr Lcos(bt) b \\cr A \\frac{k}{M} \\end{bmatrix} = \\begin{bmatrix} 0 \\cr u \\cr 0 \\end{bmatrix} \\implies \\begin{cases} sin(bt)=0 \\implies bt = 0 \\cr cos(bt)=\\frac{U}{L b} \\implies 1=\\frac{U}{L b} \\implies \\boxed{b=\\frac{U}{L}} \\cr A=0 \\end{cases} '}</InlineMath><br />
                                        
                                        <InlineMath>{'\\implies \\boxed{\\vec{r_2} = \\begin{bmatrix} L cos(bt) \\cr L sin(bt) \\cr \\frac{Mg}{k}(cos(\\sqrt{\\frac{k}{M}} t)-1) \\frac{k}{M} \\end{bmatrix}}'}</InlineMath><br />


                                    </div>
                                </div>
                            </div>
                        
                        </div>

                        {/* Column with the Simulation */}
                        <div id="right" className="col-sm" style={{marginTop: 2 + 'em'}}>

                            <h4>Simulation <span data-toggle="tooltip" title="Use left-click to rotate in the scene and the mouse wheel to zoom in or out!">?</span></h4>
                            
                            <Sim m1={m1} m2={m2} k={k} L={L} />

                            <div className="card card-body" style={{marginTop: 1 + 'em'}}>

                                {/* Equation of motion that changes during simulation */}
                                <ChangingEquations m1={m1} m2={m2} k={k} L={L} U={U} />
                            
                            </div>
                            
                            <div className="card" style={{marginTop: 20 + 'px'}} >
                                <div className="card-body">

                                    Mass 1:
                                    <Slider
                                    key={'slider-mass1'}
                                    defaultValue={1}
                                    min={0}
                                    max={20}
                                    onChange={updateMass1}
                                    valueLabelDisplay='auto'
                                    marks={marks_m}/>

                                    Mass 2:
                                    <Slider
                                    key={'slider-mass2'}
                                    defaultValue={1}
                                    min={0}
                                    max={20}
                                    onChange={updateMass2}
                                    valueLabelDisplay='auto'
                                    marks={marks_m}/>

                                    Spring constant:
                                    <Slider
                                    key={'slider-spring-constant'}
                                    defaultValue={10}
                                    min={0}
                                    max={50}
                                    onChange={updateSpringConstant}
                                    valueLabelDisplay='auto'
                                    marks={marks_sk}/>

                                    Distance between Mass 1 and Mass 2:
                                    <Slider
                                    key={'slider-rod-length'}
                                    defaultValue={10}
                                    min={0}
                                    max={50}
                                    onChange={updateRodLength}
                                    valueLabelDisplay='auto'
                                    marks={marks_rl}/>

                                </div>
                            </div>
                            

                        </div>

                    </div>
                </div>

            </div>
    </div>
    </>
    )
}