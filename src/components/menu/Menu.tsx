import React from 'react';
import HttpRequest from '../../domain/HttpRequest';
import WorkspaceFile from './WorkspaceFile';

export default function Menu(props: {handleWorkspaceLoad: (requests: HttpRequest[]) => void}) {
    return (
        <div style={{height: '40px'}}>
            <WorkspaceFile handleWorkspaceLoad={props.handleWorkspaceLoad} />
        </div>
    )
}
