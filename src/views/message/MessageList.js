import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
  CSpinner,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import moment from "moment";
import {
  getAllMessages,
  getAllUsers,
  letDeleteTheMessage,
} from "src/store/actions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const MessageList = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.appUsers);
  const dataLoader = useSelector((state) => state.message.loading);
  const receivedData = useSelector((state) => state.message.receivedArr);
  const sentData = useSelector((state) => state.message.sentArr);

  const [UserId, setUserId] = useState(currentUser ? currentUser.id : 0);

  useEffect(() => {
    dispatch(getAllMessages({ user_id: UserId }));
    return () => {};
  }, [dispatch, UserId]);

  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, allUsers]);

  const handleDeleteMessageClick = (id) => {
    confirmAlert({
      title: "Confirmation",
      message: `Are you sure to want to delete?`,
      buttons: [
        {
          label: "Yes, Delete it.",
          onClick: async () => {
            dispatch(letDeleteTheMessage({ message_id: parseInt(id) }));
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <CRow>
      <CCol xs="3" className="mb-4">
        <CSelect
          custom
          name="select"
          id="select"
          defaultValue={UserId}
          onChange={(e) => setUserId(parseInt(e.target.value))}
        >
          <option value="0">Please select</option>
          {allUsers.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </CSelect>
      </CCol>
      <CCol xs="12" className="mb-4">
        <CCard className="c-email-app">
          <CCardHeader>
            Messages
            {dataLoader && receivedData.length > 0 && (
              <CSpinner size="sm" className="ml-3" />
            )}
          </CCardHeader>
          {!dataLoader && (
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>Received</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>Sent</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent className="mt-2">
                  <CTabPane>
                    <div className="c-messages">
                      {receivedData.map((receivedItem, index) => (
                        <div className="c-message" key={`received-${index}`}>
                          <div
                            className="c-message-actions c-pointer"
                            onClick={() =>
                              handleDeleteMessageClick(receivedItem.id)
                            }
                          >
                            <CIcon name="cil-trash" />
                          </div>
                          <div className="c-message-details">
                            <div className="c-message-headers">
                              <div className="c-message-headers-from">
                                {receivedItem.sender.name}
                              </div>
                              <div className="c-message-headers-date">
                                <CIcon name="cil-paperclip" />{" "}
                                {moment
                                  .utc(receivedItem.created_at)
                                  .local()
                                  .format("YYYY-MM-DD HH:mm:ss")}
                              </div>
                              <div className="c-message-headers-subject">
                                {receivedItem.subject}
                              </div>
                            </div>
                            <div className="c-message-body">
                              {receivedItem.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {receivedData.length === 0 && (
                      <div className="p-5 d-flex justify-content-center">
                        No data found
                      </div>
                    )}
                  </CTabPane>
                  <CTabPane>
                    <div className="c-messages">
                      {sentData.map((sentItem, index) => (
                        <div className="c-message" key={`sent-${index}`}>
                          <div
                            className="c-message-actions c-pointer"
                            onClick={() =>
                              handleDeleteMessageClick(sentItem.id)
                            }
                          >
                            <CIcon name="cil-trash" />
                          </div>
                          <div className="c-message-details">
                            <div className="c-message-headers">
                              <div className="c-message-headers-from">
                                {sentItem.receiver.name}
                              </div>
                              <div className="c-message-headers-date">
                                <CIcon name="cil-paperclip" />{" "}
                                {moment
                                  .utc(sentItem.created_at)
                                  .local()
                                  .format("YYYY-MM-DD HH:mm:ss")}
                              </div>
                              <div className="c-message-headers-subject">
                                {sentItem.subject}
                              </div>
                            </div>
                            <div className="c-message-body">
                              {sentItem.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {sentData.length === 0 && (
                      <div className="p-5 d-flex justify-content-center">
                        No data found
                      </div>
                    )}
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          )}

          {/* Show loader */}
          {dataLoader && receivedData.length === 0 && (
            <CRow className="p-5 d-flex justify-content-center">
              <CSpinner className="ml-3" />
            </CRow>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default MessageList;
