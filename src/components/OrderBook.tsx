import {useCallback, useMemo} from 'react';

import {
    selectAllAsks,
    selectAllBids,
    selectBestAsk,
    selectBestBid,
} from '../features/orderBook/selectors';
import {useAppDispatch, useAppSelector} from '../hooks';
import OrderRow from './OrderRow';

export default function OrderBook() {
    const dispatch = useAppDispatch();

    const bids = useAppSelector(selectAllBids);
    const asks = useAppSelector(selectAllAsks);
    const bestBid = useAppSelector(selectBestBid);
    const bestAsk = useAppSelector(selectBestAsk);

    const spread = useMemo(() => {
        if (!bestBid || !bestAsk) return 0;
        return +(bestAsk.price - bestBid.price).toFixed(2);
    }, [bestBid?.price, bestAsk?.price]);

    const totalVolume = useMemo(() => {
        return [...bids, ...asks].reduce((sum, o) => sum + o.quantity, 0);
    }, [bids, asks]);

    const onQuickBuy = useCallback((id: string) => {
        console.log('Quick Buy:', id);
    }, []);

    return (
        <div className='grid grid-cols-2 gap-6 mt-4'>
            <div>
                <h2 className='font-bold mb-2'>Bids</h2>
                {bids.map((b) => (
                    <OrderRow key={b.id} order={b} onQuickBuy={onQuickBuy} />
                ))}
            </div>

            <div>
                <h2 className='font-bold mb-2'>Asks</h2>
                {asks.map((a) => (
                    <OrderRow key={a.id} order={a} onQuickBuy={onQuickBuy} />
                ))}
            </div>

            <div className='col-span-2 mt-4 text-sm'>
                <p>
                    Total Volume: <b>{totalVolume}</b>
                </p>
                <p>
                    Spread: <b>{spread}</b>
                </p>
            </div>
        </div>
    );
}
