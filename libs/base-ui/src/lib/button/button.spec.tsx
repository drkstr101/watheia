import { render } from '@testing-library/react';

import Button from './button';

describe('watheia.base-ui/button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button>LABEL</Button>);
    expect(baseElement).toBeTruthy();
  });
});
