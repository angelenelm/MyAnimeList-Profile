/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    });
  };
};

/**
 * Return en-US date in plain English from ISO 8601 date
 * @param {string} isoDate
 * @returns {string}
 */

export const convertIsoDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { year: "numeric", month: "long", day: "numeric" };

  return date.toLocaleString("en-US", options);
};
