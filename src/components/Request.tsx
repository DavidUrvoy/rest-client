import React, {Component} from 'react';
import {HttpMethod} from '../domain/HttpMethod';
import './HttpForms.scss';

interface Props {onResponseChange: (response: string) => void}

interface State {
    url: string
    method: HttpMethod
}

export default class Request extends Component<Props, State> {
    body?: string

    constructor(props: Props) {
        super(props)
        this.state = {
            url: "https://jsonplaceholder.typicode.com/todos/1",
            method: HttpMethod.GET
        }
    }

    onUrlChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({url: (event.target as HTMLTextAreaElement).value})

    onRequestBodyChange = (event: React.FormEvent<HTMLTextAreaElement>) => this.body = (event.target as HTMLTextAreaElement).value

    onHttpMethodChange = (event: React.FormEvent<HTMLSelectElement>) => (
        this.setState({
            method: (event.target as HTMLSelectElement).value as HttpMethod
        })
    )

    executeRequest = () => fetch(this.state.url, {
        ...this,
        mode: 'cors',
        cache: 'default',
        headers: new Headers({"Content-type": "application/json; charset=UTF-8"})
    })
        .then(response => response.json())
        .then(json => this.props.onResponseChange(JSON.stringify(json)))
        .catch(error => this.props.onResponseChange(error))

    render = () => {
        const bodyless = this.state.method === 'GET' || this.state.method === 'HEAD'
        return (
        <div className="form-bloc">
            Request :
            <div>
                <select onChange={this.onHttpMethodChange}>
                    {Object.keys(HttpMethod).map((method, i) => (<option key={i}>{method}</option>))}
                </select>
                <input type="text" value={this.state.url} onChange={this.onUrlChange} />
                    <button onClick={this.executeRequest}>GO !</button>
                </div>
                <textarea onChange={this.onRequestBodyChange} className="json-body" disabled={bodyless}></textarea>
        </div>
        )
    }
}
