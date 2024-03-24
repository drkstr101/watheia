import '@watheia/studio-ui/styles/index.css';
import '../src/styles.css';

import { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <div className="relative isolate flex w-full flex-col pt-9">
          <main className="w-full flex-auto">
            <Story />
          </main>
        </div>
      </div>
    ),
  ],
};

export default preview;
