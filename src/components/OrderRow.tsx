import React from 'react';

import {Order} from '../types';

interface Props {
    order: Order;
    onQuickBuy: (id: string) => void;
}

const OrderRow = ({order, onQuickBuy}: Props) => {
    return (
        <div className='grid grid-cols-4 gap-2 py-1 text-sm'>
            <span>{order.price.toFixed(2)}</span>
            <span>{order.quantity}</span>
            <span>{(order.price * order.quantity).toFixed(2)}</span>
            <button
                className='bg-green-600 text-white px-2 py-1 rounded'
                onClick={() => onQuickBuy(order.id)}
            >
                Buy
            </button>
        </div>
    );
};

export default React.memo(OrderRow);
