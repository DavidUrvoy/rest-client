import React, {Component} from 'react';
import {HttpMethod} from '../../domain/HttpMethod';
import './HttpForms.scss';
import ListHeaders from './header/ListHeaders';
import HttpRequest from '../../domain/HttpRequest';
//import Header from './header/Header';

type Props = {id: number, onResponseChange: (response: string) => void} & HttpRequest
interface State {}

export default class Request extends Component<Props, State> {

    // todo to be removed
    //setHeader = ({key, value}: Header) => this.setState(({headers}) => ({headers: headers.set(key, value)}))
    deleteHeader = (key: string): boolean => {
        const headers = new Map(this.props.headers)
        const deleted = headers.delete(key)
        this.setState({headers})
        return deleted
    }

    handleUrlChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({url: (event.target as HTMLTextAreaElement).value})

    handleRequestBodyChange = (event: React.FormEvent<HTMLTextAreaElement>) => this.setState({body: (event.target as HTMLTextAreaElement).value})

    handleHttpMethodChange = (event: React.FormEvent<HTMLSelectElement>) => this.setState({method: (event.target as HTMLSelectElement).value as HttpMethod})

    executeRequest = () => fetch(this.props.url, {
        ...this.props,
        mode: 'cors',
        cache: 'default',
        headers: Array.from(this.props.headers.entries())
    })
        .then(response => response.json())
        .then(json => this.props.onResponseChange(JSON.stringify(json, undefined, 4)))
        .catch(error => this.props.onResponseChange(error))

    render = () => {
        const bodyless = this.props.method === 'GET' || this.props.method === 'HEAD'
        return (
        <div className="form-bloc">
            Request :
            <div>
                <select onChange={this.handleHttpMethodChange}>
                    {Object.keys(HttpMethod).map((method, i) => (<option key={i}>{method}</option>))}
                    </select>
                    <input type="text" value={this.props.url} onChange={this.handleUrlChange} />
                    <button onClick={this.executeRequest}>GO !</button>
                </div>
                <ListHeaders headers={this.props.headers} setHeader={this.setHeader} deleteHeader={this.deleteHeader} />
                <textarea onChange={this.handleRequestBodyChange} className="json-body" disabled={bodyless}></textarea>
        </div>
        )
    }
}

