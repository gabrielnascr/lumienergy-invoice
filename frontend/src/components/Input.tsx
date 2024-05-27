import React from "react";
import { IconType } from "react-icons";
import { Field, ErrorMessage } from "formik";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  icon: IconType;
}

export default function Input({
  type,
  placeholder,
  name,
  icon: Icon,
}: InputProps) {
  return (
    <div className="relative mb-4">
      <Field
        className="bg-inputColor p-3 w-80 outline-0 rounded pl-10"
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <Icon color="gray" className="absolute top-4 left-3" />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}
