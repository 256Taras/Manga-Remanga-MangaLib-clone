import { render } from '@testing-library/react';

import DataAccessFrontendShared from './data-access-frontend-shared';

describe('DataAccessFrontendShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataAccessFrontendShared />);
    expect(baseElement).toBeTruthy();
  });
});
