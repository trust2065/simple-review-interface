/* eslint-disable @typescript-eslint/no-floating-promises */
import { collection, getDocs, query } from 'firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import type { ISaveReview, ISingleSelect, IUser } from './apiService';
import { saveReview } from './apiService';
import Product from './components/Product';
import Rating from './components/Rating';
import UserSelect from './components/Select';
import SingleInput from './components/SingleInput';
import type { SingleSelectProps } from './components/SingleSelect';
import SingleSelect from './components/SingleSelect';
import TextArea from './components/TextArea';
import { db } from './firebaseInit';
import type { IReviewContext } from './reviewContext';
import ReviewContext from './reviewContext';
import './App.css';

function App(): ReactElement {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>();
    const ratingsInitValues: IReviewContext.Ratings = {
        qualityOfProduct: 1,
        speedOfDelivery: 1
    };
    const [ratings, setRatings] =
        useState<IReviewContext.Ratings>(ratingsInitValues);

    const [sizeSatisfaction, setSizeSatisfaction] =
        useState<IReviewContext.SizeSatisfactionOptions>('Just right');

    const [wantToChangeSize, setWantToChangeSize] =
        useState<IReviewContext.WantToChangeSizeOptions>('No');

    const [feedback, setFeedback] = useState<IReviewContext.Feedback>('');
    const [phoneNumber, setPhoneNumber] = useState<
        IReviewContext.PhoneNumber | undefined
    >(undefined);

    useEffect(() => {
        (async (): Promise<void> => {
            const queryUsers = query(collection(db, 'users'));
            const usersResponse = (await getDocs(queryUsers)).docs.map(
                doc => doc.data() as IUser
            );
            setUsers(usersResponse);
        })();
    }, []);

    const singleSelectQ1: SingleSelectProps = {
        options: [
            'Too small',
            'Just right',
            'Too large'
        ] as ISingleSelect.Options,
        question: 'How did you find the sizing for this product?'
    };

    const singleSelectQ2: SingleSelectProps = {
        options: ['Yes', 'No'] as ISingleSelect.Options,
        question: 'Would you like us to contact you regarding a different size?'
    };

    const feedbackQuestion = 'Do you have any other feedback for us?';
    const phoneNumberQuestion = 'Please provide your phone number';

    const handleSubmit = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        (async () => {
            const review: ISaveReview = {
                ratings,
                sizeSatisfaction,
                wantToChangeSize,
                feedback,
                phoneNumber: phoneNumber ?? 0
            };

            await saveReview(selectedUser, review);
            setIsSubmitted(true);
        })();
    };

    return (
        <ReviewContext.Provider
            value={{
                users,
                selectedUser,
                setSelectedUser,
                ratings,
                setRatings,
                sizeSatisfaction,
                setSizeSatisfaction,
                feedback,
                setFeedback,
                wantToChangeSize,
                setWantToChangeSize,
                phoneNumber,
                setPhoneNumber
            }}
        >
            {isSubmitted ? (
                <div>Review Submitted</div>
            ) : (
                <>
                    <UserSelect></UserSelect>
                    {selectedUser ? (
                        <>
                            <Product></Product>
                            <hr />
                            <h2>Please tell us how you think :)</h2>
                            <Rating category="qualityOfProduct"></Rating>
                            <Rating category="speedOfDelivery"></Rating>
                            <SingleSelect
                                question={singleSelectQ1.question}
                                options={singleSelectQ1.options}
                            ></SingleSelect>
                            {sizeSatisfaction !== 'Just right' && (
                                <SingleSelect
                                    question={singleSelectQ2.question}
                                    options={singleSelectQ2.options}
                                ></SingleSelect>
                            )}
                            {wantToChangeSize === 'Yes' && (
                                <SingleInput
                                    question={phoneNumberQuestion}
                                ></SingleInput>
                            )}
                            <TextArea question={feedbackQuestion}></TextArea>
                            <div>
                                <button onClick={handleSubmit}>
                                    Submit Review
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Please select a user</p>
                    )}
                </>
            )}
        </ReviewContext.Provider>
    );
}

export default App;
