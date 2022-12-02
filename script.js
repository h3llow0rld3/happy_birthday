let head = document.getElementById('happy-birthday');
let centeredList = [head];

function centerAlign() {
  let winWidth = document.documentElement.clientWidth;
  
  for (let elem of centeredList) {
    elem.style.left = Math.round(winWidth / 2 - elem.offsetWidth / 2) + 'px';
  }
}

centerAlign()
window.addEventListener('resize', centerAlign);

document.body.ondragstart = () => false;
document.body.onmousedown = function(event) {
  let elem = event.target;
  
  if (!elem.classList.contains('draggable')) return;
  elem.style.transition = '';

  mouseDown = true;        
  document.body.style.cursor = 'grabbing';

  let shiftX = event.clientX - elem.getBoundingClientRect().left;
  let shiftY = event.clientY - elem.getBoundingClientRect().top;

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    elem.style.left = pageX - shiftX - window.pageXOffset + 'px';
    elem.style.top = pageY - shiftY - window.pageYOffset + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  function onMouseUp() {
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', onMouseMove);

    mouseDown = false;
    elem.onmouseup = null;

    elem.style.transition = 'all .4s';
    elem.style.top = '';
    
    let elemWidth = document.documentElement.clientWidth;
    elem.style.left = Math.round(elemWidth / 2 - elem.offsetWidth / 2) + 'px';
  
    document.removeEventListener("mousemove", moveAt);
    document.removeEventListener("mouseup", onMouseUp);
  }
};

document.addEventListener('touchstart', function(event) {
  let elem = event.target;

  if (!elem.classList.contains('draggable')) return;
  elem.style.transition = '';

  mouseDown = true;        
  document.body.style.cursor = 'grabbing';

  let shiftX = event.touches[0].clientX - elem.getBoundingClientRect().left;
  let shiftY = event.touches[0].clientY - elem.getBoundingClientRect().top;

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    elem.style.left = pageX - shiftX - window.pageXOffset + 'px';
    elem.style.top = pageY - shiftY - window.pageYOffset + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.touches[0].pageX, event.touches[0].pageY);
  }

  document.addEventListener('touchmove', onMouseMove);
  document.addEventListener("touchend", onMouseUp);

  function onMouseUp() {
    document.body.style.cursor = 'default';
    document.removeEventListener('touchmove', onMouseMove);

    mouseDown = false;
    elem.onmouseup = null;

    elem.style.transition = 'all .4s';
    elem.style.top = '';
    
    let elemWidth = document.documentElement.clientWidth;
    elem.style.left = Math.round(elemWidth / 2 - elem.offsetWidth / 2) + 'px';
  
    document.removeEventListener("pointermove", moveAt);
    document.removeEventListener("touchend", onMouseUp);
  }
});

let left_i = document.getElementsByClassName('left')[0];
let right_i = document.getElementsByClassName('right')[0];

right_i.style.right = '0.1vw';
left_i.style.left = '0.1vw';

animationID = setInterval(() => {
  curt_animation();
  setTimeout(() => {
    curt_animation();
  }, 400);
}, 5000);

function curt_animation() {
  right_i.classList.toggle('shake');
  left_i.classList.toggle('shake');
}

document.addEventListener('click', onClickOnCurtains);

function onClickOnCurtains() {
  right_i.style.right = '';
  left_i.style.left = '';
  clearInterval(animationID);

  setTimeout(() => {
    right_i.remove();
    left_i.remove();

    let container = document.getElementsByClassName('surprise')[0];
    let light = document.createElement('img');

    light.classList = 'light';
    light.src = 'images/light.png';
    container.append(light);

    let message = document.createElement('div');
    let colors = ['rgb(0, 255, 13)', 'rgb(0, 136, 255)', 'rgb(132, 0, 255)', 'rgb(255, 0, 170)', 'red', 'rgb(254, 195, 0)'];
    let index = 0;
    
    setInterval(() => {
      message.style.color = colors[index];
      ++index;

      if (index == colors.length) {
        index = 0;
      }

      message.style.fontSize = message.style.fontSize == '12vh'? '18vh': '12vh';
    }, 1000);

    message.className = 'message';
    message.textContent = '12';
    document.body.append(message);
    setTimeout(() => {
      message.style.fontSize = '18vh';
    }, 100);

    document.querySelector('.surprise').append(light);
  }, 1000);
  document.removeEventListener('click', onClickOnCurtains);
}