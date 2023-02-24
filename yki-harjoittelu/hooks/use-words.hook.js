import randomColor from 'randomcolor';
import { loadUserWords } from '../redux/slices';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export default function useWords() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);
  const { shuffleWords } = useSelector(({ localization }) => localization);

  useEffect(() => {
    dispatch(loadUserWords({ token: localStorage.token }));
  }, [user]);

  const successRate = useMemo(() => {
    const length = shuffleWords.filter(
      (el) => el.count === 10 && el.type === 'memorized'
    ).length;
    return {
      length,
      value: (length / shuffleWords.length) * 100
    };
  }, [shuffleWords]);

  const onGoingRate = useMemo(() => {
    const length = shuffleWords.filter(
      (el) => el.count > 0 && el.count <= 5 && el.type === 'study'
    ).length;
    return {
      length,
      value: (length / shuffleWords.length) * 100
    };
  }, [shuffleWords]);

  const initialRate = useMemo(() => {
    const length = shuffleWords.filter(
      (el) => el.count === 0 && el.type === 'study'
    ).length;
    return {
      length,
      value: (length / shuffleWords.length) * 100
    };
  }, [shuffleWords]);

  const progressRate = useMemo(() => {
    const length = shuffleWords.filter(
      (el) => el.count > 5 && el.count <= 9 && el.type === 'study'
    ).length;
    return {
      length,
      value: (length / shuffleWords.length) * 100
    };
  }, [shuffleWords]);

  const studyShuffledWords = useMemo(() => {
    return shuffleWords?.filter((el) => el.type === 'study');
  }, [shuffleWords]);

	const colorRef = useRef({});
  const getColor = useCallback((index) => {
    if (!colorRef.current[index])
      colorRef.current[index] = randomColor({ format: 'hex' });
    return colorRef.current[index];
  }, []);

  return {
    studyShuffledWords,
    progressRate,
    shuffleWords,
    initialRate,
    onGoingRate,
    successRate,
		getColor,
  };
}
