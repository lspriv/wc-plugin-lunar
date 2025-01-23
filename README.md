## Wx Calendar Plugin For Lunar
![NPM Version](https://img.shields.io/npm/v/@lspriv/wc-plugin-lunar)
![Static Badge](https://img.shields.io/badge/coverage-later-a9a9a9)
![GitHub License](https://img.shields.io/github/license/lspriv/wc-plugin-lunar)

小程序日历 [`wx-calendar`](https://github.com/lspriv/wx-calendar) 农历插件

### 使用
- 小程序基础库 `SDKVersion` >= 3.0.0
- 日历组件 [`wx-calendar`](https://github.com/lspriv/wx-calendar) >= 1.8.0

#### 安装
```bash
npm i @lspriv/wc-plugin-lunar -S
```

#### 构建
微信小程序开发工具菜单栏：`工具` --> `构建 npm`
[*官方文档*](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html#_2-%E6%9E%84%E5%BB%BA-npm)

#### 页面使用
```html
<calendar id="calendar" />
```
```javascript
const { WxCalendar } = require('@lspriv/wx-calendar/lib');
const { LunarPlugin, LUNAR_PLUGIN_KEY } = require('@lspriv/wc-plugin-lunar');

WxCalendar.use(LunarPlugin);

Page({
  handleCalendarLoad() {
    const calendar = this.selectComponent('#calendar');
    const lunarPlugin = calendar.getPlugin(LUNAR_PLUGIN_KEY);
    // 获取农历信息
    const lunarDate = lunarPlugin.getLunar({ year: 2023, month: 10, day: 26 });
    console.log('lunarDate', lunarDate);
  }
})
```

#### 插件选项
[***`markColor`***](#cli) `string` 农历节气下标颜色，默认 --wc-solar-color

[***`nyColor`***](#cli) `string` 年面板大年初一颜色，默认 #F56C6C

[***`nyColor`***](#cli) `string` 年面板农历普通月初一颜色，默认 #409EFF

### 关于

>     有任何问题或是需求请到 `Issues` 面板提交
>     忙的时候还请见谅
>     有兴趣开发维护的道友加微信

![wx_qr](https://chat.qilianyun.net/static/git/calendar/wx.png)

