import { render } from '@testing-library/react';

import HomeUiProvider from './home-ui-provider';

describe('HomeUiProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeUiProvider />);
    expect(baseElement).toBeTruthy();
  });
});
