/*
 * Copyright 2024 lspriv. All Rights Reserved.
 * Distributed under MIT license.
 * See File LICENSE for detail or copy at https://opensource.org/licenses/MIT
 * @Description: Description
 * @Author: lspriv
 * @LastEditTime: 2024-11-25 23:10:23
 */
import {
  type Plugin,
  type WcYear,
  type CalendarDay,
  type TrackDateResult,
  type TrackYearResult,
  type WcAnnualMarks,
  type WcAnnualMark,
  isLeapYear,
  getAnnualMarkKey,
  GREGORIAN_MONTH_DAYS
} from '@lspriv/wx-calendar/lib';

// eslint-disable-next-line import/no-unresolved
import { Lunar } from './lunar';
export interface LunarOptions {
  markColor?: string;
  nyColor?: string;
  fdColor?: string;
}

export class LunarPlugin implements Plugin {
  public static KEY = 'lunar' as const;

  private options: Required<LunarOptions>;

  constructor(options: LunarOptions) {
    this.options = {
      markColor: options.markColor || 'var(--wc-solar-color)',
      nyColor: options.nyColor || '#F56C6C',
      fdColor: options.fdColor || '#409EFF'
    };
  }

  public getLunar(date: CalendarDay): ReturnType<(typeof Lunar)['lunar']> {
    return Lunar.lunar(date.year, date.month, date.day);
  }

  public PLUGIN_TRACK_DATE(date: CalendarDay): TrackDateResult {
    const lunar = Lunar.lunar(date.year, date.month, date.day);

    return {
      festival: {
        text: lunar?.solar || lunar?.lunarDay || '',
        style: {
          color: lunar?.solar ? this.options.markColor : ''
        }
      }
    };
  }

  public PLUGIN_TRACK_YEAR(year: WcYear): TrackYearResult {
    let lunarYear: string = '';
    const marks: WcAnnualMarks = new Map();
    const { nyColor, fdColor } = this.options;
    for (let i = 0; i < 12; i++) {
      const days = i === 1 && isLeapYear(year.year) ? GREGORIAN_MONTH_DAYS[i] + 1 : GREGORIAN_MONTH_DAYS[i];
      const month = i + 1;
      for (let j = 0; j < days; j++) {
        const day = j + 1;
        const lunar = Lunar.lunar(year.year, month, day);
        if (month === 10 && day === 1) lunarYear = lunar?.lunarYear || '';
        if (lunar?.day === 1) {
          const key = getAnnualMarkKey({ month, day });
          const set: WcAnnualMark = {};
          set.sub = lunar?.month === 1 ? nyColor : fdColor;
          marks.set(key, set);
        }
      }
    }

    return {
      subinfo: [
        { text: lunarYear, color: nyColor },
        { text: '农历初一', color: fdColor }
      ],
      marks
    };
  }
}

export const LUNAR_PLUGIN_KEY = LunarPlugin.KEY;
