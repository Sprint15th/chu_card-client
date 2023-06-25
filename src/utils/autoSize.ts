const autoSize = (element: HTMLElement) => {
  element.style.width = '0';
  const { borderLeftWidth, borderRightWidth } = getComputedStyle(element);
  const numberPxToNumber = (numberPx: string) => parseInt(numberPx.slice(0, -2));
  const borderWidth = numberPxToNumber(borderLeftWidth) + numberPxToNumber(borderRightWidth);

  element.style.width = `${element.scrollWidth + borderWidth}px`;
};

export default autoSize;
