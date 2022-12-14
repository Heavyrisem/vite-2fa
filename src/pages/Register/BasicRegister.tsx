import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import tw from 'twin.macro';
import { RegisterResponse } from 'types/API';

import Button from '@components/Button';
import Input from '@components/Input';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useAxiosInstance from '@hooks/useAxiosInstance';
import useUser, { BasicRegisterForm } from '@hooks/useUser';
import authorizationState from '@recoil/atoms/authorization';

interface BasicRegisterProps {
  onRegisterSuccess?: () => void;
}

const BasicRegister: React.FC<BasicRegisterProps> = ({ onRegisterSuccess }) => {
  const { register: doRegister } = useUser();

  const [message, setMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicRegisterForm>();

  const handleSubmitForm: SubmitHandler<BasicRegisterForm> = useCallback(
    (data) => {
      doRegister(data)
        .then(() => {
          setMessage(undefined);
          onRegisterSuccess?.();
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            setMessage(err.response?.data?.message || '회원가입에 실패했습니다.');
          }
        });
    },
    [doRegister, onRegisterSuccess],
  );

  return (
    <DefaultLayout css={[tw`flex flex-col justify-center items-center`]}>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Register</div>
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
          type="text"
          label="name"
          css={[tw`w-full`]}
          invalid={errors.name && (errors.name.message || '잘못된 입력값입니다.')}
          {...register('name', { required: true, minLength: 3 })}
        />
        <Input
          type="password"
          label="password"
          css={[tw`w-full`]}
          invalid={errors.password && (errors.password.message || '잘못된 입력값입니다.')}
          {...register('password', { required: true })}
        />

        <Button type="submit" css={[tw`w-full mt-8`]}>
          회원가입
        </Button>
        {message && (
          <div>
            <div>회원가입에 실패했습니다.</div>
            <div>{message}</div>
          </div>
        )}
      </form>
    </DefaultLayout>
  );
};

export default BasicRegister;
