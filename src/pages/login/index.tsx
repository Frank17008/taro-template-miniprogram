import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import { View, Text, Form, Button } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import * as serivce from "@service/login";

import "taro-ui/dist/style/components/article.scss"; // 按需引入样式
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/input.scss";
import "./index.scss";

const Login = () => {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [username, setUserName] = useState<string>();
  const [password, setPassWord] = useState<string>();

  const onSubmit = () => {
    // serivce.login({ username, password }).then((res) => {});
    serivce.login({ username, password }).then((res) => {});
  };

  return (
    <View className="login-wrapper">
      <Text className="at-article__h3">{APP_NAME}</Text>
      <View>
        <AtForm onSubmit={onSubmit}>
          <AtInput
            value={username}
            name="username"
            type="text"
            placeholder="请输入账号"
            onChange={(v: string) => setUserName(v)}
          />
          <AtInput
            value={password}
            name="password"
            type="password"
            placeholder="请输入密码"
            onChange={(v: string) => setPassWord(v)}
          />
          <Button formType="submit" type="primary">
            登录
          </Button>
        </AtForm>
      </View>
    </View>
  );
};

export default Login;
