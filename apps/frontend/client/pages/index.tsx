import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../store/test/slice';


export function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  // const user = useSelector((state) => state);
  return (
    <div>
      <pre>
       hellow
        </pre>
    </div>
  );
}

export default Index;
