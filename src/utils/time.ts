export const queryDateTimeFormat = (
  dateList: string[],
  startTimeFormat = '00:00:00',
  endTimeFormat = '23:59:59'
) => {
  return [dateList[0] + ' ' + startTimeFormat, dateList[1] + ' ' + endTimeFormat]
}
