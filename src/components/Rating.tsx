import type { ReactElement } from 'react';
import * as React from 'react';

import type { IRating } from '../apiService';
import ReviewContext from '../reviewContext';

export default function Rating({
    category
}: {
    category: IRating.Category;
}): ReactElement {
    const store = React.useContext(ReviewContext);
    const mapDisplayRatingCategory = (
        categoryToMap: IRating.Category
    ): string => {
        switch (categoryToMap) {
            case 'qualityOfProduct':
                return 'How do you rate the quality of the product?';
            case 'speedOfDelivery':
                return 'How do you rate the speed of the delivery?';
        }
    };

    const saveRatings = (e: React.FormEvent<HTMLInputElement>): void => {
        switch (category) {
            case 'qualityOfProduct':
                store.setRatings({
                    ...store.ratings,
                    qualityOfProduct: parseInt(
                        e.currentTarget.value,
                        10
                    ) as IRating.Score
                });
                break;
            case 'speedOfDelivery':
                store.setRatings({
                    ...store.ratings,
                    speedOfDelivery: parseInt(
                        e.currentTarget.value,
                        10
                    ) as IRating.Score
                });
                break;
        }
    };

    return (
        <>
            <label>
                <p>{mapDisplayRatingCategory(category)}</p>
                <input
                    type="number"
                    min="1"
                    max="5"
                    onChange={e => saveRatings(e)}
                    value={store.ratings[category]}
                />
            </label>
        </>
    );
}
