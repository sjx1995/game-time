/*
 * @Description: 公共方法
 * @Author: Sunly
 * @Date: 2023-07-11 05:02:29
 */
const transMinToHour = (time: number) => {
  if (time > 60) {
    const h = Math.floor(time / 60);
    const m = time % 60;
    return `${h}小时${m}分钟`;
  } else {
    return `${time}分钟`;
  }
};

// 将毫秒数转换为天数，如果不足一天则转换为小时，如果不足一小时则转换为分钟
const formatTime = (time: number) => {
  if (time > 86400000) {
    const d = Math.floor(time / 86400000);
    const h = Math.floor((time % 86400000) / 3600000);
    return `${d}天${h}小时`;
  } else {
    return transMinToHour(Math.floor(time / 60000));
  }
};

export { transMinToHour, formatTime };
