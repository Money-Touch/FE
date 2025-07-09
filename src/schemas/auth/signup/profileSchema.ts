import { z } from 'zod';

export const profileSchema = z.object({
  nickname: z
    .string()
    .max(10, { message: '10자 이하로 설정해주세요.' })
    .nonempty({ message: '닉네임을 입력해주세요.' }),
});

export type Profile = z.infer<typeof profileSchema>;
