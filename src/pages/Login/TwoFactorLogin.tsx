import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import tw, { css } from 'twin.macro';
import { LoginResponse } from 'types/API';

import Button from '@components/Button';
import Input from '@components/Input';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useAxiosInstance from '@hooks/useAxiosInstance';
import useUser, { TwoFactorLoginForm } from '@hooks/useUser';
import authorizationState from '@recoil/atoms/authorization';

interface TwoFactorLoginProps {
  onLoginSuccess?: () => void;
}

const TwoFactorLogin: React.FC<TwoFactorLoginProps> = ({ onLoginSuccess }) => {
  const { twoFactorLogin } = useUser();

  const [message, setMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorLoginForm>();
  const handleSubmitForm: SubmitHandler<TwoFactorLoginForm> = useCallback(
    (data) =>
      twoFactorLogin(data)
        .then(() => {
          setMessage(undefined);
          onLoginSuccess?.();
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            setMessage(err.response?.data?.message || '로그인에 실패했습니다.');
          }
        }),
    [onLoginSuccess, twoFactorLogin],
  );

  return (
    <DefaultLayout css={[tw`flex flex-col justify-center items-center`]}>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Login</div>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        css={[tw`w-[15rem]`, tw`mx-auto`, tw`flex flex-col justify-center items-center gap-2`]}
      >
        <Input
          type="number"
          label="2FA Code"
          css={[
            tw`w-full`,
            css`
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                ${tw`appearance-none`}
              }
            `,
          ]}
          invalid={errors.twoFactorCode && (errors.twoFactorCode.message || '잘못된 입력값입니다.')}
          {...register('twoFactorCode', { required: true, minLength: 6, maxLength: 6 })}
        />

        <Button type="submit" css={[tw`w-full mt-8`]}>
          로그인
        </Button>
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

export default TwoFactorLogin;
