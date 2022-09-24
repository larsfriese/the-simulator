import React from "react";
import Matter from "matter-js";

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {worldTime: 0, timeRelative: 0};
  }

  lorentzFactor(v) {
    var c = 2;
    var abs_v = Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2));
    return (1 / (Math.sqrt(1 - (Math.pow(abs_v,2) / Math.pow(c,2)))));
  }

  handleChange(lastDelta, v) {
    this.setState({
      timeRelative: lastDelta * (1 / this.lorentzFactor(v)),
      worldTime: lastDelta
    });
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({
      // positionIterations: 20
    });

    var window_width = 700;
    var window_height = 700;

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: window_width,
        height: window_height,
        wireframes: false,
        showVelocity: true
      }
    });

    engine.world.gravity.y = 0.0;

    var sc1 = Bodies.rectangle(window_width / 2, (window_height / 2) + 200, 50, 50, { restitution: 0.0, frictionAir: 0.0, });
    var sc2 = Bodies.rectangle(window_width / 2, window_height / 2, 50, 50, { restitution: 0.0, frictionAir: 0.0, isStatic: true });
    Matter.Body.setVelocity(sc1, Matter.Vector.create(0.21*190, 0))

    // walls
    var width_wall = 100;

    World.add(engine.world, [
      // up
      Bodies.rectangle(0, -(width_wall / 2), window_width * 2, width_wall, { isStatic: true }),
      // down
      Bodies.rectangle(0, window_height + (width_wall / 2), window_width * 2, width_wall, { isStatic: true }),
      // right
      Bodies.rectangle(window_width + (width_wall / 2), window_width, width_wall, window_height * 2, { isStatic: true }),
      // left
      Bodies.rectangle(0 - (width_wall / 2), 0, width_wall, window_height * 2, { isStatic: true })
    ]);

    World.add(engine.world, [sc1, sc2]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 1,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      // if (mouseConstraint.body == sc1) {
      //  alert(mouseConstraint.body);
      // }
    });

    var timeRelative = 0;
    var timeWorld = 0;
    var divVel = document.getElementById('velocity');

    Matter.Events.on(engine, 'afterUpdate', function(event) {

      var delta = engine.timing.lastDelta;

      // apply force for circular motion
      var vf = 0.21;
      var radius = Matter.Vector.sub(sc2.position, sc1.position)
      var abs = (sc1.mass * Math.pow(vf, 2)) / Math.sqrt(Math.pow(radius.x, 2) + Math.pow(radius.y, 2));
      console.log(Matter.Vector.mult(radius, abs));
      sc1.force = Matter.Vector.mult(radius, abs);
      

      // relativistic effect
      var c = 100;
      var v = sc1.velocity
      var abs_v = Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2));
      var lf = 1 / (Math.sqrt(1 - (Math.pow(abs_v,2) / Math.pow(c,2))));

      timeRelative += delta * (1 / lf)
      timeWorld += delta

      // paste to screen
      divVel.innerHTML = 'World Time:  ' + Math.round(timeWorld / 10) / 100 +
      '<br>Relativ Time:' + Math.round(timeRelative / 10) / 100 + '<br>';
    });
    
    Matter.Runner.run(engine);
    Render.run(render);

  }

  render() {
    return (
    <><div ref="scene" />

    <div id='velocity'>
    </div></>
    )
  }
}
export default Scene;