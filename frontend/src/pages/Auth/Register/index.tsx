import React, { useEffect } from "react";
import RegisterView from "./view";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { MdLock, MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { register } from "../../../store/modules/auth/authSlice";
import { store } from "../../../store";

const validationSchema = Yup.object({
  name: Yup.string().required("Esse campo é obrigatório"),
  email: Yup.string().email("Email inválido").required("Obrigatório"),
  password: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("Esse campo é obrigatório"),
});

export default function Register() {
  const { authenticated, loading } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (authenticated && !loading) {
      navigation("/dashboard");
    }
  }, [authenticated, loading, navigation]);
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values: {
        name: string;
        email: string;
        password: string;
      }) => {
        await store.dispatch(register(values)).then(() => navigation("/login"));
      }}
    >
      {({ isSubmitting, submitForm, handleSubmit }) => (
        <Form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <RegisterView
            isSubmitting={isSubmitting}
            icons={{ name: FaRegUser, email: MdOutlineEmail, password: MdLock }}
          />
        </Form>
      )}
    </Formik>
  );
}
