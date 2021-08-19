import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { userSelector, isUserLoadRunSelector, userLoadFailureSelector } from '../+ducks/users.selector';
import { loadUserStart } from '../+ducks/users.action';
import UsersSlice, { userFeatureKey } from '../+ducks/users.slice';
import { authSagaWatcher } from '../+ducks/users.saga';

export const useUsersFacade = () => {
  useInjectReducer({ key: userFeatureKey, reducer: UsersSlice });
  useInjectSaga({ key: userFeatureKey, saga: authSagaWatcher });

  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const isUserLoadRun = useSelector(isUserLoadRunSelector);
  const userLoadFailure = useSelector(userLoadFailureSelector);

  const getUserData = () => {
    dispatch(loadUserStart());
  };

  return {
    user,
    userLoadFailure,
    isUserLoadRun,
    getUserData
  };
};


