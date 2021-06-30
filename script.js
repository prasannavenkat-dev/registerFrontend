

//ONLOAD / SUBMIT FUNCTION 


(function () {
    'use strict';
    window.addEventListener('load', function () {

        refreshData()
        //DATE FILTER
        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("date")[0].setAttribute('max', today);


        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');


        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {



            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                if(form.checkValidity() === true){
                refreshData()
                     
                }
                form.classList.add('was-validated');

            }, false);
        });
    }, false);
})();

//PROFILE PIC UPLOAD

var u = document.getElementById('blah');

var j = document.getElementById('myClick');



u.addEventListener('click', function () {
    j.click()
})

//REFRESH DATA

async function refreshData(){
    let tableData = document.getElementById('tableData')
    tableData.innerHTML=`<td colspan="7" class="text-center"><div class="spinner-border  justify-content-center" role="status">
    <span class="sr-only">Loading...</span>
  </div></td>`

let res1 = await fetch('https://register-backend.herokuapp.com/getData')

let res2 = await res1.json()

tableData.innerHTML=''

let i=0
res2.map(function(e){
    let {fName, email, mobile2, date, jobType,preferredLocation} = e
        i++;
    let key=i


 
     //tr
    let tr = document.createElement('tr')
     tr.setAttribute("id",i)
     tableData.append(tr)
       //th
         
         let th = document.createElement('th')
         th.setAttribute("scope","row")
         th.innerText=i;
         tr.append(th)

        //tdFname

        let tdFname = document.createElement('td');
        tdFname.innerText=fName;
        tdFname.setAttribute('id',`fname${i}`)
        tr.append(tdFname)

         //tdEmail

         let tdEmail = document.createElement('td');
         tdEmail.innerText=email
         tdEmail.setAttribute('id',`email${i}`)

         tr.append(tdEmail)

          //tdMobile

        let tdMobile = document.createElement('td');
        tdMobile.innerText=mobile2;
        tdMobile.setAttribute('id',`mobile2${i}`);

        tr.append(tdMobile)

        //tdDate
        let tdDate = document.createElement('td');
        tdDate.setAttribute('id',`date${i}`);

        tdDate.innerText=date;
        tr.append(tdDate)
         
        //preferredLocation
        let div = document.createElement('div');
        div.setAttribute('hidden','true');
        div.innerText=preferredLocation
        div.setAttribute('id',`preferredLocation${i}`)
        tr.append(div)
          

         //tdJobtype

         let tdJobtype = document.createElement('td');
         tdJobtype.innerText=jobType;
         tdJobtype.setAttribute('id',`jobType${i}`);


         tr.append(tdJobtype)

         //tdAction 

         let tdAction = document.createElement('td');
            tdAction.setAttribute('class',"p-0")

                    //tableAction

                    let tableAction = document.createElement('table');
                    tableAction.setAttribute('class','table-borderless')
                    tdAction.append(tableAction)

                        //tableActionBody

                        let tableActionBody = document.createElement('tbody');
                        tableActionBody.setAttribute('class',"actionTable");
                        tableAction.append(tableActionBody);


                          //tableActionRow
                          let tableActionRow = document.createElement('tr');
                          tableActionBody.append(tableActionRow)

                             //tableActionPic

                             let tableActionPic = document.createElement('td');
                                       //tableAnchorPic
 
                                     let tableAnchorPic= document.createElement('a')
                                     tableAnchorPic.setAttribute("href","#");
                                     tableAnchorPic.addEventListener('click',function(){
                                     alert('pic')
                                       })
                                       tableAnchorPic.innerText='Pic'
                                       tableActionPic.append(tableAnchorPic)
                             tableActionRow.append(tableActionPic);

                               //tableActionEdit

                               let tableActionEdit = document.createElement('td');
                                  //tableAnchorEdit
 
                                     let tableAnchorEdit= document.createElement('a')
                                     tableAnchorEdit.setAttribute("href","#");
                                     tableAnchorEdit.addEventListener('click',function(){
                                        editData(key)
                                       })
                                       tableAnchorEdit.innerText='Edit'
                                       tableActionEdit.append(tableAnchorEdit)
                               tableActionRow.append(tableActionEdit);

                                 //tableActionDelete

                             let tableActionDelete = document.createElement('td');

                                        //tableAnchorDelete

                                        let tableAnchorDelete= document.createElement('a')
                                        tableAnchorDelete.setAttribute("href","#");
                                        tableAnchorDelete.addEventListener('click',function(){
                                            deleteData(key)
                                        })
                                        tableAnchorDelete.innerText='Delete'
                                        tableActionDelete.append(tableAnchorDelete)


                          
                             tableActionRow.append(tableActionDelete);
   
         tr.append(tdAction)

    

})




//DELETE FUNCTION

async function deleteData(key){

   

  let email = document.getElementById(`email${key}`).innerText
  let date = document.getElementById(`date${key}`).innerText
  let data={email,date}
   let res1 = await fetch('https://register-backend.herokuapp.com/delete',{
       method:"POST",

       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)

   })

    console.log(res1);
   if(res1.status===200){
       console.log('file deleted');
   }

   else if(res1.status===400){
      alert('cannot delete data')
   }
   refreshData()


}

}



//EDIT DATA

function editData(key){
     //GETTING OLD VALUE IF EXIST
          
    let fnameOld = document.getElementById('inputName3')
    fnameOld.value='';

    let mobile2Old=document.getElementById('inputMobile3');
    mobile2Old.value='';
   
   


    let preferredLocationOld = document.getElementById('preferredLocationSelect');
    preferredLocationOld.value="";

    let imgOld = document.getElementById('blah');
    imgOld.src="./upload-pic.jpg";

    let emailOld = document.getElementById('inputEmail3');
    emailOld.value='';

    let dateOld = document.getElementById('inputDob3');
    dateOld.value=''

    //GETTING NEW VALUE
   
    let fnameNew = document.getElementById(`fname${key}`).innerText;
    let mobile2New = document.getElementById(`mobile2${key}`).innerText;
    let preferredLocationNew = document.getElementById(`preferredLocation${key}`).innerText;
    let emailNew = document.getElementById(`email${key}`).innerText;
    let dateNew = document.getElementById(`date${key}`).innerText;
    let jobTypeNew = document.getElementById(`jobType${key}`).innerText;
    //REPLACING NEW VALUE
     
    fnameOld.value=fnameNew;
    mobile2Old.value=mobile2New;
    preferredLocationOld.value=preferredLocationNew;
    emailOld.value=emailNew;
    dateOld.value=dateNew;
    if(jobTypeNew==='FT'){
     document.getElementById('inlineRadio1').checked=true;
    }
    else if(jobTypeNew==='PT'){
        document.getElementById('inlineRadio2').checked=true;

    }
    else{
        document.getElementById('inlineRadio3').checked=true;

    }
    

}