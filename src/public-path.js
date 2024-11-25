// public-path.js
// qiankun运行时会自动在 window中添加布尔值：__POWERD_BY_QIANKUN__
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
