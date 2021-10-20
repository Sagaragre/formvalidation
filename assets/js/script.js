document.querySelector(".aboutinfo").addEventListener("submit",onFormSubmit);
var selectedrow = null;
function onFormSubmit(e) {
    e.preventDefault();
    var val = validateForm();
    if(val==true){
        var formData = readData();
        if(selectedrow == null){
            insertNewRecord();
        } else {
            updateData();
        }
        resetData();
    }
}

function validateForm() {
    var isvalid = true;
    var fn = document.querySelector(".firstname").value;
    var ln = document.querySelector(".lastname").value;
    var add = document.querySelector(".address").value;
    var genmale = document.querySelector(".male").checked;
    var genfemale = document.querySelector(".female").checked;
    var tc = document.querySelector(".tc");
    
    var fncheck = /^[A-Za-z]{1,}$/;
    var addcheck =/^[A-Za-z.,()0-9 ]{1,}$/;
    var err = document.querySelectorAll(".val-err");
    var name = document.querySelectorAll(".inputfield");
    for(var i = 0; i < 2; i++) {
        if(fncheck.test(name[i].value)) {
            err[i].innerHTML="";
        } else {
            err[i].innerHTML="Please fill field correctly";
            isvalid =false; 
        }
    }
    
    if (addcheck.test(add)) {
        document.querySelector(".address-err").innerHTML ="";
    } else {
        document.querySelector(".address-err").innerHTML ="Please fill address field correctly";
        isvalid =false;
    }
    
    if(genmale == false && genfemale == false) {
        document.querySelector(".gender-err").innerHTML="Please select gender";
        isvalid =false;
    } else {
        document.querySelector(".gender-err").innerHTML="";
    }
    
    if( tc.checked==true) {
        document.querySelector(".check-err").innerHTML="";
    } else {
        document.querySelector(".check-err").innerHTML="Please accept Terms &amp; conditions.";
        isvalid =false;
    }
    
    return isvalid;   
}

function readData() {
    var formData = [];
    formData.push(document.querySelector(".firstname").value);
    formData.push(document.querySelector(".lastname").value);
    formData.push(document.querySelector(".gen:checked").value);
    formData.push(document.querySelector(".address").value);
    return formData;
}

function insertNewRecord() {
    var parentouter = document.querySelector(".out");
    var newoutli = document.createElement("LI");
    newoutli.classList.add('outli');
    parentouter.appendChild(newoutli);
    var inner = document.createElement("UL");
    inner.classList.add('inner');
    newoutli.appendChild(inner);
    var data  = readData();

    for(var i=0; i< data.length; i++) {
        var innerli = document.createElement("LI");
        innerli.innerHTML = data[i];
        inner.appendChild(innerli);
    }
    
    var editli = document.createElement("LI");
    inner.appendChild(editli);
    var editanchor = document.createElement("a");
    editanchor.innerHTML="Edit";
    editanchor.setAttribute('title', 'Edit');
    editanchor.addEventListener('click', editData);
    editli.appendChild(editanchor);
    var deleteli = document.createElement("LI");
    inner.appendChild(deleteli);
    var deleteanchor = document.createElement("a");
    deleteanchor.innerHTML="Delete";
    deleteanchor.setAttribute('title', 'Delete');
    deleteanchor.addEventListener('click',deleteData);
    deleteli.appendChild(deleteanchor);
}

function resetData() {
    selectedrow = null;
    document.querySelector(".aboutinfo").reset();
}

function editData(e) {
    e.preventDefault();
    selectedrow = this.parentElement.parentElement; 
    document.querySelector(".firstname").value = selectedrow.childNodes[0].innerHTML;
    document.querySelector(".lastname").value = selectedrow.childNodes[1].innerHTML;
    var gen = selectedrow.childNodes[2].innerHTML;
    if(gen == "male") {
        var m = document.querySelector("[value=male]");
        m.checked=true;
    } else {
        var f = document.querySelector("[value=female]");
        f.checked=true;
    }
    document.querySelector(".address").value = selectedrow.childNodes[3].innerHTML;
    document.querySelector(".tc").checked=true;
}

function updateData() {
    var data = readData();
    for(var i=0; i< data.length; i++) {
        selectedrow.childNodes[i].innerHTML = data[i];
    }

    selectedrow = null;
}

function deleteData(e) {
    e.preventDefault();
    var selected = this.parentElement.parentElement.parentElement;
    selected.remove();
}

var fncheck = /^[A-Za-z]{1,}$/;
var addcheck =/^[A-Za-z.,()0-9 ]{1,}$/;

function onFirstNameFocusout() {
    var fn = document.querySelector(".firstname").value;
    if(fncheck.test(fn)) {
        document.querySelector(".firstname-err").innerHTML ="";
    } else {
        document.querySelector(".firstname-err").innerHTML ="Please fill first name field properly";
    }
}

function onLastNameFocusout() {
    var ln = document.querySelector(".lastname").value;
    if(fncheck.test(ln)) {
        document.querySelector(".lastname-err").innerHTML ="";
    } else {
        document.querySelector(".lastname-err").innerHTML ="Please fill last name field properly";
    }
}

function onGenderFocusout() {
    var genmale = document.querySelector(".male").checked;
    var genfemale = document.querySelector(".female").checked;
    if((genmale == false && genfemale == true)|| (genmale == true && genfemale == false)) {
        document.querySelector(".gender-err").innerHTML="";
    } else {
        document.querySelector(".gender-err").innerHTML = "Please select gender";
    }
}

function onAddressFocusout() {
    var add = document.querySelector(".address").value;
    if(addcheck.test(add)) {
        document.querySelector(".address-err").innerHTML ="";
    } else {
        document.querySelector(".address-err").innerHTML = "Please fill address field properly";
    }
}

function onTcFocusout() {
    var tc = document.querySelector(".tc");
    if(tc.checked) {
        document.querySelector(".check-err").innerHTML="";
    } else {
        document.querySelector(".check-err").innerHTML = "Please accept Terms & conditions";
    }
}

document.querySelector(".firstname").addEventListener('focusout', onFirstNameFocusout);
document.querySelector(".lastname").addEventListener('focusout', onLastNameFocusout);
document.querySelector(".address").addEventListener('focusout', onAddressFocusout);
document.querySelector(".male").addEventListener('focusout', onGenderFocusout);
document.querySelector(".female").addEventListener('focusout', onGenderFocusout);
document.querySelector(".tc").addEventListener('focusout', onTcFocusout);


function cancel() {
    selectedrow = null;
    var err = document.querySelectorAll(".val-err");
    for(var i = 0; i < err.length; i++) {
        err[i].innerHTML="";
    }
}

document.querySelector("#cancel").addEventListener('click',cancel);
























