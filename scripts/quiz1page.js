document.querySelectorAll(".copy").forEach(function(btn){
  btn.addEventListener("click",function(){
    var text=document.getElementById(btn.dataset.target).textContent;
    var done=function(){btn.textContent="Copied";setTimeout(function(){btn.textContent="Copy"},1500)};
    if(navigator.clipboard){navigator.clipboard.writeText(text).then(done).catch(function(){})}
  });
});
