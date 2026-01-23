// import {useCallback, useMemo} from 'react';

// import {
//     selectAllAsks,
//     selectAllBids,
//     selectBestAsk,
//     selectBestBid,
// } from '../features/orderBook/selectors';
// import {useAppDispatch, useAppSelector} from '../hooks';
// import OrderRow from './OrderRow';

// export default function OrderBook() {
//     const dispatch = useAppDispatch();

//     const bids = useAppSelector(selectAllBids);
//     const asks = useAppSelector(selectAllAsks);
//     const bestBid = useAppSelector(selectBestBid);
//     const bestAsk = useAppSelector(selectBestAsk);

//     const spread = useMemo(() => {
//         if (!bestBid || !bestAsk) return 0;
//         return +(bestAsk.price - bestBid.price).toFixed(2);
//     }, [bestBid?.price, bestAsk?.price]);

//     const totalVolume = useMemo(() => {
//         return [...bids, ...asks].reduce((sum, o) => sum + o.quantity, 0);
//     }, [bids, asks]);

//     const onQuickBuy = useCallback((id: string) => {
//         console.log('Quick Buy:', id);
//     }, []);

//     return (
//         <div className='grid grid-cols-2 gap-6 mt-4'>
//             <div>
//                 <h2 className='font-bold mb-2'>Bids</h2>
//                 {bids.map((b) => (
//                     <OrderRow key={b.id} order={b} onQuickBuy={onQuickBuy} />
//                 ))}
//             </div>

//             <div>
//                 <h2 className='font-bold mb-2'>Asks</h2>
//                 {asks.map((a) => (
//                     <OrderRow key={a.id} order={a} onQuickBuy={onQuickBuy} />
//                 ))}
//             </div>

//             <div className='col-span-2 mt-4 text-sm'>
//                 <p>
//                     Total Volume: <b>{totalVolume}</b>
//                 </p>
//                 <p>
//                     Spread: <b>{spread}</b>
//                 </p>
//             </div>
//         </div>
//     );
// }

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
    const bids = useAppSelector(selectAllBids);
    const asks = useAppSelector(selectAllAsks);
    const bestBid = useAppSelector(selectBestBid);
    const bestAsk = useAppSelector(selectBestAsk);

    const spread = useMemo(() => {
        if (!bestBid || !bestAsk) return 0;
        return +(bestAsk.price - bestBid.price).toFixed(2);
    }, [bestBid?.price, bestAsk?.price]);

    const totalVolume = useMemo(
        () => [...bids, ...asks].reduce((s, o) => s + o.quantity, 0),
        [bids, asks],
    );

    const onQuickBuy = useCallback((id: string) => {
        console.log('Quick Buy:', id);
    }, []);

    return (
        <div className='border rounded-lg p-4 bg-white shadow-sm'>
            <h2 className='text-lg font-bold mb-4 text-center'>Order Book</h2>

            <div className='grid grid-cols-2 gap-6'>
                {/* BIDS */}
                <div>
                    <h3 className='font-semibold mb-2 text-green-700'>Bids</h3>
                    <div className='grid grid-cols-4 text-xs font-semibold border-b pb-1'>
                        <span>Price</span>
                        <span className='text-right'>Qty</span>
                        <span className='text-right'>Value</span>
                        <span />
                    </div>

                    {bids.map((b) => (
                        <OrderRow
                            key={b.id}
                            order={b}
                            side='bid'
                            onQuickBuy={onQuickBuy}
                        />
                    ))}
                </div>

                {/* ASKS */}
                <div>
                    <h3 className='font-semibold mb-2 text-red-700'>Asks</h3>
                    <div className='grid grid-cols-4 text-xs font-semibold border-b pb-1'>
                        <span>Price</span>
                        <span className='text-right'>Qty</span>
                        <span className='text-right'>Value</span>
                        <span />
                    </div>

                    {asks.map((a) => (
                        <OrderRow
                            key={a.id}
                            order={a}
                            side='ask'
                            onQuickBuy={onQuickBuy}
                        />
                    ))}
                </div>
            </div>

            {/* Metrics */}
            <div className='mt-4 flex justify-between text-sm border-t pt-2'>
                <span>
                    Spread: <b>{spread}</b>
                </span>
                <span>
                    Total Volume: <b>{totalVolume}</b>
                </span>
            </div>
        </div>
    );
}
