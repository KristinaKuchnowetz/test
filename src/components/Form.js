import React from 'react';
import Select from 'react-select';

const options = [
    { value: 'Box', label: 'Box' },
    { value: 'Sphere', label: 'Sphere' },
    { value: 'Cone', label: 'Cone' },
];


export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null,
            geometry: ""
        };
    }

    handleChange = form => {
        this.setState({ form });
    };

    handleInput = (e) => {
        this.setState({ geometry: e.target.value });
    }

    sendData = (e) => {
        e.preventDefault();
        console.log(this.state.form, this.state.geometry)
        this.props.receiveData(this.state)
    }

    render() {
        const { form, geometry } = this.state;

        
        return (
            <div style={{display: "flex", justifyContent:"center", marginTop: "20px"}}>
            <form onSubmit={this.sendData} style={{display: "flex", flexDirection: "column", width: "15%"}}>
                <Select
                    value={form}
                    onChange={this.handleChange}
                    options={options}
                />
                <input type="number" min="1" max="10" value={geometry} onChange={this.handleInput} style={{margin: "10px 0 0 0 ", border: "2px solid #eee", padding: "8px 0"}}/>
                <button type="submit" style={{margin: "10px 0 20px 0", padding: "5px 0"}} disabled={form && geometry ? false : true}>Create</button>
            </form>
            </div>
        );
    }
}