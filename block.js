
function watchElement(element) {
  let observer
  const callback = (mutationsList) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for(let node of mutation.addedNodes) {
            if (node && node.classList && node.classList.contains('woo-box-flex')) {
              const audio = node.querySelector('audio')
              if (audio && /female_version/.test(audio.src)) {
                node.removeChild(audio)
                if (observer) {
                  observer.disconnect()
                }
              }
            }
          }
        }
    }
  }
  const config = { childList: true, subtree: true }
  observer = new MutationObserver(callback)
  observer.observe(element, config)
  return observer
}

document.addEventListener('play', function(e){
  try {
    const target = e.target
    if (target.tagName === 'VIDEO') {
      const closestRoot = e.target.parentElement.parentElement.parentElement
      watchElement(closestRoot)
    }
  } catch(e) {}
}, true)