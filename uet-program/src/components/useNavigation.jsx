import { useNavigate } from 'react-router-dom';

export function useNavigation() {
  let navigate = useNavigate();
  return navigate;
}