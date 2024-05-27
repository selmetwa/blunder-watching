export const createHangingIcon = () => {
  const iconClass = 'fa-solid fa-crosshairs'
  const iconElement = document.createElement('div');
  const icon = document.createElement('i');
  icon.style.color = 'black';
  icon.style.zIndex = '1000';
  icon.style.fontSize = '12px';
  icon.style.padding = '4px';
  iconElement.style.position = 'absolute';
  iconElement.style.top = '0';
  iconElement.style.right = '0';
  icon.className = iconClass;
  iconElement.classList.add('target')
  iconElement.appendChild(icon);

  return iconElement
}