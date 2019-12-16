import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";
import axios from 'axios';

import "./index.css";

export default function App() {
    const {register, handleSubmit, errors} = useForm();
    const [disabled, setDisabled] = useState(false);
    const [ideas, setIdeas] = useState([]);

    const onSubmit = data => {
        setDisabled(!disabled);
        console.log(data);
        axios.post('https://4g7464tvt0.execute-api.ap-south-1.amazonaws.com/stag/hackathon', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        fetch('https://4g7464tvt0.execute-api.ap-south-1.amazonaws.com/stag/hackathon')
            .then(results => results.json())
            .then(data => {
                setIdeas(data.body.Items);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Idea Title</label>
                <input type="text" placeholder="title" name="title" ref={register({required: true})}
                       disabled={disabled}/>
                {errors.title && <p>This field is required</p>}

                <label>Your Name</label>
                <input type="text" placeholder="name" name="name" ref={register({required: true})} disabled={disabled}/>
                {errors.name && <p>This field is required</p>}

                <label>Idea Description</label>
                <input placeholder="description" name="description" ref={register({required: true})}
                       disabled={disabled}/>
                {errors.description && <p>This field is required</p>}

                <input type="submit" disabled={disabled}/>
            </form>



            <hr/>

            <table id='ideas' class="center">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                </tr>
                </thead>


                <tbody>
                {ideas.map((item, i) => {
                    return [
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                        </tr>
                    ];
                })}
                </tbody>
            </table>
        </div>

    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
