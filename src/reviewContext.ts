/* eslint-disable @typescript-eslint/no-empty-function */
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

import type { IRating } from './apiService';

const ReviewContext = React.createContext<IReviewContext>({
    selectedUser: 'userId1',
    setSelectedUser: () => { },
    ratings: {
        qualityOfProduct: 1,
        speedOfDelivery: 1
    },
    setRatings: () => { },
    sizeSatisfaction: 'Just right',
    setSizeSatisfaction: () => { },
    feedback: '',
    setFeedback: () => { },
    wantToChangeSize: 'Yes',
    setWantToChangeSize: () => { },
    phoneNumber: undefined,
    setPhoneNumber: () => { }
});

export default ReviewContext;

interface IReviewContext {
    users?: IUser[];
    selectedUser?: string;
    setSelectedUser: Dispatch<SetStateAction<string | undefined>>;
    purchasedProducts?: IProduct[];
    ratings: IReviewContext.Ratings;
    setRatings: Dispatch<SetStateAction<IReviewContext.Ratings>>;
    sizeSatisfaction: IReviewContext.SizeSatisfactionOptions;
    setSizeSatisfaction: Dispatch<SetStateAction<IReviewContext.SizeSatisfactionOptions>>;
    wantToChangeSize: IReviewContext.WantToChangeSizeOptions;
    setWantToChangeSize: Dispatch<SetStateAction<IReviewContext.WantToChangeSizeOptions>>;
    feedback: IReviewContext.Feedback;
    setFeedback: Dispatch<SetStateAction<IReviewContext.Feedback>>;
    phoneNumber?: IReviewContext.PhoneNumber;
    setPhoneNumber: Dispatch<SetStateAction<IReviewContext.PhoneNumber | undefined>>;
}

export namespace IReviewContext {
    export interface Ratings {
        qualityOfProduct: IRating.Score;
        speedOfDelivery: IRating.Score;
    }

    export type SizeSatisfactionOptions = 'Too small' | 'Just right' | 'Too large';

    export type WantToChangeSizeOptions = 'Yes' | 'No';

    export type Feedback = string;

    export type PhoneNumber = number;
}

interface IProduct {
    imageUrl: string;
    imageAlt: string;
    title: string;
}

interface IUser {
    id: string;
    firstName: string;
    lastName: string;
}
