const {
  inputToLog,
  sortLogs,
  groupByShift,
  shiftActivityToSleepArray,
} = require('./helpers');

describe('dec04', () => {
  
  test('inputToLog', () => {
    expect(inputToLog('[1518-06-02 23:58] Guard #179 begins shift')).toEqual({
      timestamp: new Date('1518-06-02 23:58'),
      description: 'Guard #179 begins shift',
      original:'[1518-06-02 23:58] Guard #179 begins shift'
    });
  });

  test('sortLogs', () => {
    const input = [
      inputToLog('[1518-06-06 23:58] Guard #179 begins shift'),
      inputToLog('[1518-09-18 00:43] wakes up'),
      inputToLog('[1518-06-06 00:10] falls asleep'),
    ];
    const result = sortLogs(input);
    expect(result[0].description).toBe('falls asleep');
    expect(result[1].description).toBe('Guard #179 begins shift');
    expect(result[2].description).toBe('wakes up');
  });

  test('groupByShift', () => {
    const input = [
      inputToLog('[1518-11-01 00:00] Guard #10 begins shift'),
      inputToLog('[1518-11-01 00:05] falls asleep'),
      inputToLog('[1518-11-01 00:25] wakes up'),
      inputToLog('[1518-11-01 00:30] falls asleep'),
      inputToLog('[1518-11-01 00:55] wakes up'),
      inputToLog('[1518-11-01 23:58] Guard #99 begins shift'),
      inputToLog('[1518-11-02 00:40] falls asleep'),
      inputToLog('[1518-11-02 00:50] wakes up'),
      inputToLog('[1518-11-03 00:05] Guard #10 begins shift'),
      inputToLog('[1518-11-03 00:24] falls asleep'),
      inputToLog('[1518-11-03 00:29] wakes up'),
      inputToLog('[1518-11-04 00:02] Guard #99 begins shift'),
      inputToLog('[1518-11-04 00:36] falls asleep'),
      inputToLog('[1518-11-04 00:46] wakes up'),
      inputToLog('[1518-11-05 00:03] Guard #99 begins shift'),
      inputToLog('[1518-11-05 00:45] falls asleep'),
      inputToLog('[1518-11-05 00:55] wakes up'),
    ];
    const result = groupByShift(input);
    expect(result.length).toBe(5);
    expect(result[0].guard).toBe(10);
    expect(result[0].activity.length).toBe(5);
    expect(result[1].guard).toBe(99);
    expect(result[1].activity.length).toBe(3);
    expect(result[2].guard).toBe(10);
    expect(result[2].activity.length).toBe(3);
    expect(result[3].guard).toBe(99);
    expect(result[3].activity.length).toBe(3);
    expect(result[4].guard).toBe(99);
    expect(result[4].activity.length).toBe(3);
  });

  test('shiftActivityToSleepArray', () => {
    const input = [
      inputToLog('[1518-11-01 00:00] Guard #10 begins shift'),
      inputToLog('[1518-11-01 00:05] falls asleep'),
      inputToLog('[1518-11-01 00:25] wakes up'),
      inputToLog('[1518-11-01 00:30] falls asleep'),
      inputToLog('[1518-11-01 00:55] wakes up'),
    ];
    const result = groupByShift(input);
    expect(shiftActivityToSleepArray(result[0].activity)).toEqual([0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0]);
  });
});