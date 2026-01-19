import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {asksAdapter, bidsAdapter} from './adapters';
import {Order} from './types';

const initialState = {
    ticker: 'GS',
    bids: bidsAdapter.getInitialState(),
    asks: asksAdapter.getInitialState(),
};

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState,
    reducers: {
        setTicker(state, action: PayloadAction<string>) {
            state.ticker = action.payload;
        },
        setBids(state, action: PayloadAction<Order[]>) {
            bidsAdapter.setAll(state.bids, action.payload);
        },
        setAsks(state, action: PayloadAction<Order[]>) {
            asksAdapter.setAll(state.asks, action.payload);
        },
        updateOrder(
            state,
            action: PayloadAction<Order & {side: 'bid' | 'ask'}>,
        ) {
            const {side, ...order} = action.payload;
            side === 'bid'
                ? bidsAdapter.upsertOne(state.bids, order)
                : asksAdapter.upsertOne(state.asks, order);
        },
    },
});

export const {setTicker, setBids, setAsks, updateOrder} =
    orderBookSlice.actions;

export default orderBookSlice.reducer;
