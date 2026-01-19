import {createAsyncThunk} from '@reduxjs/toolkit';

import {setAsks, setBids, setTicker, updateOrder} from './orderBook.slice';
import {Order} from './types';

export const loadOrderBook = createAsyncThunk(
    'orderBook/load',
    async (ticker: string, {dispatch}) => {
        const res = await fetch('/order-book.json');
        const data = await res.json();

        dispatch(setTicker(ticker));
        dispatch(setBids(data.bids));
        dispatch(setAsks(data.asks));

        return data;
    },
);
