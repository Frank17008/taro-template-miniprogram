import { useEffect } from 'react';
import Taro, { useDidShow, useDidHide, useLaunch } from '@tarojs/taro';
// 全局样式
import './app.scss';

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {});
  // 对应 onHide
  useDidHide(() => {});

  /**
   * 检测当前的小程序
   * 是否是最新版本，是否需要下载、更新
   */
  function checkUpdateVersion() {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            Taro.showModal({
              showCancel: false,
              title: '温馨提示',
              content: '检测到新版本，是否重启小程序？',
              success: (sres) => {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                sres.confirm && updateManager.applyUpdate();
              },
            });
          });
          updateManager.onUpdateFailed(() => {
            Taro.showModal({
              title: '已有新版本',
              content: '请您删除小程序，重新搜索进入',
            });
          });
        }
      });
    } else {
      Taro.showModal({
        title: '温馨提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      });
    }
  }

  useDidShow(() => {
    checkUpdateVersion();
  });

  return props.children;
}

export default App;

