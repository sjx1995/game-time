/*
 * @Description: 公共方法
 * @Author: Sunly
 * @Date: 2023-07-11 05:02:29
 */
function transMinToHour(time: number): string {
  if (time > 60) {
    const hours: number = Math.floor(time / 60);
    const minutes: number = time % 60;
    return `${hours}小时${minutes}分钟`;
  } else {
    return `${time}分钟`;
  }
}

// 将毫秒数转换为天数，如果不足一天则转换为小时，如果不足一小时则转换为分钟
const formatTime = (t: number): string => {
  if (t > 86400000) {
    const days: number = Math.floor(t / 86400000);
    const hours: number = Math.floor((t % 86400000) / 3600000);
    const res: string = `${days}天${hours}小时`;
    return res.includes("0分钟") ? res.replace("0分钟", "") : res;
  } else {
    return transMinToHour(Math.floor(t / 60000));
  }
};

export { transMinToHour, formatTime };
