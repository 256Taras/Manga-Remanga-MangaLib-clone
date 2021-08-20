import { render } from '@testing-library/react';

import UiMainLayout from './ui-main-layout';

describe('UiMainLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMainLayout />);
    expect(baseElement).toBeTruthy();
  });
});
