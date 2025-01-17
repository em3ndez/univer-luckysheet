import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox, CheckboxGroup } from '..';

describe('checkbox', () => {
    test('checkbox', () => {
        const { container } = render(
            <Checkbox value={`Header`} checked={true}>
                foo
            </Checkbox>
        );
        expect(container);
    });

    test('checkbox group', () => {
        let a = 1;
        const checkGroups = [
            {
                checked: true,
                disabled: false,
                name: '123',
                label: 'agree',
                value: '1',
            },
        ];
        const { container } = render(<CheckboxGroup options={checkGroups} onChange={() => a++}></CheckboxGroup>);
        expect(container);
        fireEvent.click(screen.getByText('agree'));
        expect(a).toEqual(2);
    });
});
