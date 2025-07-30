import { useMemo } from 'react';
import { useRoutine } from './useRoutine';
import { useRoutineSearch } from './useSearchRoutine';
import { useDebounce } from './useDebounce';

export function useRoutineData(input: string) {
  const debouncedInput = useDebounce(input, 500);
  const isSearching = debouncedInput.trim().length > 0;

  const routineData = useRoutine();
  const searchData = useRoutineSearch(debouncedInput);

  const merged = useMemo(() => {
    const data = isSearching ? searchData.data : routineData.data;
    const fetchNextPage = isSearching
      ? searchData.fetchNextPage
      : routineData.fetchNextPage;
    const hasNextPage = isSearching
      ? searchData.hasNextPage
      : routineData.hasNextPage;
    const isFetchingNextPage = isSearching
      ? searchData.isFetchingNextPage
      : routineData.isFetchingNextPage;
    const isLoading = isSearching
      ? searchData.isLoading
      : routineData.isLoading;
    const error = isSearching ? searchData.error : routineData.error;

    return {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      error,
      isSearching,
      debouncedInput,
    };
  }, [isSearching, routineData, searchData]);

  return merged;
}
