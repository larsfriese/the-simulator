import React from 'react';

// three.js and orbit controls
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// style for the simulation box
const style_simulation = {
    height: 300,
    width: '100%',
    border: '1px solid lightgrey',
};

const ceiling = 5;
var time = 0;
var delta = 0;
const g = -9.81;
const U = 10; // starting velocity

// Simulation
class Sim extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose(); 
    }

    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        const white = new THREE.Color( 0xffffff );
        this.scene.background = white;
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls( this.camera, this.mount );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref
    };

    // Here should come custom code.
    // Code below is taken from Three.js BoxGeometry example
    // https://threejs.org/docs/#api/en/geometries/BoxGeometry
    addCustomSceneObjects = () => {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );

        this.cube1 = new THREE.Mesh( geometry, material );
        this.cube2 = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube1 );
        this.scene.add( this.cube2 );

        var grid = new THREE.GridHelper(100, 100);
        this.scene.add(grid);

        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );
        
        this.clock = new THREE.Clock();

        // set the cameras initial position
        var null_vector = new THREE.Vector3(0,0,0);
        this.controls.target = null_vector;
        this.camera.position.x = 7;
        this.camera.position.y = 7;
        this.camera.position.z = 7;
    };

    startAnimationLoop = () => {
        delta = this.clock.getDelta();
        time += delta;

        var M = this.props.m1 + this.props.m2;
        var k = this.props.k;
        var L = this.props.L;
        var b = (U/L);

        var z = ((M/k)*g)*(Math.cos(b*time)-1);
        
        var m2_pos = new THREE.Vector3((U/b)*Math.cos((U/L)*time), -z+ceiling, (U/b)*Math.sin((U/L)*time));
        this.cube2.position.set(m2_pos.x, m2_pos.y, m2_pos.z);
        
        var m1_pos = new THREE.Vector3(0,-z+ceiling,0);
        this.cube1.position.set(m1_pos.x, m1_pos.y, m1_pos.z);

        this.renderer.render( this.scene, this.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };

    render() {
        return (
            <>
                <div style={style_simulation} className='center100' ref={ref => (this.mount = ref)} />
            </>
        );
    }
}

export default Sim
