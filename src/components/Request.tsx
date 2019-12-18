import React, {Component, Fragment} from 'react';
import {HttpMethod} from '../domain/HttpMethod';

interface Props {onResponseChange: (response: string) => void}

interface State {
    method: HttpMethod;
    url: string;
}

export default class Request extends Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {method: HttpMethod.GET, url: "https://jsonplaceholder.typicode.com/todos/1"};
    }

    executeRequest = () => fetch(this.state.url)
        .then(response => response.json())
        .then(json => this.props.onResponseChange(JSON.stringify(json)))
        .catch(error => alert(error))

    render = () => (
        <Fragment>
            Request :
            <div>
                <select>
                    {Object.keys(HttpMethod).map(method => (<option>{method}</option>))}
                </select>
                <input type="text" value={this.state.url} />
                    <button onClick={this.executeRequest}>GO !</button>
            </div>
        </Fragment>
    )
}
