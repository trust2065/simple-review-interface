// /* eslint-disable @typescript-eslint/no-floating-promises */
import type { ReactElement } from 'react';
import * as React from 'react';

import type { ISingleSelect } from '../apiService';
import type { IReviewContext } from '../reviewContext';
import ReviewContext from '../reviewContext';

export default function SingleSelect({
    question,
    options
}: SingleSelectProps): ReactElement {
    const store = React.useContext(ReviewContext);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (question) {
            case 'How did you find the sizing for this product?':
                store.setSizeSatisfaction(
                    e.currentTarget
                        .value as IReviewContext.SizeSatisfactionOptions
                );
                break;
            case 'Would you like us to contact you regarding a different size?':
                store.setWantToChangeSize(
                    e.currentTarget
                        .value as IReviewContext.WantToChangeSizeOptions
                );
                break;
        }
    };
    const isChecked = (option: string): boolean | undefined => {
        switch (question) {
            case 'How did you find the sizing for this product?':
                return store.sizeSatisfaction === option;
            case 'Would you like us to contact you regarding a different size?':
                return store.wantToChangeSize === option;
        }
    };

    return (
        <label>
            <p>{question}</p>
            {options.map(option => (
                <div key={option}>
                    <input
                        type="radio"
                        name={question}
                        id={option}
                        value={option}
                        checked={isChecked(option)}
                        onChange={handleChange}
                    />
                    <label htmlFor={option}>{option}</label>
                </div>
            ))}
        </label>
    );
}

export interface SingleSelectProps {
    question: SingleSelectQuestion;
    options: ISingleSelect.Options;
}

type SingleSelectQuestion =
    | 'How did you find the sizing for this product?'
    | 'Would you like us to contact you regarding a different size?';
