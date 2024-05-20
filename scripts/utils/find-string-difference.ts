export const findStringDifference = (str1: string, str2: string) => {
  let diff = '';
  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] !== str2[i]) {
          diff += str2[i];
      }
  }
  return diff;
}