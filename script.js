const formValue = document.querySelector(".formValue")

const status = {
    earning : 0,
    expance: 0,
    net: 0,
    transactions:[
       
    ]
}


const  addFun =(e) =>{
    e.preventDefault()
    let isearn = e.submitter.id === "credit" ? true : false
    const formDa = new FormData(formValue)
    const tData = {};
    formDa.forEach((value,index) => {
        tData[index] = value;
        console.log(value)
    })
    const {text,num} = tData;
    let transaction = {
        id:isupdate ? tid : Math.floor(Math.random() * 1000),
        text: text,
        amount: +num,
        type: isearn ? "credit" : "debit",
    }
    if(isupdate){
        let tindex =status.transactions.findIndex(t =>t.id === tid)
        status.transactions[tindex] = transactions
        isupdate = false
        tid = null
        }
        
        
        else{
        status.transactions.push(transaction)
                                                }

    showFun()
    formValue.reset()

}


function showFun (){

const todosAll = document.querySelector(".todos");
const blance = document.querySelector("#blance");
const btnEar = document.querySelector(".btnEar");
const btnExp= document.querySelector(".btnExp");

    let earning = 0;
    let expance = 0;
    let net = 0;

    let alltodo = status.transactions
    todosAll.innerHTML = ""
    alltodo.forEach((alltodos) => {
        console.log(alltodo)
        let{amount,id,text,type} = alltodos;
        let isEarn = type  === "credit" ? true : false
        let earns = isEarn ? "+" : "-"
        const transationEl = `
                <div class="Ccard" id="${id}">
                <div class="container item" onclick="showbtn(${id})">
                <div class="left">
                    <p> ${text}</p>
                    <p>${earns} $ ${amount}</p>
                        </div>
                        <div class="status ${isEarn ? "credit" : "debit"}">
                        ${isEarn ? "C" : "D"}
                        </div>
                </div>
                        <div class="lower_card">
                            <i class="ri-edit-2-line" onclick="editbtn(${id})"></i>
                            <i class="ri-delete-bin-line edittag" onclick="deletebtn(${id})"></i>
                        </div> 
                </div>
                `
                earning += isEarn ? amount : 0;
                expance += !isEarn ? amount : 0;
                net = earning - expance

                todosAll.insertAdjacentHTML("afterbegin",transationEl)
            })
            console.log(earning,expance,net)

            blance.innerHTML = net
            btnEar.innerHTML = earning
            btnExp.innerHTML =expance
}
showFun()
formValue.addEventListener("submit", addFun)




const Ccard = document.querySelectorAll(".Ccard")



// function showTodo (value) {
//    console.log(value)
// }


const showbtn = (id) => {
    console.log(id)
    const cardid = document.getElementById(id)
    console.log(cardid)
    const lower_card = cardid.querySelector(".lower_card")
    console.log(lower_card)
    lower_card.classList.toggle("active")
}




function editbtn (id){
    const finds =  status.transactions.find(value=> value.id === id)
    const {text,amount} = finds;
    console.log({text,amount})
    const earning = document.querySelector("#earning")
     const expand =  earning.parentElement.nextElementSibling.firstElementChild.nextElementSibling;

     earning.value = text
     expand.value = amount
     tid = id;

}

function deletebtn (id){
  const filtertr =  status.transactions.filter((value,index) => {
        value.id === id
    })
    status.transactions = filtertr
    showFun()
}