var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
// -------------------------------- Finish Swiper ----------------------------------

let color_product = "قرمز"
let _inp_color_product = document.querySelectorAll('.inp_color_product')
_inp_color_product.forEach((val) => {
    val.addEventListener('change', () => {
        color_product = val.getAttribute('value')
    })
})

function specifications() {
    fetch('https://one-api.ir/digikala/?token=699479:652bfa5365b89&action=product_specifications&id=' + _value)
        .then(res => res.json())
        .then(val => {
            val.result[0].attributes.map((item, index) => {
                let _specifications = document.createElement('div')
                _specifications.innerHTML = `
                        <div class="flex w-full border-[#bebcbc60] border-b-2">
                             <span class="w-[50%] px-4 py-2">${item.values}</span>
                             <span class="w-[50%] bg-[#F5F5F5] flex justify-end px-4 py-2">${item.title}</span>
                        </div>
                    `
                document.getElementsByClassName('specifications')[0].appendChild(_specifications)
            })
        })
}
// ------------------------------ Finish specifications -----------------------------------

let _value = localStorage.getItem('myValue');
let lenght_product = 0
function getData() {
    fetch('https://one-api.ir/digikala/?token=699479:652bfa5365b89&action=product&id=' + _value)
        .then(res => res.json())
        .then(val => {
            val.result.images.image_list.map((item, index) => {
                if (lenght_product < 7) {
                    let art = document.createElement('div')
                    art.innerHTML = `
                    <div class="w-full font-semibold pl-40 py-1">
                        <a class="w-full flex" href="">
                        <figure class="h-[60px] w-[60px]">
                            <img class="other_product_photos w-full h-full object-cover" src="${item}" alt="">
                        </figure>
                        </a>
                     </div>
                    `
                    document.getElementsByClassName('other_product')[0].appendChild(art)
                }
                lenght_product++
            })
            document.getElementsByClassName('category_title')[0].innerHTML += val.result.category_title
            document.getElementsByClassName('brand')[0].innerHTML += val.result.brand.title_fa
            document.getElementsByClassName('title_fa_product')[0].innerHTML += val.result.title_fa
            document.getElementsByClassName('title_en_product')[0].innerHTML += val.result.title_en
            document.getElementsByClassName('description')[0].innerHTML += val.result.review.description
            let default_src = document.getElementsByClassName('img_product')[0]
            default_src.setAttribute('src', val.result.images.main)
            let _other_product_photos = document.querySelectorAll('.other_product_photos')
            _other_product_photos.forEach((item) => {
                item.addEventListener('mouseenter', () => {
                    let _src = item.getAttribute('src')
                    default_src.setAttribute('src', _src)
                    item.style.boxShadow = 'rgba(0, 0, 0, 0.35) 10px 10px 12px'
                    item.style.transition = '.4s'
                })
                item.addEventListener('mouseleave', () => {
                    default_src.setAttribute('src', val.result.images.main)
                    item.style.boxShadow = 'rgba(0, 0, 0, 0) 0px 0px 0px'
                    item.style.transition = '.4s'
                })
            });


            let _btn_buy = document.getElementsByClassName('btn_buy')[0]
            _btn_buy.addEventListener('click', (e) => {
                let count = e.target.getAttribute('data-count')
                let count_basket = document.getElementsByClassName('count_basket')[0]
                count_basket.style.display = 'flex'
                let LOCAL_COUNT = localStorage.getItem('CountBasket');
                localStorage.setItem('CountBasket', Number(LOCAL_COUNT) + 1);
                count_basket.innerText = Number(LOCAL_COUNT) + 1

                if (count == '1') {
                    e.target.setAttribute('data-count', '2')
                    let _basket = document.createElement('div')
                    _basket.innerHTML = `
                    <div class="basket w-[300px]  absolute right-0 top-0 bg-white z-20 px-4">
                <div class=" w-full flex justify-between py-4"><span class=""> <i
                            class="demo-icon icon-ok-circled"></i>افزوده شد به سبد</span><i
                        class="close_basket demo-icon icon-cancel"></i></div>
                <div class="w-full flex">
                    <figure class="w-[60px] h-[60px]">
                        <img class="w-full h-full" src="${val.result.images.main}" alt="">
                    </figure>
                    <div class=" w-[calc(100%-60px)]">
                        <span class="flex w-full justify-end">${val.result.category_title} ${val.result.brand.title_fa}</span>
                        <span class="price_product flex w-full justify-end pt-2">${new Intl.NumberFormat().format(val.result.price.selling_price)} Rials :قیمت</span>
                        <span class="flex w-full justify-end pt-2">رنگ: ${color_product}</span>
                    </div>
                </div>
                <div class="w-full flex justify-between py-4">
                    <a href="../Basket-Page/Basket.html" class="w-[30%] h-[50px] border rounded-full flex justify-center cursor-pointer bg-black text-white items-center text-[12px]">
                        مشاهده سبد 
                    </a>
                    <span href="#" class="Confirmed_Basket w-[30%] h-[50px] border rounded-full flex justify-center cursor-pointer bg-black text-white items-center text-[12px]">
                          تایید
                    </span>
                    <div class="w-[30%] h-[50px] border rounded-full flex items-center justify-evenly">
                        <i class="minus_product demo-icon icon-minus cursor-pointer"></i>
                        <span>${(count)}</span>
                        <i class="plus_product demo-icon icon-plus cursor-pointer"></i>
                    </div>
                </div>
            </div>
                `
                    document.getElementsByClassName('basket_stand')[0].appendChild(_basket)
                }


                let Confirmed_Basket = document.getElementsByClassName('Confirmed_Basket')[0]
                Confirmed_Basket.addEventListener('click', () => {
                    ConfirmedBasket(count, val)
                })


                let _plus_product = document.getElementsByClassName('plus_product')[0]
                _plus_product.addEventListener('click', (e) => {
                    count = parseInt(count) + 1
                    e.target.previousElementSibling.innerHTML = count
                    document.getElementsByClassName('price_product')[0].innerHTML = ` ${new Intl.NumberFormat().format(val.result.price.selling_price * count)} Rials :قیمت`
                    local_count_plus(count_basket)
                })


                let _minus_product = document.getElementsByClassName('minus_product')[0]
                _minus_product.addEventListener('click', (e) => {
                    let price = val.result.price.selling_price
                    count = parseInt(count) - 1
                    if (count < 1) {
                        count = 1
                        e.target.nextElementSibling.innerHTML = count
                    } else {
                        e.target.nextElementSibling.innerHTML = count
                        document.getElementsByClassName('price_product')[0].innerHTML = `${new Intl.NumberFormat().format(price * (count + 1) - val.result.price.selling_price)} Rials :قیمت`
                        local_count_decrease(count_basket)
                    }
                })


                document.getElementsByClassName('close_basket')[0].addEventListener('click', (e) => {
                    let DataCount = document.getElementsByClassName('btn_buy')[0].getAttribute('data-count')
                    if (DataCount == '2') {
                        e.target.parentElement.parentElement.remove()
                        _btn_buy.setAttribute('data-count', '1')
                    }
                })


            })
        })
}


