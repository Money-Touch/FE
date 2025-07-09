import { z } from 'zod';

export const settingSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식이 잘못되었어요.' }),

    code: z.string().length(6, { message: '인증번호를 다시 입력해주세요.' }),

    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/,
        '영문, 숫자, 특수문자 포함 8자 이상 15자 이하로 설정해주세요.',
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 불일치해요.',
    path: ['confirmPassword'],
  });

export type SettingFormValues = z.infer<typeof settingSchema>;
