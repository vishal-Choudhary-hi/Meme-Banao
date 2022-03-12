var parentcanvas=document.getElementById('canvas')
let count =0;
let canvas=null;
let ctx=null;
let divs=[];

var addimage=function(event)
{

  base_image = new Image();
  base_image.src = URL.createObjectURL(event.target.files[0]);
  base_image.onload = function(){
    canvas = document.createElement("canvas");
    document.getElementById('canvasdiv').appendChild(canvas);
    ctx = canvas.getContext('2d');
    canvas.id="imagecanvas";
    canvas.height=400;
    canvas.width=600;
    var scale = Math.min(canvas.width / base_image.width, canvas.height / base_image.height);
    var x = (canvas.width / 2) - (base_image.width / 2) * scale;
    var y = (canvas.height / 2) - (base_image.height / 2) * scale;
    console.log(scale)
    ctx.drawImage(base_image, x, y, base_image.width * scale, base_image.height * scale);
  }
  imageupload.remove();
  imageuploadlabel.remove();
}


function addtextfield(){
  count++;

  var newnode=document.getElementById('0');
  var clone=newnode.cloneNode(true);
  var newtextfield =document.getElementById("forms").appendChild(clone);

  newtextfield.id=count;


  var newnodelabel=document.getElementById('text00');
  var clonelabel=newnodelabel.cloneNode(true);
  var newtextfieldlabel=document.getElementById("forms").appendChild(clonelabel);

  newtextfieldlabel.id='text'+count+""+count;

  newtextfield.children[0].innerHTML="Text "+(count+1);
  newtextfield.children[0].setAttribute('for','text'+count)
  
  newtextfieldlabel.value="";
  var textfieldoncanvas=document.getElementById("canvastext00");
  var newtextfieldoncanvas=textfieldoncanvas.cloneNode(true);
  newtextfieldoncanvas.id="canvastext"+count+""+count;
  newtextfieldoncanvas.style.top="";
  newtextfieldoncanvas.style.left="";
  document.getElementById("canvasdiv").appendChild(newtextfieldoncanvas);
  newtextfieldoncanvas.children[0].innerHTML="hello";
}


function deletetextfield(bid){
  pid=bid.parentNode.id;
  if(pid==='0'){
    alert('can not delete this text field');
    return;
  }
  document.getElementById(pid).remove();
  document.getElementById('text'+pid+''+pid).remove();
  document.getElementById('canvastext'+pid+''+pid).remove();
}


function addline(ele){
  let text=[];
  let values=[];
  parent=document.getElementById("canvas"+ele.id);
  let child=parent.childNodes;
  let id=ele.id[ele.id.length-1];
  text= document.getElementById(id).childNodes;
  for(let i=1;i<text.length;i++){
    values[i-1]=text[i].value;
  }
  child[1].innerHTML=ele.value;  
  child[1].style.fontSize=values[2]+"px";
  child[1].style.webkitTextStrokeColor=values[6];
  child[1].style.webkitTextFillColor=values[4];
  if(values[8]>=10){
    alert("This will look bad 🤦‍♂️")
  }
  child[1].style.webkitTextStrokeWidth=values[8]+"px";
}


let
  minWidth = 30,
  minHeight = 30,
  maxWidth = 900,
  maxHeight = 900,
  isResizing = false;
  
function draging(el,e) {
  console.log("hi")
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    if (!isResizing) {
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      const rect = el.getBoundingClientRect();

      el.style.left = rect.left - newX + "px";
      el.style.top = rect.top - newY + "px";
      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}


function resizing(elchild,e) {
  console.log("hello");
  let prevX = e.clientX,
      prevY = e.clientY,
      currentResizer = e.target,
      el=elchild.parentNode;
      rect = el.getBoundingClientRect(),
      prevLeft = rect.left,
      prevTop  = rect.top,
      newWidth=0,
      newHeight=0;
  
  isResizing = true;
  
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);

  function mousemove(e) {
    let newX = prevX - e.clientX, //negative to the right, positive to the left
        newY = prevY - e.clientY; //negative to the bottom, positive to the top
    if (currentResizer.classList.contains('bottom-right')) {
        newWidth = rect.width - newX;
        newHeight = rect.height - newY;
        if (newWidth > minWidth && newWidth < maxWidth) {
            el.style.width = newWidth + 'px';
        }
        if (newHeight > minHeight && newHeight < maxHeight) {
            el.style.height = newHeight + 'px';
        }
        
    }
    else if (currentResizer.classList.contains('bottom-left')) {
        newWidth = rect.width + newX;
        newHeight = rect.height - newY;

        if (newWidth > minWidth && newWidth < maxWidth) {
            el.style.left = prevLeft - newX + 'px';
            el.style.width = newWidth + 'px';
        } 
        if (newHeight > minHeight && newHeight < maxHeight) {
            el.style.height = newHeight + 'px';
        }
    }
    else if (currentResizer.classList.contains('top-right')) {
        newWidth = rect.width - newX;
        newHeight = rect.height + newY;
        
        if (newWidth > minWidth && newWidth < maxWidth) {
            el.style.width = newWidth + 'px';
        }
        if (newHeight > minHeight && newHeight < maxHeight) {
            el.style.top = prevTop - newY + 'px';
            el.style.height = newHeight + 'px';
        }
        
    }
    else if (currentResizer.classList.contains('top-left')) {
        newWidth = rect.width + newX;
        newHeight = rect.height + newY;
        
        if (newWidth > minWidth && newWidth < maxWidth) {
            el.style.left = prevLeft - newX + 'px';
            el.style.width = newWidth + 'px';
        }
        if (newHeight > minHeight && newHeight < maxHeight) {
            el.style.top = prevTop - newY + 'px';
            el.style.height = newHeight + 'px';
        }
    }
  }

  function mouseup() {
    isResizing = false;
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  }
}




function makememe(){
  html2canvas(document.querySelector("#canvasdiv")).then(function(canvas){
    // document.body.appendChild(canvas)
    if(!document.getElementById('imagecanvas')){
      alert('No meme present pls upload your photo');
      return;
    }
    let iurl=canvas.toDataURL("image/jpeg",1)
    download(iurl);
  });
}
function download(iurl){
  axios({
      url:iurl,
      method:'GET',
      responseType: 'blob'
})
.then((response) => {
     const url = window.URL
     .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'memebanao.jpg');
            document.body.appendChild(link);
            link.click();
})
}
