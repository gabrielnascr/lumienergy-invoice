import React, { useEffect } from "react";
import LoginView from "./view";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { MdLock, MdOutlineEmail } from "react-icons/md";
import { store } from "../../../store";
import { authenticate } from "../../../store/modules/auth/authSlice";
import AuthRoute from "../AuthRoute";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Obrigatório"),
  password: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("Esse campo é obrigatório"),
});

export default function Login() {
  return (
    <AuthRoute redirectPath="/dashboard">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (values: { email: string; password: string }) => {
          await store.dispatch(authenticate(values));
        }}
      >
        {({ isSubmitting, submitForm, handleSubmit }) => (
          <Form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <LoginView
              isSubmitting={isSubmitting}
              icons={{ email: MdOutlineEmail, password: MdLock }}
              submitForm={submitForm}
            />
          </Form>
        )}
      </Formik>
    </AuthRoute>
  );
}
