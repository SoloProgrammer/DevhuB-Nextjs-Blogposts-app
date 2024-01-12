export const getTrimmedString = (stringText, charCount) => {
  let trimmedStr = stringText;
  if (trimmedStr.length > charCount) {
    trimmedStr = `${trimmedStr.substring(0, charCount)}...`;
  }
  return trimmedStr;
};
