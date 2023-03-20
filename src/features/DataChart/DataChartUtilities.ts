/******************************************************************

           Name: getCssValue
    Description: Get the css variable value from #App
    Return Type: string
          Props: param: string

******************************************************************/

export function getCssValue(param: string): string {
  const appEl = document.getElementById("App");
  return getComputedStyle(
    appEl || document.createElement("div") //if #App has not been created return an empty DIV
  ).getPropertyValue(param);
}
