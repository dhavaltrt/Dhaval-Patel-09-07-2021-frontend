import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CSpinner,
  CSelect,
} from "@coreui/react";

import { getAllUsers, letSendTheMessage } from "src/store/actions";
import { NotificationManager } from "react-notifications";

const Compose = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.loading);
  const allUsers = useSelector((state) => state.auth.appUsers);
  const currentUser = useSelector((state) => state.auth.user);
  const actionType = useSelector((state) => state.auth.type);
  const sendMessageLoader = useSelector(
    (state) => state.auth.sendMessage.isLoader
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // form states
  const [formState, setFormState] = useState({
    sender_id: currentUser ? currentUser.id : "",
    receiver_id: "",
    subject: "",
    message: "",
  });

  // Send button click
  const onSubmit = (e) => {
    e.preventDefault();

    let checkErrors = false;

    Object.keys(formState).map((key) => {
      if (formState[key] === "") {
        checkErrors = true;
        return false;
      }
      return [];
    });

    if (checkErrors) {
      NotificationManager.error("All fields are mandatory", "Error", 5000);
      return false;
    }

    // check if sender and receiver are not same
    if (formState.sender_id === formState.receiver_id) {
      NotificationManager.error(
        "Sender and receiver should not the same",
        "Error",
        5000
      );
      return false;
    }
    dispatch(letSendTheMessage(formState));
  };

  useEffect(() => {
    if (actionType === "SEND_MESSAGE_SUCCESS") {
      // reset the form
      setFormState({
        sender_id: "",
        receiver_id: "",
        subject: "",
        message: "",
      });
    }
  }, [actionType, currentUser]);

  return (
    <CCard className="c-email-app">
      {!isLoading && currentUser && (
        <CCardBody>
          <p className="text-center">New Message</p>
          <CForm onSubmit={onSubmit} noValidate name="simpleForm">
            <CRow form className="mb-3">
              <CLabel sm="1" className="col-1" htmlFor="select">
                Sender: <span className="text-danger">*</span>
              </CLabel>
              <CCol sm="6">
                <CSelect
                  custom
                  name="select"
                  id="select"
                  value={formState.sender_id}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      sender_id: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value="0">Please select</option>
                  {allUsers.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </CRow>
            <CRow form className="mb-3">
              <CLabel sm="1" className="col-1" htmlFor="select-2">
                Receiver: <span className="text-danger">*</span>
              </CLabel>
              <CCol sm="6">
                <CSelect
                  custom
                  name="select"
                  id="select-2"
                  value={formState.receiver_id}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      receiver_id: parseInt(e.target.value),
                    });
                  }}
                  required
                >
                  <option value="0">Please select</option>
                  {allUsers.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            </CRow>
            <CRow form className="mb-3">
              <CLabel sm="1" className="col-1" htmlFor="subject">
                Subject: <span className="text-danger">*</span>
              </CLabel>
              <CCol sm="6">
                <CInput
                  className="form-control"
                  id="subject"
                  type="email"
                  placeholder="Enter subject"
                  value={formState.subject}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      subject: e.target.value,
                    });
                  }}
                  required
                />
              </CCol>
            </CRow>

            <CRow>
              <CLabel sm="1" className="col-1" htmlFor="bcc">
                Message: <span className="text-danger">*</span>
              </CLabel>
              <CCol sm="6">
                <CTextarea
                  rows="12"
                  placeholder="Message content"
                  value={formState.message}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      message: e.target.value,
                    });
                  }}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CLabel sm="1" className="col-1" htmlFor="bcc">
                &nbsp;
              </CLabel>
              <CCol sm="6">
                <CFormGroup>
                  <CButton
                    color="success"
                    type="submit"
                    disabled={sendMessageLoader}
                  >
                    {sendMessageLoader ? "Please wait..." : "Send"}
                    {sendMessageLoader && (
                      <CSpinner size="sm" className="ml-3" />
                    )}
                  </CButton>
                </CFormGroup>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      )}

      {/* Show loader */}
      {isLoading && (
        <CRow className="p-5 d-flex justify-content-center">
          <CSpinner className="ml-3" />
        </CRow>
      )}
    </CCard>
  );
};

export default Compose;
