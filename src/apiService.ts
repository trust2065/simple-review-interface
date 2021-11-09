import { addDoc, collection } from 'firebase/firestore';

import { db } from './firebaseInit';
import type { IReviewContext } from './reviewContext';

export async function saveReview(userId: string | undefined, review: ISaveReview): Promise<void> {
    if (!userId) {
        throw new Error('userId is required');
    }

    try {
        const docRef = await addDoc(collection(db, 'reviews'), review);
        console.log('Document written with ID: ', docRef.id);
    }
    catch (e) {
        console.error('Error adding document: ', e);
    }
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
}

export namespace IRating {
    export type Category = 'qualityOfProduct' | 'speedOfDelivery';
    export type Score = 1 | 2 | 3 | 4 | 5;
}

export interface ISingleSelect {
    options: ISingleSelect.Options;
}

export namespace ISingleSelect {
    export type Options = string[];
}

export interface ISaveReview {
    ratings: IReviewContext.Ratings;
    sizeSatisfaction: IReviewContext.SizeSatisfactionOptions;
    wantToChangeSize?: IReviewContext.WantToChangeSizeOptions;
    feedback: IReviewContext.Feedback;
    phoneNumber?: IReviewContext.PhoneNumber;
}