// import React from 'react';

// import {Order} from '../features/orderBook/types';

// interface Props {
//     order: Order;
//     onQuickBuy: (id: string) => void;
// }

// const OrderRow = ({order, onQuickBuy}: Props) => {
//     return (
//         <div className='grid grid-cols-4 gap-2 py-1 text-sm'>
//             <span>{order.price.toFixed(2)}</span>
//             <span>{order.quantity}</span>
//             <span>{(order.price * order.quantity).toFixed(2)}</span>
//             <button
//                 className='bg-green-600 text-white px-2 py-1 rounded'
//                 onClick={() => onQuickBuy(order.id)}
//             >
//                 Buy
//             </button>
//         </div>
//     );
// };

// export default React.memo(OrderRow);

import React from 'react';

import {Order} from '../features/orderBook/types';

interface Props {
    order: Order;
    onQuickBuy: (id: string) => void;
    side: 'bid' | 'ask';
}

const OrderRow = ({order, onQuickBuy, side}: Props) => {
    return (
        <div className='grid grid-cols-4 text-sm py-1 items-center'>
            <span
                className={side === 'bid' ? 'text-green-600' : 'text-red-600'}
            >
                {order.price.toFixed(2)}
            </span>
            <span className='text-right'>{order.quantity}</span>
            <span className='text-right'>
                {(order.price * order.quantity).toFixed(2)}
            </span>
            <button
                className='ml-2 text-xs bg-black-800 text-white px-2 py-1 rounded'
                onClick={() => onQuickBuy(order.id)}
            >
                Buy
            </button>
        </div>
    );
};

export default React.memo(OrderRow);
