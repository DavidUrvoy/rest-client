import React, {Component, Fragment, ReactEventHandler} from 'react';
import HttpRequest from '../../domain/HttpRequest';

interface Props {handleWorkspaceLoad: (requests: HttpRequest[]) => void}
interface State {}

export default class WorkspaceFile extends Component<Props, State> {

    handleFileChange: ReactEventHandler = event => {
        const reader = new FileReader()
        reader.onload = event => this.loadData({...JSON.parse(event.target?.result as string)})
        reader.readAsText((event.target as HTMLFormElement).files[0])
    }

    private loadData = ({requests}: {requests: HttpRequest[]}) => {
        this.props.handleWorkspaceLoad(requests)
    }

    render = () => (
        <Fragment>
            <input type="file" onChange={this.handleFileChange} />
        </Fragment>
    )
}
