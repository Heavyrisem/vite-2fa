import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AxiosError } from 'axios';
import tw from 'twin.macro';

import Button from '@components/Button';
import Input from '@components/Input';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import { axios } from '@utils/axios';

interface LoginForm {
  email: string;
  password: string;
  twoFactorCode: string;
}

const Login: React.FC = () => {
  const [message, setMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const handleSubmitForm: SubmitHandler<LoginForm> = useCallback(async (data) => {
    const response = await axios.axiosInstance
      .post('/api/user/login', data)
      .then((res) => res.data)
      .catch((err) => {
        if (err instanceof AxiosError) {
          setMessage(`로그인에 실패했습니다. (${err.response?.data?.message})`);
        }
      });
    console.log(response);
  }, []);

  return (
    <DefaultLayout css={[tw`flex flex-col justify-center items-center`]}>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Login</div>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        css={[tw`w-[15rem]`, tw`mx-auto`, tw`flex flex-col justify-center items-center gap-2`]}
      >
        <Input
          type="text"
          label="email"
          css={[tw`w-full`]}
          invalid={errors.email && (errors.email.message || '잘못된 입력값입니다.')}
          {...register('email', { required: true, minLength: 3 })}
        />
        <Input
          type="password"
          label="password"
          css={[tw`w-full`]}
          invalid={errors.password && (errors.password.message || '잘못된 입력값입니다.')}
          {...register('password', { required: true })}
        />
        <Input
          type="number"
          label="2FA Code"
          css={[tw`w-full`]}
          invalid={errors.twoFactorCode && (errors.twoFactorCode.message || '잘못된 입력값입니다.')}
          {...register('twoFactorCode', { required: true, minLength: 6, maxLength: 6 })}
        />

        <Button type="submit" css={[tw`w-full mt-8`]}>
          로그인
        </Button>
        {message && <span>{message}</span>}
      </form>
    </DefaultLayout>
  );
};

export default Login;
