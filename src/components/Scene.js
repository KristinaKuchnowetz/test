import React from 'react';
import * as THREE from "three";

var scene
var camera
var renderer
var controls

export default class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }


    componentDidMount() {
        console.log(this.props)
        this.createScene(this.props.form, this.props.geometry)
    }

    createFigure = (str, s) => {
        if (str === "Box") {
            let geometry = new THREE.BoxGeometry(s, s, s);
            let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            let cube = new THREE.Mesh(geometry, material);

            let copy = [...this.state.list];
            copy.push({id: cube.uuid})
            this.setState({
                list: copy
            })
            return cube
        } else if (str = "Sphere") {
            let geometry = new THREE.SphereGeometry(s, s, s);
            let material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            let sphere = new THREE.Mesh(geometry, material);

            let copy = [...this.state.list];
            copy.push({id: sphere.uuid})
            this.setState({
                list: copy
            })
            return sphere
        } else {
            let geometry = new THREE.ConeGeometry(s, s, s);
            let material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            let cone = new THREE.Mesh(geometry, material);

            let copy = [...this.state.list];
            copy.push({id: cone.uuid})
            this.setState({
                list: copy
            })
            return cone
        }
    }

    createScene = (f, g) => {
        if (!scene) {
            scene = new THREE.Scene();
        }

        if (!camera) {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        }

        if (!renderer) {
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
        }

        if(!controls){
            // controls = new OrbitControls( camera, renderer.domElement );
        }


        let result = this.createFigure(f, g);
        scene.add(result);
        result.position.set(Math.random(),Math.random(),Math.random())

        camera.position.z = 5;
        // controls.update();
        let animate = function () {
            requestAnimationFrame(animate);
            result.rotation.x += 0.01;
            result.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.form !== nextProps.form) {
            this.createScene(nextProps.form, nextProps.geometry)
        }
    }


    removeFigure = (e) => {
        let obj, i;
        if (scene.children.length > 0) {
            for (i = scene.children.length - 1; i >= 0; i--) {
                if(scene.children[i].uuid === e){
                    obj = scene.children[i];
                    scene.remove(obj);

                    let copy = [...this.state.list]
                    let index = copy.indexOf(e)
                    copy.splice(index, 1)
                    this.setState({
                        list: copy
                    })
                }
            }
        }

    }

    render() {
        let { list } = this.state;

        return (
            <div>
                <div ref={ref => (this.mount = ref)} >

                </div>
                {list && list.length > 0 && list.map(x => 
                <div key={x.id} style={{display: "flex"}}>
                    <p>{x.id}</p>
                    <button onClick={() => this.removeFigure(x.id)}>Delete</button>
                </div>)}
            </div>
        );
    }
}