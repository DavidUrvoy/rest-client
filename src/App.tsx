import React from 'react';
import './App.css';
import Request from './components/Request';
import {Response} from './components/Response';

interface Props {}

interface State {responseBody: string}

export default class App extends React.Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {responseBody: ''}
    }

    onResponseChange = (responseBody: string) => this.setState({responseBody})

    render = () => (
        <div className="divStyle">
            <Request onResponseChange={this.onResponseChange}></Request>
            <Response body={this.state.responseBody}></Response>
        </div>
  );
}

