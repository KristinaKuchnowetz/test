import React from 'react';
import Form from "./Form"
import Scene from "./Scene"

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: undefined,
            geometry: undefined
        };
    }


    startCreating = (data) => {
        this.setState({
            form: data.form.value,
            geometry: data.geometry
        })
    }



    render() {
        const { form, geometry } = this.state;


        return (
            <div>
                <Form receiveData={this.startCreating} />
                {form && geometry && <Scene form={form} geometry={geometry} />}
            </div>
        );
    }
}