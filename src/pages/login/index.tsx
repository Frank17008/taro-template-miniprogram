import Taro from "@tarojs/taro";
import { useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import { Input } from "@nutui/nutui-react-taro";
import { Marshalling, Eye } from "@nutui/icons-react-taro";
import * as serivce from "@/service/login";
import { LoginResData, IForm } from "./interface";
import "./index.scss";

const Login = () => {
  const [formValue, setFormValue] = useState<IForm>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");
  const onSubmit = async () => {
    if (!formValue.username || !formValue.password) {
      Taro.showToast({ title: "账号或密码错误", icon: "error" });
      return;
    }
    setLoading(true);
    serivce
      .login(formValue)
      .then((res: LoginResData) => {
        setLoading(false);
        if (res?.statusCode === 200) {
          saveStorage(res);
          Taro.switchTab({ url: "/pages/home/index" });
        } else {
          Taro.showToast({ title: res.error_description, icon: "none" });
        }
      })
      .catch(() => {
        setLoading(false);
        Taro.switchTab({ url: "/pages/home/index" });
      });
  };

  const saveStorage = (data) => {
    const userInfo = {
      account: data.account,
      userName: data.user_name,
      tenantId: data.tenant_id,
      userId: data.user_id,
      deptId: data.dept_id,
      nickName: data.nick_name,
      realName: data.real_name,
      roleId: data.role_id,
      roleName: data.role_name,
      avatar: data.avatar,
      scope: data.scope,
    };
    const accessInfo = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expires: data.expires_in,
      detail: data.detail,
      tokenType: data.token_type,
      loginTime: Date.now(),
      expiresTime: Date.now() + data.expires_in * 1000,
    };
    Taro.setStorageSync("userInfo", userInfo);
    Taro.setStorageSync("accessInfo", accessInfo);
  };

  return (
    <View className="login-wrapper">
      <View className="header">
        <Text className="app_name">{APP_NAME}</Text>
      </View>
      <View className="form-content">
        <View className="input-box">
          <View className="label">账号</View>
          <Input
            className="form-input"
            value={formValue.username}
            type="text"
            placeholder="请输入账号"
            onChange={(v: string) =>
              setFormValue({ ...formValue, username: v })
            }
          />
        </View>
        <View className="input-box">
          <View className="label">密码</View>
          <Input
            className="form-input"
            type={inputType}
            value={formValue.password}
            placeholder="请输入密码"
            onChange={(v: string) =>
              setFormValue({ ...formValue, password: v })
            }
          />
          {formValue.password && (
            <View
              className="psw-icon"
              onClick={() =>
                setInputType(inputType === "text" ? "password" : "text")
              }
            >
              {inputType === "password" ? <Eye /> : <Marshalling />}
            </View>
          )}
        </View>
        <Button
          className="form-btn"
          block
          shape="square"
          type="primary"
          loading={loading}
          onClick={onSubmit}
        >
          登录
        </Button>
      </View>
      <View className="company-name">技术支持: {COMPANY_NAME}</View>
    </View>
  );
};

export default Login;
