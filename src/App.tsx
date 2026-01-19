// import './App.css';

// // import viteLogo from '/vite.svg';
// // import {useState} from 'react';

// // import reactLogo from './assets/react.svg';

// function App() {
//     return (
//         <>
//             <h1 className='text-3xl font-bold text-blue-600'>
//                 Tailwind Working
//             </h1>
//         </>
//     );
// }

// export default App;

import {useEffect} from 'react';

import OrderBook from './components/OrderBook';
import TickerSearch from './components/TickerSearch';
import {loadOrderBook} from './features/orderBook/orderBook.thunks';
import {startPriceFeed} from './features/orderBook/tickEngine';
import {useAppDispatch} from './hooks';
import {store} from './store';

export default function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadOrderBook('GS'));
        startPriceFeed(dispatch, store.getState);
    }, [dispatch]);

    return (
        <div className='p-4 space-y-4'>
            <TickerSearch />
            <OrderBook />
        </div>
    );
}
