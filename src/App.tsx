import React from 'react';
import './App.scss';
import Request from './components/http/Request';
import {Response} from './components/http/Response';
import Menu from './components/menu/Menu';
import HttpRequest from './domain/HttpRequest';
import {Header} from './domain/Header';
import {HttpMethod} from './domain/HttpMethod';

interface Props {}

interface State {requests: HttpRequest[], responseBody: string}

export default class App extends React.Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {requests: [], responseBody: ''}
    }

    componentDidUpdate = () => console.log({state: this.state})

    handleWorkspaceLoad = (requests: HttpRequest[]) => this.setState({requests})

    setHeader = (index: number, {key, value}: Header) => this.setState((state: State, {headers}) => ({headers: headers.set(key, value)}))
    deleteHeader = (key: string): boolean => {
        const headers = new Map(this.props.headers)
        const deleted = headers.delete(key)
        this.setState({headers})
        return deleted
    }

    handleUrlChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({url: (event.target as HTMLTextAreaElement).value})

    handleRequestBodyChange = (event: React.FormEvent<HTMLTextAreaElement>) => this.setState({body: (event.target as HTMLTextAreaElement).value})

    handleHttpMethodChange = (event: React.FormEvent<HTMLSelectElement>) => this.setState({method: (event.target as HTMLSelectElement).value as HttpMethod})

    handleResponseChange = (responseBody: string) => this.setState({responseBody})

    render = () => {
        return (
            <div className="app">
                <Menu handleWorkspaceLoad={this.handleWorkspaceLoad} />
                <div className="rest-form">
                    {
                        this.state.requests.map(({url, method, body, headers}, index) =>
                            <Request onResponseChange={this.handleResponseChange} id={index} url={url} method={method} body={body} headers={headers} />
                        )
                    }
                    <Response body={this.state.responseBody} />
                </div>
            </div>
        )
    }
}

