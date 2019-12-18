import React, {Fragment} from 'react';

interface Props {body: string}

export const Response = ({body}: Props) => (
    <Fragment>
        Response :
        <textarea style={responseStyle} value={body} readOnly></textarea>
    </Fragment>
)

const responseStyle = {
    minHeight: '200px',
    minWidth: '200px',
    width: '80%'
}
