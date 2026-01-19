import {AppDispatch} from '../../store';
import {updateOrder} from './orderBook.slice';
import {Order} from './types';

export function startPriceFeed(dispatch: AppDispatch, getState: () => any) {
    setInterval(() => {
        const {bids, asks} = getState().orderBook;

        const randomBidId =
            bids.ids[Math.floor(Math.random() * bids.ids.length)];
        const bid = bids.entities[randomBidId] as Order;

        if (bid) {
            dispatch(
                updateOrder({
                    ...bid,
                    price: +(bid.price + (Math.random() - 0.5) * 0.05).toFixed(
                        2,
                    ),
                    side: 'bid',
                }),
            );
        }
    }, 100);
}
