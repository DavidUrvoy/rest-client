import React from 'react';
import './App.scss';
import Request from './components/Request';
import {Response} from './components/Response';
import {HttpRequest, EMPTY_REQUEST} from './domain/HttpRequest';

interface Props {}

interface State {request: HttpRequest, responseBody: string}

export default class App extends React.Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {responseBody: '', request: EMPTY_REQUEST}
    }
    
    executeRequest = () => fetch(this.state.request.url, {
        ...this.state.request,
        mode: 'cors',
        cache: 'default',
        headers: Array.from(this.state.request.headers.entries())
    })
        .then(response => response.json())
        .then(json => this.setState({responseBody: JSON.stringify(json, undefined, 4)}))
        .catch(error => this.setState({responseBody: error}))

    render = () => (
        <div className="rest-form">
            <Request />
            <Response body={this.state.responseBody} />
            <button onClick={this.executeRequest}>GO</button>
        </div>
  );
}

