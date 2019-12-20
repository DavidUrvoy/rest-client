import React from 'react';
import './HttpForms.scss';

interface Props {body: string}

export const Response = ({body}: Props) => (
    <div className="form-bloc">
        Response :
        <textarea className="json-body" value={body} readOnly></textarea>
    </div>
)

