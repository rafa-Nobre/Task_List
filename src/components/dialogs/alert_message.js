export const alertMessage = msg => {
  var floatingDiv = document.createElement('div')
  floatingDiv.textContent = msg
  floatingDiv.style.cssText = `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  `
  setTimeout(function () {
    floatingDiv.parentNode.removeChild(floatingDiv)
  }, 2000)
  document.body.appendChild(floatingDiv)
}
