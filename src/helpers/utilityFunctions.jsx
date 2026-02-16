/**
 * Format Match Date and output a string.
 * 
 * @param {Date} dateString MongoDB Date
 * @returns {String} DayOfWeek Day Month Year
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const dateText = date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return dateText; 
}

/**
 * Format Match Start Time into 12 hour time.
 * 
 * @param {Date} dateString MongoDB Date
 * @returns {String} Time in 12hr
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return time;
}

/**
 * Calculate and format match duration time into minutes and seconds.
 * 
 * @param {Date} started MongoDB Date
 * @param {Date} finished MongoDB Date
 * @returns {String}
 */
export const formatDuration = (started, finished) => {
  const start = new Date(started);
  const end = new Date(finished);

  const {mins, secs} = minsFromMS(end - start);

  return `${mins} mins, ${secs} seconds.`
}

/**
 * Turn milliseconds into Minutes and Seconds.
 * 
 * @param {Number} time - ms
 * @returns {Object} { Minutes, Seconds }
 */
export const minsFromMS = (time) => {
  const mins = Math.floor((time / (1000 * 60)) % 60);
  const secs = Math.floor((time / 1000) % 60);

  return {mins, secs};
}