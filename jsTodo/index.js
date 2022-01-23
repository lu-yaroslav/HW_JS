function todoListData() {
  let todoList = [];
  $('#tasks .row').each(function() {
    let temp = {};
    temp.todo = $(this).find('.todo').text();
    temp.check = $(this).find('.check input').is(":checked");
    temp.date = $(this).find('.date').attr('date');
    temp.priority = $(this).find('.priority').text();          

    if(temp.check){
      this.classList.add("done");
    }
    else {
      this.classList.remove("done");
    };
    // let search = temp.todo.filter(word => word.length > 3);
    // console.log();

  
    todoList.push(temp);        
  });
  
  return todoList;
}

function updateTodoList(){
  let todoList = todoListData();
  
  localStorage.setItem('todo', JSON.stringify(todoList));
}

function out (todoList) {
  let out = '';
  for (let key in todoList) {
    let date = moment.unix(todoList[key].date);

    out += `<div class="row" id="row-${todoList[key].date}">`;

    out += `<div date="${todoList[key].date}" class="date"> ${date.format("DD.MM.YYYY <br> HH:mm")} </div>` +
      `<div class="priority">${todoList[key].priority}</div>` +
      `<div class="priority-change"><button class="priority-up"><i class="fas fa-angle-up"></i></button><button class="priority-down"><i class="fas fa-angle-down"></i></button></div>` +
      `<div class="todo">${todoList[key].todo}</div>` +           
      `<div class="edit"><button id="edit"><i class="fas fa-user-edit edit-icon"></i></button></div>` + 
      `<div class="check"><input type="checkbox" ${todoList[key].check ? 'checked' : ''} ></div>` + 
      `<div class="delete"><button><i class="fas fa-trash-alt delete-icon"></i></button></div>` +
      `<br>`;
      
    out += '</div>';
  };
  document.getElementById('tasks').innerHTML = out;
  todoListData();

  $('.check').change(function() {  
    updateTodoList();
  });

  $('.delete-icon').click(function() {  
    let $row = $(this).parent('button').parent('.delete').parent('.row');    
    let $modal = $('#myModalDelete');
    $modal.show();
    $modal.attr('row_to_remove', $row.attr('id'));
  });

  // Edit
  $('.edit-icon').click(function() {  
    let $row = $(this).parent('button').parent('.edit').parent('.row');//.text();
    let text = $row.children('.todo').text();
    // .children('.todo').text()
    // let s = $row.children('.todo');
    // console.log(s);
      
    console.log(text);
    let $modal = $('#myModalEdit');
    $modal.attr('edit_row_id', $row.attr('id'));
    $modal.show();
    $('#modal-edit').val(text);
    
    // $modal.attr('edit', $row.attr('id'));
  });


};

function localStorageList(){
  let todoList = [];

  if (localStorage.getItem('todo') != undefined) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    out(todoList);   
    // todoListData(); 
  }

  return todoList;
}

$( document ).ready(function() {
  let myModal = document.getElementById('myModal');
  let myModalEdit = document.getElementById('myModalEdit');
  let ok = document.getElementById("btn-ok");

  let todoList = localStorageList();

  $('#add').on('click', function() {
    let todoList = todoListData();
    let input = document.getElementById('inp');
    if (input.value.trim().length === 0) {
      myModal.style.display = "block";
      return;
    }
    let temp = {};
    temp.todo = input.value;
    temp.check = false;
    temp.date = moment().unix();
    temp.priority = 1;
    let i = todoList.length;
    todoList[i] = temp;
    console.log(todoList);    
    out(todoList); 
    input.value ="";
    updateTodoList();
  });

  $('#btnDelete-ok').on('click', function() {
    let id = $('#myModalDelete').attr('row_to_remove');
    let $row = $(`#${id}`);
    $row.remove();
    updateTodoList();
    $('#myModalDelete').hide();
  });

  $('#btnEdit-ok').on('click', function() {
   let id = $('#myModalEdit').attr('edit_row_id');
   let $row = $(`#${id}`);
   let newValue = $('#modal-edit').val();
   $row.children('.todo').text(newValue);

  //  text($('.todo').val())
    // .text($('.todo').text())
    // let $row = $()
    // let $row = $(`#${id}`);
    
    // // $row.remove();
    // console.log(id);
    // updateTodoList();
    $('#myModalEdit').hide();
    updateTodoList();
  });


     // Sort by alphabet
     $('#sort-alpha').on('click', function() {
      let todoList = todoListData();
        todoList.sort(function(a, b) {
          return a.todo.localeCompare(b.todo);
        });
        if ($(this).hasClass('up')) {
          out(todoList);
    
          $(this).attr('class', 'down');
        } else {
          out(todoList.reverse());
         
          $(this).attr('class', 'up');
        }
     })

    // todoList = todoList.sort(function(a, b) {
    //   return a.todo.localeCompare(b.todo);
    // });

  // сортировка по дате
  $('#sort-date').on('click', function() {
    let todoList = todoListData();

    todoList = todoList.sort(function(a, b) {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      return 0;
    });

    if ($(this).hasClass('up')) {
      out(todoList);

      $(this).attr('class', 'down');
    } else {
      out(todoList.reverse());
     
      $(this).attr('class', 'up');
    }
  });
 
  // сортировка по приоритету
  $('#sort-priority').on('click', function() {
    let todoList = todoListData();

    todoList = todoList.sort(function(a, b) {
      if (a.priority > b.priority) {
        return 1;
      }
      if (a.priority < b.priority) {
        return -1;
      }
      return 0;
    });

    if ($(this).hasClass('up')) {
      out(todoList);

      $(this).attr('class', 'down');
    } else {
      out(todoList.reverse());
     
      $(this).attr('class', 'up');
    }
  });
  $('.priority-up').on('click', function() {
    // let todoList = todoListData();    
    // let x = this.parentNode.parentNode.childNodes[1];
    // let t = x.outerText;
    // let y = parseInt(t) + 1;
    // x.textContent = y
    
    // console.log(x);

    let $priority = $(this).parent().parent().find('.priority');
    let counter = parseInt($priority.text());
    $priority.html(counter + 1);
    updateTodoList();

  });

  $('.priority-down').on('click', function() {
    // let todoList = todoListData();    
    // let x = this.parentNode.parentNode.childNodes[1];
    let $priority = $(this).parent().parent().find('.priority');
    let counter = parseInt($priority.text());
    $priority.html(counter - 1);
    updateTodoList();
    // let t = x.outerText;
    // let y = parseInt(t) - 1;
    // x.textContent = y
    
    // console.log(x);

  });
  $('#btnSearch').on('click', function() {
   let search = $('#search').val();
   
  //  let todoList = todoListData();

  $('.row').each(function() {
    if (search) {
      let text = $(this).find('.todo').text();
      text.includes(search) ? $(this).show() : $(this).hide();
    } else {
      $(this).show();
    }
  });
  //  let filteredList = [];
  //  if (search) {
  //   filteredList = todoList.filter(item => item.todo.includes(search));
  //  } else {
  //   filteredList = localStorageList();
  //  }

  //  console.log(filteredList);
  //  out(filteredList);
  });
  ok.onclick = function () {
    myModal.style.display = "none";
  };

  document.getElementById("btnDelete-cancel").onclick = function () {
    document.getElementById('myModalDelete').style.display = "none";
  };
  document.getElementById("btnEdit-cancel").onclick = function () {
    document.getElementById('myModalEdit').style.display = "none";
  };
});
