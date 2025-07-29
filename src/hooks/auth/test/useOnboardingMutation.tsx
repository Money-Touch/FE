import { useMutation } from '@tanstack/react-query';
import { API } from '../../../apis/axios';
import type { SubmitPayload } from '../../../types/auth/test/onboarding';

const submitOnboarding = async (payload: SubmitPayload) => {
  const response = await API.post('/api/user/detail', payload);
  return response.data;
};

export const useOnboardingMutation = () => {
  return useMutation({ mutationFn: submitOnboarding });
};
