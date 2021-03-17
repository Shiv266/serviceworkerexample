// To register sw

if(navigator.serviceWorker){
  window.addEventListener('load',()=>{
    navigator.serviceWorker
    .register('../sw_pages.js')
    .then(reg=>console.log('Service worker registered'))
    .catch(err=>console.log(`Service worker Erroro :${err}`))
  });
}