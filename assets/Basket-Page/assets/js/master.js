function getbasket() {
    var ListBasket = [];
    ListBasket = JSON.parse(localStorage.getItem('BasketInformation')) || [];
    ListBasket.map((item) => {
        fetch('https://one-api.ir/digikala/?token=699479:652bfa5365b89&action=product&id=' + item.IdProduct)
            .then(res => res.json())
            .then(val => {
                let details_basket = document.createElement('div')
                details_basket.innerHTML = `
                <div  class="w-full  px-5 flex flex-wrap border-b-4 border-b-[#e4e4e4] pb-4 pt-4">
                  
                    <div class="w-[80%] h-[150px] flex flex-wrap">
                    <span class="w-[100%] text-end text-[15px]">${val.result.category_title}</span>
                    <span class="w-[100%] text-end text-[15px]">${new Intl.NumberFormat().format(val.result.price.selling_price)} Rials :قیمت</span>
                    <span class="w-[100%] text-[15px] text-end"> تعداد : ${item.CountProduct} </span>
                    <span class="TotalPrice w-[100%] text-end text-[15px]">${new Intl.NumberFormat().format(val.result.price.selling_price * item.CountProduct)} Rials :قیمت</span>
                    <span  class="w-[100%]  text-end"><i class="demo-icon icon-heart-empty-1  mr-[20px]  cursor-pointer"></i><i class="demo-icon icon-trash cursor-pointer"></i></span>
                    </div>
                    <figure class="w-[20%] h-[150px]">
                    <img class="w-full h-full" src=${val.result.images.main} alt="">
                </figure>
                    <div class="w-[100%] h-[50px]">
                        <p class="del text-end text-[15px] px-[10px] ">  ${val.result.title_fa} </p>
                        
                    </div>
                </div>
                `
                document.getElementsByClassName('show_basket')[0].appendChild(details_basket)
                document.querySelectorAll('.TotalPrice').forEach((val) => {
                })

            })
    })
}



ShowAlertBasket()
function ShowAlertBasket() {
    let LOCAL_COUNT = localStorage.getItem('CountBasket');
    let  count_basket = document.getElementsByClassName('count_basket')[0]
    count_basket.style.display = 'hidden'
    if (LOCAL_COUNT >= 1) {
        count_basket.style.display = 'flex'
        count_basket.innerHTML = LOCAL_COUNT

    } else {
        count_basket.style.display = 'none'
    }
    count_basket = document.getElementsByClassName('count_basket')[0]
    LOCAL_COUNT = localStorage.getItem('CountBasket');
   count_basket.innerText = Number(LOCAL_COUNT) 
}




