import { render } from '@testing-library/react';

import DataAccessSharedRootStore from './data-access-shared-root-store';

describe('DataAccessSharedRootStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataAccessSharedRootStore />);
    expect(baseElement).toBeTruthy();
  });
});
