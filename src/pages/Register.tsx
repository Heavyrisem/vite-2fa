import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import tw from 'twin.macro';
import { RegisterResponse } from 'types/API';

import Button from '@components/Button';
import Input from '@components/Input';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import { axios } from '@utils/axios';

interface RegisterForm {
  email: string;
  name: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [qrURL, setQrURL] = useState<string>();
  const [message, setMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const handleSubmitForm: SubmitHandler<RegisterForm> = useCallback(async (data) => {
    const response = await axios.axiosInstance
      .post<RegisterResponse>('/api/user/register', data)
      .then((res) => res.data)
      .catch((err) => {
        if (err instanceof AxiosError) {
          setMessage(err.response?.data?.message || '회원가입에 실패했습니다.');
        }
      });

    if (response) {
      setMessage(undefined);
      setQrURL(response.result.twoFactorUrl);
    }
  }, []);

  const handleClickQR = useCallback(() => {
    window.open(qrURL, '_blank', 'noopener,noreferrer');
  }, [qrURL]);

  return (
    <DefaultLayout css={[tw`flex flex-col justify-center items-center`]}>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Register</div>
      {qrURL ? (
        <div css={[tw`w-[20rem]`, tw`flex flex-col gap-4 justify-center items-center`]}>
          <QRCodeSVG
            value={qrURL}
            size={256}
            fgColor="white"
            bgColor="rgba(0,0,0,0)"
            onClick={handleClickQR}
            css={[tw`m-auto`]}
          />
          <span>OTP 어플리케이션에 QR코드를 등록해 주세요</span>
          <Button type="button" css={[tw`w-full`]} onClick={() => navigate('/login')}>
            다음
          </Button>
        </div>
      ) : (
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
      )}
    </DefaultLayout>
  );
};

export default Register;
