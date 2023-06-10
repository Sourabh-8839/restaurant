
const form = document.querySelector('#myForm');

const price = document.getElementById('price');

const dish = document.getElementById('dish');

const tables = document.getElementById('tables');

const table1 =document.getElementById('tablelist1');

const table2 = document.getElementById('tablelist2');

const table3 = document.getElementById('tablelist3');

const axiosInstance = axios.create({ baseURL:'https://crudcrud.com/api/dfe68a57370e445693b6e097aa1bfcd4'})

form.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded',async()=>{

    const dish = await axiosInstance.get('/dishes');

    for (let i = 0; i < dish.data.length; i++) {
        
        showOnScreen(dish.data[i]);        
    }


})

async function onSubmit(e){

    e.preventDefault();

    myobj={
        price:price.value,
        dish:dish.value,
        tableNum:tables.options[tables.selectedIndex].value

    };

    const dishes=await axiosInstance.post('/dishes',myobj);

    showOnScreen(myobj);

    price.value='';
    dish.value= '';


}

async function showOnScreen(myobj){

    const li =document.createElement('li');
    //deletebutton
    const btn=document.createElement('button');

    btn.innerHTML = 'delete';

    li.appendChild(document.createTextNode(`${myobj.price}-${myobj.tableNum}-${myobj.dish}`));

    li.appendChild(btn);

    const tablenumber = myobj.tableNum;

    console.log(tablenumber);

    if(tablenumber)
    switch (tablenumber) {
        case 'table1': table1.appendChild(li);
             break;
        case 'table2':table2.appendChild(li);
            break;
        case 'table3':table3.appendChild(li);
            break;

        default:
            break;
    }
    
    btn.onclick= () =>{
        axiosInstance.delete(`/dishes/${myobj._id}`)
    
        .removeChild(li);
        
     }
};
