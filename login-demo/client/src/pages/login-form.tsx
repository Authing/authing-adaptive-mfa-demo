import React, { Component, useEffect, useState, FC } from "react";
import request from "superagent";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { getClassnames } from '../IconFont/utils'


export const IconFont: FC<{
  type: string
  style?: React.CSSProperties
  className?: string
}> = ({ type, style, className }) => {
  return (
    <svg style={{ ...style }} className={getClassnames(['g2-icon', className])}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const onSubmit = (event: any) => {
    // event.preventDefault();
    //@ts-ignore
    setLoading(true);
    request
      .post("/api/login")
      .send({
        username: loginInfo.username,
        password: loginInfo.password,
      })
      .end((err: any, res: any) => {
        //@ts-ignore
        setLoading(false);
        if (err) {
          alert("username or password error");
        }
        console.log(res);
        // if(res)
        if (res.body.status) {
          history.push("/personal");
        } else {
          history.push("/login");
        }
      });
  };
  return (
    <div className="mfa-root">
      <div className="mfa-container">
        <Form onFinish={onSubmit} autoComplete="off">
          <Form.Item
            name="username"
            validateTrigger={["onBlur", "onChange"]}
            className="authing-g2-input-form"
            rules={[
              {
                required: true,
                validateTrigger: ["onChange"],
                message: "账号未填写",
                whitespace: true,
              },
            ]}
          >
            <Input
              className="authing-g2-input"
              autoComplete="off"
              size="large"
              placeholder="输入账号"
              onChange={event => {
                setLoginInfo({ ...loginInfo, username: event.target.value })
              }}
              prefix={
                <IconFont
                  type="authing-a-user-line1"
                  style={{ color: '#878A95' }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            validateTrigger={["onBlur", "onChange"]}
            className="authing-g2-input-form"
            rules={[
              {
                required: true,
                validateTrigger: ["onChange"],
                message: "密码未填写",
                whitespace: true,
              },
            ]}
          >
            <Input.Password
              autoComplete="off"
              className="authing-g2-input"
              size="large"
              placeholder="输入登录密码"
              onChange={event => {
                setLoginInfo({ ...loginInfo, password: event.target.value })
              }}
              prefix={
                <IconFont
                  type="authing-a-lock-line1"
                  style={{ color: '#878A95' }}
                />
              }
              iconRender={(visible) => (
                <span style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                  {visible ? (
                    <IconFont type="authing-a-eye-line1" />
                  ) : (
                    <IconFont type="authing-a-eye-close-line1" />
                  )}
                </span>
              )}
            />
          </Form.Item>
          <Form.Item className="authing-g2-sumbit-form">
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
