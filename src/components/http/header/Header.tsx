import React, {Component} from 'react';
import {Header as HeaderType} from '../../../domain/Header';

interface Props {header: HeaderType, set: (header: HeaderType) => void, delete: (key: string) => void}
interface State {key: string, value: string, editing: boolean}

export default class Header extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props)
        this.state = {...props.header, editing: false}
    }
    
    handleKeyBlur = (key: string) => {
        if (!!key && key !== this.props.header.key) {
            this.props.delete(this.props.header.key)
            this.props.set({key, value: this.props.header.value})
        }
        this.blur()
    }
    
    handleValueBlur = (value: string) => {
        if (!!value && value !== this.props.header.value) {
            this.props.set({key: this.props.header.key, value})
        }
        this.blur()
    }

    private blur = () => {
        const {key, value} = this.props.header
        if (!!key && !!value) {
            this.setState({editing: false})
        }
    }

    render = () => (
        <React.Fragment>
            {this.state.editing ?
                <span style={{width: '100%', display: 'flex'}}>
                    <input
                        type="text"
                        placeholder={'key'}
                        onBlur={() => this.handleKeyBlur(this.state.key)}
                        value={this.state.key}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => this.setState({key: (event.target as HTMLInputElement).value})} />
                    <input
                        type="text"
                        placeholder={'value'}
                        onBlur={() => this.handleValueBlur(this.state.value)}
                        value={this.state.value}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => this.setState({value: (event.target as HTMLInputElement).value})} />
                </span>
                :
                <span>
                    <label onClick={() => this.setState({editing: true})}>{this.props.header.key}</label>
                    <label onClick={() => this.setState({editing: true})}>{this.props.header.value}</label>
                </span>
            }
        </React.Fragment>
    )
}

