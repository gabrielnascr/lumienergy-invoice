import React from "react";
import Input from "../../../components/Input";

interface LoginViewProps {
  isSubmitting: boolean;
  icons: any;
  submitForm: () => Promise<void>;
}

export default function LoginView({
  isSubmitting,
  icons,
  submitForm,
}: LoginViewProps) {
  return (
    <>
      <div className="justify-center items-center text-center flex flex-col">
        <img
          className="w-36 h-36"
          src="https://media.licdn.com/dms/image/C4D0BAQHcIiVqOtOAnQ/company-logo_200_200/0/1660403653527/labs_lumi_logo?e=1724889600&v=beta&t=o9tSo2v5-sfr6xC_SP3QI_mj9N21UqCtN4UeW1yOus4"
          alt="Lumi Energy Logo"
        />
        <h1 className="text-white font-bold text-2xl mb-5">Lumi Energy</h1>
      </div>
      <Input icon={icons.email} name="email" placeholder="E-mail" type="text" />
      <Input
        icon={icons.password}
        name="password"
        placeholder="Senha"
        type="password"
      />
      <button
        type="submit"
        className="cursor bg-greenLumi w-40 p-2 rounded-3xl text-white font-bold"
        disabled={isSubmitting}
        onClick={submitForm}
      >
        Entrar
      </button>
    </>
  );
}
