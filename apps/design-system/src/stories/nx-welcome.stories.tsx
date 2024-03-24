import type { Meta, StoryObj } from '@storybook/react';
import { NxWelcome } from '../app/nx-welcome';

const meta: Meta<typeof NxWelcome> = {
  component: NxWelcome,
  title: 'watheia.design-system/app/nx-welcome',
};
export default meta;
type Story = StoryObj<typeof NxWelcome>;

export const Primary: Story = {
  args: {},
};
