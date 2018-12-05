function inputToLog(original) {
  const [date, description] = original.split(']');
  return {
    timestamp: new Date(date.substr(1)),
    description: description.trim(),
    original
  };
}

function sortLogs(logs) {
  return logs.sort((a, b) => a.timestamp - b.timestamp);
}
 
function retrieveGuard(description) {
  return Number(description.split(' ')[1].substr(1));
}

function newShift(log) {
  return {
    guard: retrieveGuard(log.description),
    begin: log.timestamp,
    activity: [log.original],
  };
}

function groupByShift(logs) {
  const allShifts = [];
  let currentShift = null;
  for (let i = 0; i < logs.length; i++) {
    if(!currentShift) {
      currentShift = newShift(logs[i]);
    } else if(currentShift && logs[i].description.includes('Guard #')) {
      allShifts.push(currentShift);
      currentShift = newShift(logs[i]);
    } else {
      currentShift.activity.push(logs[i].original);
    }    
  }
  allShifts.push(currentShift);
  return allShifts;
}

function shiftActivityToSleepArray(activity) {
  // you can do better than this, go to bed dude

  // const logs = activity.map(inputToLog);
  // const fallsAsleep = logs.filter(l => l.description.includes('falls asleep'));
  // let currentMinute = 0;
  // for (let i = 0; i < fallsAsleep.length; i++) {
  //   const sleepMinute = retrieveMinuteFromDescription(fallsAslsleepEnd);
  //   const wakesUpLog = logs.slice()
  //   const sleepEnd = retrieveMinuteFromDescription(fallsAslsleepEnd);
  //   for (let sleepStar = currentMininute; sleepStart < sleepEnd; sleepStart++) {
  //     const element = array[sleepStart];
      
  //   }  
  // }
}

module.exports = {
  inputToLog,
  sortLogs,
  groupByShift,
  shiftActivityToSleepArray,
};