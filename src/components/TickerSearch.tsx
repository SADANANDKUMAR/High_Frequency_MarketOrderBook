import {useRef} from 'react';

import {loadOrderBook} from '../features/orderBook/orderBook.thunks';
import {useAppDispatch} from '../hooks';

const sanitize = (value: string) => value.replace(/[^A-Z]/gi, '').toUpperCase();

export default function TickerSearch() {
    const dispatch = useAppDispatch();
    const debounceRef = useRef<number>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = sanitize(e.target.value);

        clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            if (value) dispatch(loadOrderBook(value));
        }, 300);
    };

    return (
        <input
            placeholder='Search Ticker (GS, AAPL...)'
            className='border px-3 py-2 rounded w-64'
            onChange={onChange}
        />
    );
}
