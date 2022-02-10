window.addEventListener('load', function() {
    // 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.clientWidth;
    var num = 0;
    var circle = 0;
    //鼠标经过显示隐藏小箭头
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        //清除定时器变量
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            //开启定时器
            timer = setInterval(function() {
                //手动调用点击事件 好东西
                arrow_r.click();
            }, 2000)
        })
        //动态生成小圆圈，有几张图片，生成几张小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    //console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创建小li，然后把li插入ol里面
        var li = this.document.createElement('li');
        //小li插入ol里面
        //记录当前小圆圈索引号，利用自定义属性来做
        li.setAttribute('index', i);
        ol.appendChild(li);
        //小li排他思想，生成小圆圈同时绑定事件
        li.addEventListener('click', function() {
                //干掉所有人，留下我自己
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                this.className = 'current';
                //点击小圆圈移动图片
                //ul移动距离就是小圆圈索引号乘以图片宽度，注意是负值
                //当点击某个小li拿到当前li索引号
                var index = this.getAttribute('index');
                //当我们点击li，就要把索引号给num
                num = index;
                //当我们点击li，就要把索引号给circle
                circle = index;
                console.log(num);
                animate(ul, -index * focusWidth);
            })
            //也可以利用事件委托
            /*  ol.addEventListener('click', function(e) {
                 for (var i = 0; i < ol.children.length; i++) {
                     ol.children[i].className = '';
                 }
                 if (e.target.className != 'circle') {
                     e.target.className = 'current';
                 };

             }) */

    }
    console.log(num);
    //ol设置类名为current
    ol.children[0].className = 'current';
    //克隆第一张图片放在ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var flag = true;
    //flag节流阀
    //右侧按钮点击事件
    arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false;
                //如果走到了最后复制一张图片，我们ul要快速复原，left改为0
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true; // 打开节流阀
                });
                circle++;
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circleChange();
            }
        })
        //左侧按钮点击事件
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //如果走到了最后复制一张图片，我们ul要快速复原，left改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })

    function circleChange() {
        //如果circle小于0，小圆圈改为最后一个
        //点击右侧按钮，小圆圈跟随一起变化
        //先清除其余小圆圈current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前小圆圈current类名
        ol.children[circle].className = 'current';
    }
    //自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件 好东西
        arrow_r.click();
    }, 2000)
})