import React, {Component} from 'react';
import {HttpMethod} from '../domain/HttpMethod';
import './HttpForms.scss';
import ListHeaders from './header/ListHeaders';
import {Header} from '../domain/Header';
import {EMPTY_REQUEST} from '../domain/HttpRequest';

interface Props {}
interface State {
    url: string,
    method: HttpMethod,
    body?: string,
    headers: Map<string, string>
}

export default class Request extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props)
        this.state = {...EMPTY_REQUEST}
    }

    setHeader = ({key, value}: Header) => this.setState(({headers}) => ({headers: headers.set(key, value)}))
    deleteHeader = (key: string): boolean => {
        const headers = new Map(this.state.headers)
        const deleted = headers.delete(key)
        this.setState({headers})
        return deleted
    }

    handleUrlChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({url: (event.target as HTMLTextAreaElement).value})

    handleRequestBodyChange = (event: React.FormEvent<HTMLTextAreaElement>) => this.setState({body: (event.target as HTMLTextAreaElement).value})

    handleHttpMethodChange = (event: React.FormEvent<HTMLSelectElement>) => this.setState({method: (event.target as HTMLSelectElement).value as HttpMethod})

    render = () => {
        const bodyless = this.state.method === 'GET' || this.state.method === 'HEAD'
        return (
        <div className="form-bloc">
            Request :
            <div>
                <select onChange={this.handleHttpMethodChange}>
                    {Object.keys(HttpMethod).map((method, i) => (<option key={i}>{method}</option>))}
                    </select>
                    <input type="text" value={this.state.url} onChange={this.handleUrlChange} />
                </div>
                <ListHeaders headers={this.state.headers} setHeader={this.setHeader} deleteHeader={this.deleteHeader} />
                <textarea onChange={this.handleRequestBodyChange} className="json-body" disabled={bodyless}></textarea>
        </div>
        )
    }
}

