import React, { useState, useEffect, useRef } from "react";

import "../../../style/ChatRoomStyle.css";
import * as ncloudchat from "ncloudchat";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, NavbarMenuToggle, User } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbCherryFilled } from "react-icons/tb";
import Layout from "../../../common/Layout";
import { Cookies } from "react-cookie";
import { instance } from "../../../recoil/module/instance";
import GPTChatUserInfo from "./GPTChatUserInfo";

const GPTChatRoom = () => {




  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="user_chat_data">
              <div className="chat_section msg_history" id="chat-messages">
                <div className="chat-nav">
                  <span>
                    <IoIosArrowBack
                      style={{ fontSize: "30px", cursor: "pointer" }}
                      onClick={() => navi("/chat")}
                    />
                  </span>
                  <span>
                    <GiHamburgerMenu
                      style={{
                        float: "right",
                        cursor: "pointer",
                        fontSize: "30px",
                      }}
                    />
                  </span>
                </div>

                {/* 현재 채널의 메시지 표시 */}
                {messages.map &&
                  messages.map((message, index) => (
                    <div
                      key={index}
                      style={{
                        textAlign:
                          message.sender.id === accountData.email
                            ? "right"
                            : "left",
                        margin: "10px",
                      }}
                    >
                      {/* data.email */}
                      {message.sender.id !== accountData.email ? (
                        <User
                          onClick={handleAvatarClick}
                          className={
                            message.sender.id === accountData.email
                              ? "sent-message"
                              : "received-message"
                          }
                          avatarProps={{
                            src: "message.sender.profile",
                          }}
                          style={{ fontSize: "8px", color: "gray" }}
                        />
                      ) : null}

                      <div
                        style={{
                          backgroundColor:
                            message.sender.id === accountData.email
                              ? "lightblue"
                              : "lightgreen",
                          padding: "5px",
                          borderRadius: "4px",
                          display: "inline-block",
                        }}
                      >
                        <strong>{message.sender.name}</strong>
                        <div>{message.content}</div>
                        <div style={{ fontSize: "12px", color: "gray" }}>
                          {new Date(message.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                {isModalOpen && (
                  <GPTChatUserInfo messages={messages} accountData={accountData} />
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* 메시지 입력 및 전송 UI */}
              <div
                className="type_msg"
                style={{ position: "fixed", bottom: "50px", width: "600px" }}
              >
                <div className="input_msg_write">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className="write_msg"
                      placeholder="Type a message"
                      value={userInput}
                      onChange={handleUserInput}
                    />
                    <button type="submit" className="msg_send_btn">
                      <TbCherryFilled
                        style={{ fontSize: "30px", color: "#F31260" }}
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GPTChatRoom;
