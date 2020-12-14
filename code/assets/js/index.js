$(function(){
    const arr = JSON.parse(window.localStorage.getItem('arr'))||[]
    const arr2 = JSON.parse(window.localStorage.getItem('arr2'))||[]
    xr()
    function xr(){
        let str = `<h2>正在进行 <span id="todocount">${arr.length}</span></h2><ol id="todolist" class="demo-box">`
        document.querySelector('.sec').innerHTML=""
        //渲染数据
        for(let i =0;i<arr.length;i++){
            str+=`
                <li class="select">
                    <input type="checkbox" index="${i}" class="two"/>
                    <p contenteditable="true" index="${i}">${arr[i]}</p>
                    <a index="${i}">-</a>
                </li>
            
            `
        }
        str+=`</ol><h2>已经完成 <span id="donecount">${arr2.length}</span></h2><ul id="donelist">`
        for(let j = 0;j<arr2.length;j++){
            str+=`
                <li class="load">
                    <input type="checkbox" class="three" checked="checked" index="${j}" />
                    <p contenteditable="true" index="${j}">${arr2[j]}</p>
                    <a>-</a>
                </li>            
        `
        }
        str+='</ul>'
        $('.sec').html(str)
        //点击删除
        $('#todolist').on('click','li>a',function(){
            const index = this.getAttribute('index')
            arr.splice(index,1)
            window.localStorage.setItem('arr',JSON.stringify(arr))
            xr()
        })
        $('#donelist').on('click','li>a',function(){
            const index = this.getAttribute('index')
            arr2.splice(index,1)
            window.localStorage.setItem('arr2',JSON.stringify(arr2))
            xr()
        })
        //选中添加到ul内
        $('#todolist').on('click','.two',function(){
            const id = this.getAttribute('index')
            // console.log(id)
            bol = this.checked
            if(bol){
                arr2.push(arr[id])
                arr.splice(id,1)
            }
            window.localStorage.setItem('arr2',JSON.stringify(arr2))
            window.localStorage.setItem('arr',JSON.stringify(arr))
            xr()
        })
        //取消选中返回到ol中
        $('#donelist').on('click','.three',function(){
            const id = this.getAttribute('index')
            // console.log(id)
            bol = this.checked
            if(!bol){
                arr.push(arr2[id])
                arr2.splice(id,1)
            }
            window.localStorage.setItem('arr2',JSON.stringify(arr2))
            window.localStorage.setItem('arr',JSON.stringify(arr))
            xr()
        })

        //编辑事件
        $('.select').on('blur','p',function(){
            // console.log(this)
            const index = $(this).attr('index')
            arr[index] = $(this).html()
            window.localStorage.setItem('arr',JSON.stringify(arr))
            xr()
        })
        $('.load').on('blur','p',function(){
            console.log(this)
            const index = $(this).attr('index')
            arr2[index] = $(this).html()
            window.localStorage.setItem('arr2',JSON.stringify(arr2))
            xr()
        })
    }

    

    //按下回车添加数据
    $('.one').on('keydown',function(e){
        e = e || window.event
        
        const code = e.keyCode || e.which
        // console.log(code)
        switch(code){
            case 13: add()
        } 
        function add(){
            e.preventDefault()
            const val = $('#title').val().trim()
            if(!val) return
            arr.push(val)
            $('#title').val('')
            window.localStorage.setItem('arr',JSON.stringify(arr))
            xr()
        }
    })
    
    
    //发送跨域请求
    ajax({
        url:'/ass',
        success(res){
            res = JSON.parse(res)
            // console.log(res.area)
            $('#ipv4').html(res.ip)
            $('#addr').html(res.area)
        }
    })
})


