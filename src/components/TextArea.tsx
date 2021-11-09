import type { ReactElement } from 'react';
import * as React from 'react';

import ReviewContext from '../reviewContext';

export default function TextArea({ question }: TextAreaProps): ReactElement {
    const store = React.useContext(ReviewContext);

    return (
        <label>
            <p>{question}</p>
            <textarea
                name={question}
                id={question}
                onChange={e => store.setFeedback(e.currentTarget.value)}
                cols={130}
                rows={30}
                maxLength={1000}
            ></textarea>
        </label>
    );
}

export interface TextAreaProps {
    question: string;
}
