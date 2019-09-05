/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import App from '../pages/App';

test('renders', () => {
	const { getByText } = render(<App />);

	const title = getByText(/Just Lift/i);

	expect(title).toBeInTheDocument();
});
