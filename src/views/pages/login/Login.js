import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";

// action
import { loginUser } from "../../../store/actions";

import { Formik } from "formik";
import * as Yup from "yup";

// load notification css and dependency
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Login = () => {
  const dispatch = useDispatch();

  const Loader = useSelector((state) => state.auth.loading);

  const validationSchema = function (values) {
    return Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Please enter valid email address"),
      password: Yup.string().required("Password is required"),
    });
  };

  const validate = (getValidationSchema) => {
    return (values) => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        return getErrorsFromValidationError(error);
      }
    };
  };

  const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      };
    }, {});
  };

  const initialValues = {
    email: "",
    password: "",
  };

  // Login button click
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    // const { userName, password } = values;
    try {
      // Dispatch ligin action
      dispatch(loginUser(values));
    } catch (err) {
      setSubmitting(false);
      NotificationManager.error(err.message, "Error", 5000);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol sm="6" md="6" lg="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={initialValues}
                    validate={validate(validationSchema)}
                    onSubmit={onSubmit}
                    key="login-form"
                  >
                    {({
                      values,
                      errors,
                      touched,
                      status,
                      dirty,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      isValid,
                    }) => (
                      <CForm
                        onSubmit={handleSubmit}
                        noValidate
                        name="simpleForm"
                      >
                        <CFormGroup>
                          <CLabel htmlFor="email">Email</CLabel>
                          <CInput
                            type="text"
                            name="email"
                            id="email"
                            placeholder="email"
                            valid={!errors.email && touched.email}
                            invalid={touched.email && !!errors.email}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <CInvalidFeedback>{errors.email}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="password">Password</CLabel>
                          <CInput
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            valid={!errors.password && touched.password}
                            invalid={touched.password && !!errors.password}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <CInvalidFeedback>{errors.password}</CInvalidFeedback>
                        </CFormGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              color="primary"
                              className="px-4"
                              disabled={isSubmitting || !isValid || Loader}
                              // onClick={loginBtnClick}
                            >
                              {Loader ? "Please wait..." : "Login"}
                              {Loader && (
                                <CSpinner size="sm" className="ml-3" />
                              )}
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        {/* Notification container */}
        <NotificationContainer />
      </CContainer>
    </div>
  );
};

export default Login;
