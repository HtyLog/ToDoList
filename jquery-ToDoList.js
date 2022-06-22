$(function () {
  // 测试注意：数组的push不能新建一个数组，之前有数据才能push进去；json只是包装，并不能改变数组
  // var a = [{ title: '一开始就存入本地存储', done: false }];
  // localStorage.setItem('local', JSON.stringify(a))
  // 代码区域
  load(getdata())
  $(".add").on("keydown", function (event) {
    if (event.keyCode == 13) {
      if ($(".add").val() == "") {
        alert("未输入内容")
      } else {
        if (localStorage.getItem("local") == null) {
          var newdata = []
          console.log("local里面没有值")
          // 第二遍看发现这里没用,就注释掉了
          // localStorage.setItem('local', JSON.stringify(newdata))
          update(newdata)
        } else {
          // 存储更新数据:更新前先删除旧数据
          var newdata = getdata()
          update(newdata)
        }
        // 回车后清楚文本框内的值
        $(".add").val("")
      }
      // 渲染：清空之前渲染的li,提取更新后的数据，遍历渲染添加todolist
      load()
    }
  })

  // 点击复选框，获取对应索引号，修改done状态开始分别渲染
  $(".ToDoList , .DidList").on("click", "input", function () {
    var index = $(this).attr("index")
    var newdata = getdata()
    if (newdata[index].done == "false") {
      newdata[index].done = "true"
      localStorage.setItem("local", JSON.stringify(newdata))
    } else {
      newdata[index].done = "false"
      localStorage.setItem("local", JSON.stringify(newdata))
    }
    load()
  })

  // 点击小a删除代办
  $(document).on("click", "a", function () {
    var i = $(this).siblings().children("input").attr("index")
    var newdata = getdata()
    newdata.splice(i, 1)
    update(newdata, "other")
    load()
  })

  //点击重新编辑
  $(document).on("click", "span", function () {
    // console.log();
    var i = $(this).siblings().children("input").attr("index")
    var newdata = getdata()
    var val = newdata[i].title
    var change = prompt("" + val + "")
    if (change == "") {
      do {
        alert("修改后内容不能为空")
        change = prompt("" + val + "")
      } while (change == "")
    }
    if (!change) {
      change = val
    }
    newdata[i].title = change
    update(newdata, "other")
    load()
  })

  // 统计代办数量

  // 函数区域
  // 一.获取local存储值
  function getdata() {
    var a = localStorage.getItem("local")
    console.log("获取数值完成")
    return JSON.parse(a)
  }

  // 二.重新更新(更新前先删除旧数据)local的数据库，准备渲染
  function update(newdata, style = "update") {
    if (style == "update") {
      console.log(style)
      if ($(".add").val() == "") {
        localStorage.setItem("local", JSON.stringify(newdata))
        console.log("判定之后重新更新完成")
      } else {
        newdata.push({ title: $(".add").val(), done: "false" })
        localStorage.setItem("local", JSON.stringify(newdata))
        console.log("输入之后重新更新完成")
      }
    } else {
      localStorage.setItem("local", JSON.stringify(newdata))
      console.log("判定之后重新更新完成")
    }
  }

  // 三.遍历渲染todolist
  function load() {
    var docont = 0
    var didcont = 0
    $(".ToDoList , .DidList").empty()
    var data = getdata()
    $.each(data, function (i, n) {
      if (data[i].done == "false") {
        $(".ToDoList").prepend('<li><div><input type="checkbox" index=' + i + "><h4>" + data[i].title + '</h4></div><a href="" ></a><span></span> </li>')
        docont++
      } else {
        $(".DidList").prepend('<li><div><input type="checkbox" checked index=' + i + "><h4>" + data[i].title + '</h4></div><a href=""></a><span></span></li>')
        didcont++
      }
    })
    // $('#do').text($('.ToDoList>li').length)
    // $('#did').text($('.DidList>li').length)
    $("#do").text(docont)
    $("#did").text(didcont)
    console.log("渲染完成")
  }
})
