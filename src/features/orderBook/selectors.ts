import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../store';
import {asksAdapter, bidsAdapter} from './adapters';

const selectOrderBook = (state: RootState) => state.orderBook;

export const {selectAll: selectAllBids} = bidsAdapter.getSelectors(
    (state: RootState) => state.orderBook.bids,
);

export const {selectAll: selectAllAsks} = asksAdapter.getSelectors(
    (state: RootState) => state.orderBook.asks,
);

export const selectBestBid = createSelector(selectAllBids, (bids) => bids[0]);

export const selectBestAsk = createSelector(selectAllAsks, (asks) => asks[0]);
