let ulTasks = $('#ulTasks')
let btnAdd = $('#btnAdd')
let btnReset = $('#btnReset')
let inpNewTask = $('#inpNewTask')
let btnCleanup=$('#btnCleanup')
let btnSort=$('#btnSort')

var arr = JSON.parse(localStorage.getItem("Tasks"));//string
if(arr!=null && arr.length>0){
    // console.log("functionrunnin")
    // console.log(arr)
    // console.log(string)
    arr.map(task=>{
        
        let listItem = $('<li>', {
            'class': 'list-group-item',
            text: task
          })
          ulTasks.append(listItem)
          inpNewTask.val('')
          toggleInputButtons()
          listItem.click(()=>{
            listItem.toggleClass('done');//will toggle between done and not done
        })

    })
}


function addItem(){

   var arr=[]
  
    var list=JSON.parse(localStorage.getItem("Tasks"));
  
    let listItem = $('<li>', {
        'class': 'list-group-item',
        text: inpNewTask.val()
      })

    arr = list!=null ? [...list,inpNewTask.val()] : [inpNewTask.val()]

     localStorage.setItem("Tasks",JSON.stringify(arr))
    
      listItem.click(()=>{
          listItem.toggleClass('done');//will toggle between done and not done
      })
    
     ulTasks.append(listItem)
      inpNewTask.val('')
      toggleInputButtons()
}
function clearDone(){
    // localStorage.removeItem("Tasks")
    $('#ulTasks .done').remove();
    var el = document.getElementsByTagName("li")
    if(el){
        var arr =[];
        for (item of el) {
            arr.push(item.innerText)
          }
        localStorage.setItem("Tasks",JSON.stringify(arr))
    }
    else{
        localStorage.removeItem("Tasks")
    }
    
    toggleInputButtons()
}
//take done and append them at bottom
function sortTasks(){
    $('#ulTasks .done').appendTo(ulTasks);
}
function toggleInputButtons(){
    btnReset.prop('disabled',inpNewTask.val()=='')
    btnAdd.prop('disabled',inpNewTask.val().trim()=='')
    btnSort.prop('disabled',ulTasks.children().length<2)
    btnCleanup.prop('disabled',ulTasks.children().length<1)

}
//if enter is pressed on input
inpNewTask.keypress( (e)=> { 
    if(e.which==13)addItem();//13 is for Enter button
});
//if input is not empty ,then only reset button is enabled
inpNewTask.on('input',toggleInputButtons)
//if clicked on add button
btnAdd.click(addItem);

btnReset.click(() =>{ 
    inpNewTask.val('')
    toggleInputButtons();

})

btnCleanup.click(clearDone);

btnSort.click(sortTasks);