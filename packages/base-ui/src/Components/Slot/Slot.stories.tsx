import type { Meta } from '@storybook/react';

import { Slot } from './Slot';

const meta: Meta<typeof Slot> = {
    title: 'Components / Slot',
    component: Slot,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        name: 'main',
    },
};

export default meta;

export const Playground = {
    args: {},
};
