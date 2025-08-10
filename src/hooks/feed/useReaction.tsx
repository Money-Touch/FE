import { useMemo, useState } from 'react';
import { API } from '../../apis/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  ReactionType,
  ReactionState,
  ReactionAPIResult,
  UseReactionOptions,
} from '../../types/feed/feed';

export function useReaction(
  consumptionRecordId: number,
  initial?: Partial<ReactionState>,
  options?: UseReactionOptions,
) {
  const qc = useQueryClient();

  const [state, setState] = useState<ReactionState>({
    wiseCount: initial?.wiseCount ?? 0,
    wasteCount: initial?.wasteCount ?? 0,
    myReaction: initial?.myReaction ?? null,
  });

  const invalidateKeys = useMemo<unknown[][]>(
    () =>
      options?.invalidateKeys && options.invalidateKeys.length > 0
        ? options.invalidateKeys
        : [
            ['feed', 'POPULAR'],
            ['feed', 'RECENT'],
            ['feedDetail', consumptionRecordId],
          ],
    [options?.invalidateKeys, consumptionRecordId],
  );

  const computeNext = (clicked: ReactionType): ReactionState => {
    const { wiseCount, wasteCount, myReaction } = state;
    if (clicked === 'WISE') {
      if (myReaction === 'WISE')
        return {
          wiseCount: Math.max(0, wiseCount - 1),
          wasteCount,
          myReaction: null,
        };
      if (myReaction === 'WASTE')
        return {
          wiseCount: wiseCount + 1,
          wasteCount: Math.max(0, wasteCount - 1),
          myReaction: 'WISE',
        };
      return { wiseCount: wiseCount + 1, wasteCount, myReaction: 'WISE' };
    } else {
      if (myReaction === 'WASTE')
        return {
          wiseCount,
          wasteCount: Math.max(0, wasteCount - 1),
          myReaction: null,
        };
      if (myReaction === 'WISE')
        return {
          wiseCount: Math.max(0, wiseCount - 1),
          wasteCount: wasteCount + 1,
          myReaction: 'WASTE',
        };
      return { wiseCount, wasteCount: wasteCount + 1, myReaction: 'WASTE' };
    }
  };

  const mutation = useMutation<
    ReactionAPIResult,
    unknown,
    ReactionType,
    { prev: ReactionState }
  >({
    mutationKey: ['reaction', consumptionRecordId],
    mutationFn: async (type: ReactionType) => {
      const token = localStorage.getItem('accessToken');
      const { data } = await API.post<ReactionAPIResult>(
        `/api/feed/${consumptionRecordId}/reaction`,
        { type },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      );
      return data;
    },
    onMutate: async (type) => {
      const prev = { ...state };
      setState(computeNext(type));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) setState(ctx.prev);
    },
    onSuccess: (data) => {
      setState({
        wiseCount: data.result.wiseCount,
        wasteCount: data.result.wasteCount,
        myReaction: data.result.myReaction,
      });
      invalidateKeys.forEach((key) =>
        qc.invalidateQueries({ queryKey: key, exact: true }),
      );
    },
  });

  const setFromServer = (next: Partial<ReactionState>) => {
    setState((prev) => ({
      wiseCount: next.wiseCount ?? prev.wiseCount,
      wasteCount: next.wasteCount ?? prev.wasteCount,
      myReaction: next.myReaction ?? prev.myReaction,
    }));
  };

  return {
    wiseCount: state.wiseCount,
    wasteCount: state.wasteCount,
    myReaction: state.myReaction,
    isReacting: mutation.isPending,
    reactWise: () => mutation.mutate('WISE'),
    reactWaste: () => mutation.mutate('WASTE'),
    setFromServer,
  };
}
