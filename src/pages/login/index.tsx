import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Input, Button, Checkbox } from '@nutui/nutui-react-taro';
import { Marshalling, Eye } from '@nutui/icons-react-taro';
import * as serivce from '@/service/login';
import { LoginResData, IForm } from './interface';
import './index.scss';

const Login = () => {
  const [formValue, setFormValue] = useState<IForm>({
    username: '',
    password: '',
  });
  const [rememberPWD, setRememberPWD] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('password');
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: APP_NAME,
      path: 'pages/login/index',
      imageUrl: '',
    };
  });
  useShareTimeline(() => {
    return {
      title: APP_NAME,
      path: 'pages/login/index',
      imageUrl: '',
    };
  });
  const onSubmit = async () => {
    if (!formValue.username || !formValue.password) {
      Taro.showToast({ title: '账号或密码错误', icon: 'error' });
      return;
    }
    setLoading(true);
    serivce
      .login(formValue)
      .then((res: LoginResData) => {
        setLoading(false);
        if (res?.statusCode === 200) {
          //判断是否记住密码
          if (rememberPWD) {
            rememberPwdHandler(formValue);
          } else {
            Taro.removeStorageSync('rememberpwd');
          }
          saveStorage(res);
          Taro.switchTab({ url: '/pages/home/index' });
        } else {
          Taro.showToast({ title: res.error_description, icon: 'none' });
        }
      })
      .catch(() => {
        setLoading(false);
        Taro.switchTab({ url: '/pages/home/index' });
      });
  };

  const rememberPwdHandler = (values) => {
    let baseUsername = stringToBase64(values.username);
    let basepwd = stringToBase64(values.password);
    let baseTenantId = stringToBase64(values.tenantId);
    let str = `${baseUsername}&&${basepwd}&&${baseTenantId}`;
    Taro.setStorageSync('rememberpwd', str);
  };
  //字符串转base64
  const stringToBase64 = (str) => {
    let buffer = new ArrayBuffer(str.length * 3);
    let view = new Uint8Array(buffer);
    let pos = 0;
    for (let i = 0; i < str.length; i++) {
      let codePoint = str.charCodeAt(i);
      // 1字节字符（U+0000 到 U+007F）
      if (codePoint < 0x80) {
        view[pos++] = codePoint;
      }
      // 2字节字符（U+0080 到 U+07FF）
      else if (codePoint < 0x800) {
        view[pos++] = 0xc0 | (codePoint >> 6);
        view[pos++] = 0x80 | (codePoint & 0x3f);
      }
      // 3字节字符（U+0800 到 U+FFFF）
      else if (codePoint < 0x10000) {
        view[pos++] = 0xe0 | (codePoint >> 12);
        view[pos++] = 0x80 | ((codePoint >> 6) & 0x3f);
        view[pos++] = 0x80 | (codePoint & 0x3f);
      }
      // 4字节字符（U+10000 到 U+10FFFF）
      else {
        // 注意：微信小程序可能不支持4字节的UTF-8字符，因为JavaScript字符串的charCodeAt方法只返回2字节的值
        throw new Error('Unsupported Unicode character');
      }
    }
    let getArrayBuffer = buffer.slice(0, pos);
    return Taro.arrayBufferToBase64(getArrayBuffer) || '';
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
    Taro.setStorageSync('userInfo', userInfo);
    Taro.setStorageSync('accessInfo', accessInfo);
  };

  return (
    <View className='login-wrapper'>
      <View className='header'>
        <Text className='app_name'>{APP_NAME}</Text>
      </View>
      <View className='form-content'>
        <View className='input-box'>
          <View className='label'>账号</View>
          <Input
            className='form-input'
            value={formValue.username}
            type='text'
            placeholder='请输入账号'
            onChange={(v: string) => setFormValue({ ...formValue, username: v })}
          />
        </View>
        <View className='input-box'>
          <View className='label'>密码</View>
          <Input
            className='form-input'
            type={inputType}
            value={formValue.password}
            placeholder='请输入密码'
            onChange={(v: string) => setFormValue({ ...formValue, password: v })}
          />
          {formValue.password && (
            <View className='psw-icon' onClick={() => setInputType(inputType === 'text' ? 'password' : 'text')}>
              {inputType === 'password' ? <Eye /> : <Marshalling />}
            </View>
          )}
        </View>
        <View className='remember-pwd'>
          <Checkbox label='记住密码' labelPosition='right' checked={rememberPWD} onChange={(value) => setRememberPWD(value)}></Checkbox>
        </View>
        <Button shape='square' loading={loading} onClick={onSubmit}>
          登录
        </Button>
      </View>
      <View className='company-name'>技术支持: {COMPANY_NAME}</View>
    </View>
  );
};

export default Login;
