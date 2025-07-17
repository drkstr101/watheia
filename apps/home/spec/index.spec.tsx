import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Page from '../app/page';

describe('Page', () => {
  it('should render successfully', () => {
    render(<Page />);
    expect(screen.getByTestId('content.home/pages/index')).toBeDefined();
  });
});
