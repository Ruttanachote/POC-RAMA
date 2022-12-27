
const getCss = function (o, key) {
  return o.currentStyle
    ? o.currentStyle[key]
    : document.defaultView?.getComputedStyle(o, null)[key];
};

const params = {
  left: 0,
  top: 0,
  currentX: 0,
  currentY: 0,
  flag: false,
};

const startDrag = function (bar, target, callback?) {
  const screenWidth = document.body.clientWidth; 
  const screenHeight = document.documentElement.clientHeight; 

  const dragDomW = target.offsetWidth; 
  const dragDomH = target.offsetHeight; 

  const minDomLeft = target.offsetLeft;
  const minDomTop = target.offsetTop;

  const maxDragDomLeft = screenWidth - minDomLeft - dragDomW;
  const maxDragDomTop = screenHeight - minDomTop - dragDomH;

  if (getCss(target, 'left') !== 'auto') {
    params.left = getCss(target, 'left');
  }
  if (getCss(target, 'top') !== 'auto') {
    params.top = getCss(target, 'top');
  }

  bar.onmousedown = function (event) {
    params.flag = true;
    if (!event) {
      event = window.event;
      bar.onselectstart = function () {
        return false;
      };
    }
    const e = event;
    params.currentX = e.clientX;
    params.currentY = e.clientY;
  };
  document.onmouseup = function () {
    params.flag = false;
    if (getCss(target, 'left') !== 'auto') {
      params.left = getCss(target, 'left');
    }
    if (getCss(target, 'top') !== 'auto') {
      params.top = getCss(target, 'top');
    }
  };
  document.onmousemove = function (event) {
    const e: any = event ? event : window.event;
    if (params.flag) {
      const nowX = e.clientX,
        nowY = e.clientY;
      const disX = nowX - params.currentX,
        disY = nowY - params.currentY;

      let left = parseInt(params.left) + disX;
      let top = parseInt(params.top) + disY;

      if (-left > minDomLeft) {
        left = -minDomLeft;
      } else if (left > maxDragDomLeft) {
        left = maxDragDomLeft;
      }

      if (-top > minDomTop) {
        top = -minDomTop;
      } else if (top > maxDragDomTop) {
        top = maxDragDomTop;
      }

      target.style.left = left + 'px';
      target.style.top = top + 'px';

      if (typeof callback == 'function') {
        callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
      }

      if (event.preventDefault) {
        event.preventDefault();
      }
      return false;
    }
  };
};

export default startDrag;
