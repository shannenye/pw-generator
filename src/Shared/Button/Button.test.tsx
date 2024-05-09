import React from 'react';
import { render } from '@testing-library/react';
import Button, { ButtonProps } from './Button';

describe('<Button />', () => {
    it('renders correctly', () => {
        const props: ButtonProps = {
            text: 'Hello',
            click: () => {} // Mock click function
        };

        const { asFragment } = render(<Button {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
