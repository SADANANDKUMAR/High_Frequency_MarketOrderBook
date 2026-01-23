// import {Provider} from 'react-redux';

// import {render, screen} from '@testing-library/react';

// import OrderBook from '../../../components/OrderBook';
// import {store} from '../../../store';
// import {loadOrderBook} from '../orderBook.thunks';

// jest.useFakeTimers();

// test('updates total volume on price ticks', async () => {
//     await store.dispatch(loadOrderBook('GS') as any);

//     render(
//         <Provider store={store}>
//             <OrderBook />
//         </Provider>,
//     );

//     const initialVolume = screen.getByText(/Total Volume/i).textContent;

//     jest.advanceTimersByTime(300); // 3 ticks

//     const updatedVolume = screen.getByText(/Total Volume/i).textContent;

//     expect(updatedVolume).not.toEqual(initialVolume);
// });

import {Provider} from 'react-redux';

import {render, screen} from '@testing-library/react';

import OrderBook from '../../../components/OrderBook';
import {store} from '../../../store';
import {loadOrderBook} from '../orderBook.thunks';

jest.useFakeTimers();

const Wrapper = () => (
    <Provider store={store}>
        <OrderBook />
    </Provider>
);

test('updates total volume on price ticks', async () => {
    await store.dispatch(loadOrderBook('GS') as any);

    render(<Wrapper />);

    const initialVolume = screen.getByText(/Total Volume/i).textContent;

    jest.advanceTimersByTime(300);

    const updatedVolume = screen.getByText(/Total Volume/i).textContent;

    expect(updatedVolume).not.toEqual(initialVolume);
});
