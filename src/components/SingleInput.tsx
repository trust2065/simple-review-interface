import type { ReactElement } from 'react';
import * as React from 'react';

import ReviewContext from '../reviewContext';

export default function SingleInput({
    question
}: SingleInputProps): ReactElement {
    const store = React.useContext(ReviewContext);

    return (
        <label>
            <p>{question}</p>
            <input
                type="text"
                onChange={e => store.setFeedback(e.currentTarget.value)}
                value={store.phoneNumber}
            />
        </label>
    );
}

export interface SingleInputProps {
    question: string;
}
