import {createEntityAdapter} from '@reduxjs/toolkit';

import {Order} from './types';

export const bidsAdapter = createEntityAdapter<Order>({
    sortComparer: (a, b) => b.price - a.price, // highest first
});

export const asksAdapter = createEntityAdapter<Order>({
    sortComparer: (a, b) => a.price - b.price, // lowest first
});
