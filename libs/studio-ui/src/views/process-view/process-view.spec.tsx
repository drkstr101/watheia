import { render } from '@testing-library/react';

import ProcessView from './process-view';

describe('ProcessView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProcessView />);
    expect(baseElement).toBeTruthy();
  });
});
