import { render } from '@testing-library/react';

import ContactView from './contact-view';

describe('ContactView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContactView />);
    expect(baseElement).toBeTruthy();
  });
});
