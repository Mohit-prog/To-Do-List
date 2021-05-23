let ulTasks = $('#ulTasks')
let btnAdd = $('#btnAdd')
let btnReset = $('#btnReset')
let inpNewTask = $('#inpNewTask')
let btnCleanup=$('#btnCleanup')
let btnSort=$('#btnSort')

var string=localStorage.getItem("Tasks");//string
if(string!=null && string.length>0){
    console.log("functionrunnin")
    arr=[string]//array
    arr.map(task=>{
        
        let listItem = $('<li>', {
            'class': 'list-group-item',
            text: task
          })
          ulTasks.append(listItem)
          inpNewTask.val('')
          toggleInputButtons()

    })
}


function addItem(){

   var arr=[]
  
    var list=localStorage.getItem("Tasks");

     if(list!=null){
       arr=[list]
       console.log(arr)
       console.log(list)
     }
  
    let listItem = $('<li>', {
        'class': 'list-group-item',
        text: inpNewTask.val()
      })

     localStorage.setItem("Tasks",[...arr,inpNewTask.val()])
    
      listItem.click(()=>{
          listItem.toggleClass('done');//will toggle between done and not done
      })
    
     ulTasks.append(listItem)
      inpNewTask.val('')
      toggleInputButtons()
}
function clearDone(){
    
    $('#ulTasks .done').remove();
    toggleInputButtons()
}
//take done and append them at bottom
function sortTasks(){
    $('#ulTasks .done').appendTo(ulTasks);
}
function toggleInputButtons(){
    btnReset.prop('disabled',inpNewTask.val()=='')
    btnAdd.prop('disabled',inpNewTask.val()=='')
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