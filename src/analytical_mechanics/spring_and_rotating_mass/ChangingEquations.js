import React from 'react'
import { BlockMath } from 'react-katex';

export default function ChangingEquations(props) {

  var b = (Math.round((props.U/props.L)*100))/100
  var M = props.m1 + props.m2
  var mk = (Math.round((M/props.k)*100))/100
  var ub = (Math.round((props.U/b)*100))/100
  var ul = (Math.round((props.U/props.L)*100))/100

  const equation = '\\vec{r_2(t)} = \\begin{bmatrix} ' + ub + ' cos(' + ul + ' t) \\cr ' + ub + 'sin(' + ul + 't) \\cr '+ mk + '\\times 9.81 \\times ' + props.L + 'cos(' + b + 't)-1) \\end{bmatrix}';

  return (
    <>
    <BlockMath>{equation}</BlockMath>
    </>
  )
}
