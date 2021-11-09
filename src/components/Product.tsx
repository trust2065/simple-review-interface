/* eslint-disable @typescript-eslint/no-floating-promises */
import { collection, getDocs, query, where } from 'firebase/firestore';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import { db } from '../firebaseInit';
import ReviewContext from '../reviewContext';

export default function Product(): ReactElement {
    const store = useContext(ReviewContext);
    const [purchasedProducts, setPurchasedProducts] = useState<ProductType[]>(
        []
    );

    useEffect(() => {
        (async (): Promise<void> => {
            const queryPurchasedProducts = query(
                collection(db, 'purchases'),
                where('userId', '==', store.selectedUser ?? '')
            );
            const productsResponse = (
                await getDocs(queryPurchasedProducts)
            ).docs.map(doc => doc.data() as ProductType);
            setPurchasedProducts(productsResponse);
        })();
    }, [store.selectedUser]);

    return (
        <>
            <h1>Shopped products</h1>
            {purchasedProducts.map((product, index) => (
                <li key={index}>
                    <img src={product.imageUrl} alt={product.imageAlt} />
                    <h2>{product.title}</h2>
                </li>
            ))}
        </>
    );
}

interface ProductType {
    imageUrl: string;
    imageAlt: string;
    title: string;
}
