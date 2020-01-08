import React, {Component} from 'react';
import {Header as HeaderType, EMPTY_HEADER} from '../../../domain/Header';
import Header from './Header';

interface Props {headers: Map<string, string>, setHeader: (header: HeaderType) => void, deleteHeader: (key: string) => boolean}

interface State {newHeader: HeaderType, updatingHeaders: string[]}

export default class ListHeaders extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {newHeader: EMPTY_HEADER, updatingHeaders: []}
    }

    handleInputBlur = () => {
        const {newHeader: {key, value}} = this.state
        if (!!key && !!value) {
            this.props.setHeader({...this.state.newHeader})
            this.setState({newHeader: EMPTY_HEADER})
        }
    }

    handleHeaderKeyChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value: key}}) => this.setState(state => ({newHeader: {key, value: state.newHeader.value}}))

    handleHeaderValueChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => this.setState(state => ({newHeader: {key: state.newHeader.key, value}}))

    triggerUpdateHeader = (key: string) => {
        this.setState(state => ({
            updatingHeaders: [...state.updatingHeaders, key]
        }))
    }

    render = () => {
        const inputHeader = (
            <span>
                <input type="text" placeholder="key" onBlur={this.handleInputBlur} value={this.state.newHeader.key} onChange={this.handleHeaderKeyChange} />
                <input type="text" placeholder="value" onBlur={this.handleInputBlur} value={this.state.newHeader.value} onChange={this.handleHeaderValueChange} />
            </span>
        )
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                Headers :
            {Array.from(this.props.headers, ([key, value]) => <Header key={key} header={{key, value}} set={(header: HeaderType) => this.props.setHeader(header)} delete={() => this.props.deleteHeader(key)} />)}
                {inputHeader}
        </div>
        )
    }
}

