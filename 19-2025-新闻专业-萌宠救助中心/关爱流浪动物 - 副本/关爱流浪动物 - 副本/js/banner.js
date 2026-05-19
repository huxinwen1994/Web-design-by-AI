(function(){
    var slider = document.querySelector('.banner-slider');
    if(!slider){return;}
    var items = slider.querySelectorAll('.banner-item');
    var dots = slider.querySelectorAll('.banner-dots .dot');
    var prev = slider.querySelector('.banner-prev');
    var next = slider.querySelector('.banner-next');
    var index = 0;
    var timer = null;

    function show(i){
        for(var k=0;k<items.length;k++){
            items[k].className = items[k].className.replace(' active','');
        }
        for(var j=0;j<dots.length;j++){
            dots[j].className = dots[j].className.replace(' active','');
        }
        items[i].className += ' active';
        dots[i].className += ' active';
        index = i;
    }

    function nextSlide(){
        var i = index + 1;
        if(i >= items.length){i = 0;}
        show(i);
    }

    function prevSlide(){
        var i = index - 1;
        if(i < 0){i = items.length - 1;}
        show(i);
    }

    if(next){
        next.onclick = function(){
            nextSlide();
        };
    }
    if(prev){
        prev.onclick = function(){
            prevSlide();
        };
    }

    for(var d=0; d<dots.length; d++){
        dots[d].onclick = (function(n){
            return function(){
                show(n);
            };
        })(d);
    }

    function start(){
        timer = setInterval(nextSlide,4000);
    }
    function stop(){
        if(timer){clearInterval(timer);}
    }

    slider.onmouseenter = stop;
    slider.onmouseleave = start;

    if(items.length>0){
        show(0);
        start();
    }
})();
