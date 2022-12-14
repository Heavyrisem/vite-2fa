import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import tw from 'twin.macro';

import Button from '@components/Button';
import Input from '@components/Input';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useUser, { BasicLoginForm } from '@hooks/useUser';

interface BasicLoginProps {
  onLoginSuccess?: () => void;
}

const BasicLogin: React.FC<BasicLoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [message, setMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicLoginForm>();
  const handleSubmitForm: SubmitHandler<BasicLoginForm> = useCallback(
    (data) =>
      login(data)
        .then(() => {
          setMessage(undefined);
          onLoginSuccess?.();
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            setMessage(err.response?.data?.message || '로그인에 실패했습니다.');
          }
        }),
    [login, onLoginSuccess],
  );

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

        <Button type="submit" css={[tw`w-full mt-8`]}>
          로그인
        </Button>
        <div
          css={[
            tw`text-sm text-zinc-600 hover:text-zinc-500 font-bold`,
            tw`cursor-pointer transition-colors`,
          ]}
          onClick={() => navigate('/register')}
        >
          계정이 없으신가요?
        </div>
        {message && (
          <div>
            <div>로그인에 실패했습니다.</div>
            <div>{message}</div>
          </div>
        )}
      </form>
    </DefaultLayout>
  );
};

export default BasicLogin;
