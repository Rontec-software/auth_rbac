'use client';
import Input from '@/components/shared/Input';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-90"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="w-[450px] bg-[#18181B] p-12 rounded-md">
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/logo.svg"
              width={200}
              height={200}
              alt="icone-escrever"
            />
          </div>
          <div className="flex flex-col justify-center items-center text-[14px] text-white">
            <div>Entre com sua conta</div>
          </div>
          <Input
            name="Email"
            event={(e) => { }}
            value=''
            iconAfter={
              <Image src="/email.svg" width={20} height={20} alt="email" />
            }
            type="text"
          />
          <Input
            name="Senha"
            iconAfter={
              <Image src="/eye.svg" width={20} height={20} alt="senha" />
            }
            type="password"
            value=''
            event={(e) => { }}
          />
          <button
            className="bg-[#22C55E] text-white font-bold rounded-md p-2 mt-6 w-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
