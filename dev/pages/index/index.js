/*
 * @Description: Description
 * @Author: lishen
 * @Date: 2023-08-31 16:46:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-11-25 23:11:14
 */
const { WxCalendar } = require('@lspriv/wx-calendar/lib');
const { LunarPlugin, LUNAR_PLUGIN_KEY } = require('../../plugins/wc-plugin-lunar/index');

WxCalendar.use(LunarPlugin);

Page({
  data: {
    padding: 0
  },
  onLoad() {
    const { bottom } = wx.getMenuButtonBoundingClientRect();
    this.setData({
      padding: bottom
    });
  },
  handleLoad(e) {
    console.log('handleLoad', e);
  },
  handleChange({ detail }) {
    console.log('calendar-date-change', detail);
  },
  handleViewChange({ detail }) {
    console.log('calendar-view-change', detail);
  },
  handleSchedule(e) {
    console.log('handleSchedule', e);
  }
});