function ConfirmedBasket(count, val) {
    var ListBasket = [];
    var show = {
        IdProduct: val.result.id,
        CountProduct: count,

    };
    ListBasket.push(show);
    ListBasket = ListBasket.concat(JSON.parse(localStorage.getItem('BasketInformation') || '[]'));
    localStorage.setItem("BasketInformation", JSON.stringify(ListBasket));
}

ShowAlertBasket()
function ShowAlertBasket() {
    LOCAL_COUNT = localStorage.getItem('CountBasket');
    let count_basket = document.getElementsByClassName('count_basket')[0]
    if (LOCAL_COUNT >= 1) {
        count_basket.style.display = 'flex'
        count_basket.innerHTML = LOCAL_COUNT

    } else {
        count_basket.style.display = 'none'
    }
}

function local_count_plus(count_basket) {
    LOCAL_COUNT = localStorage.getItem('CountBasket');
    localStorage.setItem('CountBasket', Number(LOCAL_COUNT) + 1);
    count_basket.innerText = (Number(LOCAL_COUNT) + 1)
}

function local_count_decrease(count_basket) {
    LOCAL_COUNT = localStorage.getItem('CountBasket');
    localStorage.setItem('CountBasket', Number(LOCAL_COUNT) - 1);
    count_basket.innerText = (Number(LOCAL_COUNT) - 1)
}

