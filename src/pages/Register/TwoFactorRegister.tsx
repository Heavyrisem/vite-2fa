import React, { useEffect, useState } from 'react';

import tw from 'twin.macro';

import Button from '@components/Button';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useAxiosInstance from '@hooks/useAxiosInstance';

interface TwoFactorRegisterProps {
  onRegisterSuccess?: () => void;
}

const TwoFactorRegister: React.FC<TwoFactorRegisterProps> = ({ onRegisterSuccess }) => {
  const axiosInstance = useAxiosInstance();

  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => {
    axiosInstance.get('/api/auth/2fa', { responseType: 'blob' }).then((res) => {
      if (!imgSrc) {
        const objectURL = URL.createObjectURL(res.data);
        setImgSrc(objectURL);
      }
    });
  }, [axiosInstance, imgSrc]);

  return (
    <DefaultLayout css={[tw`flex flex-col justify-center items-center`]}>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Register</div>
      <div css={[tw`w-[20rem]`, tw`flex flex-col gap-4 justify-center items-center`]}>
        <img src={imgSrc} css={[tw`m-auto`]} alt="QR" />
        <span>OTP 어플리케이션에 QR코드를 등록해 주세요</span>
        <Button type="button" css={[tw`w-full`]} onClick={onRegisterSuccess}>
          다음
        </Button>
      </div>
    </DefaultLayout>
  );
};

export default TwoFactorRegister;
