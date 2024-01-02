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
// ------------------------- Finish Swiper -----------------------------
let _accordion = document.querySelectorAll('.accordion')
for (let i = 0; i < _accordion.length; i++) {
    let temp = _accordion[i].nextElementSibling.clientHeight
    _accordion[i].nextElementSibling.setAttribute('data-height', temp)
    _accordion[i].nextElementSibling.style.height = '0'
}
function accordion_select(s) {
    let height_accordion = s.nextElementSibling.getAttribute('data-height')
    let _status = s.nextElementSibling.getAttribute('data-status')
    if (_status == "off") {
        s.nextElementSibling.style.height = height_accordion + 'px'
        s.children[1].style.transform = "rotate(180deg)"
        s.nextElementSibling.setAttribute('data-status', "on")
    }
    else {
        s.nextElementSibling.style.height = '0px'
        s.children[1].style.transform = "rotate(0deg)"
        s.nextElementSibling.setAttribute('data-status', 'off')
    }
}
//------------------------- Finish Accordion -----------------------------------
let _sort_by = document.getElementsByClassName('sort_by')[0]
_sort_by.addEventListener('click', (e) => {
    e.cancelBubble = true
    let _data_sort = _sort_by.getAttribute('data-sort')
    if (_data_sort == 'off') {
        _sort_by.nextElementSibling.style.display = "flex"
        _sort_by.setAttribute('data-sort', 'on')
        _sort_by.children[0].style.transform = "rotate(180deg)"
    } else {
        _sort_by.nextElementSibling.style.display = "none"
        _sort_by.setAttribute('data-sort', 'off')
        _sort_by.children[0].style.transform = "rotate(0deg)"
    }
})
window.addEventListener('click', () => {
    _sort_by.nextElementSibling.style.display = "none"
    _sort_by.setAttribute('data-sort', 'off')
    _sort_by.children[0].style.transform = "rotate(0deg)"
})
//---------------------------- Finish Sort-By --------------------------------------
let _sorted_products = document.querySelectorAll('.sorted_products li')
_sorted_products.forEach((item) => {
    item.addEventListener('click', (e) => {
        sort_type = e.target.getAttribute('data-type')
        document.getElementsByClassName('main_product')[0].innerHTML = ""
        getData(sort_type)
    })
})
// --------------------------- Finish Sorted Products -----------------------------
let menu_product = document.querySelectorAll('header nav ul li')
menu_product.forEach((item) => {
    item.addEventListener('click', (e) => {
        let product_type = e.target.getAttribute('data-type')
        document.getElementsByClassName('main_product')[0].innerHTML = ""
        getData(product_type)
        menu_product.forEach((val) => {
            val.style.borderBottom = '2px solid transparent'
        })
        item.style.borderBottom = '2px solid black'
    })
})
// --------------------------- Finish Menu -----------------------------

ShowAlertBasket()
function ShowAlertBasket() {
    let LOCAL_COUNT = localStorage.getItem('CountBasket');
    let count_basket = document.getElementsByClassName('count_basket')[0]
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

// --------------------------- Finish Icon Basket -----------------------------
function getData(product_type) {
    fetch('https://one-api.ir/digikala/?token=699479:652bfa5365b89&action=home')
        .then(res => res.json())
        .then(val => {
            if (product_type == 'home_1') {
                val.result.home_1.products.map((item) => {
                    let art = document.createElement('div')
                    art.innerHTML = `
                    <div class="product  border-2 w-[320px] p-2 font-semibold mt-8 rounded-[20px] overflow-hidden" data-id='${item.id}'>
                        <a class=" w-full h-full flex flex-wrap " href="assets/ProductInformation-Page/ProductInformation.html">
                            <figure class="w-[100%]">
                                 <img class="w-full h-full object-cover" src="${item.images.main}" alt="">
                            </figure>
                            <div class="w-full">
                                <span class="flex w-full h-[40px] text-[16px] justify-end text-[#A74818] ">${item.brand.title_fa}</span>
                                <span class="flex w-full h-[100px] text-[16px] text-[#707072] justify-end text-right ">${item.title_fa}</span>
                                <span class="flex w-full h-[40px]  text-[16px] text-[#707072] justify-end ">${item.product_badge.text}</span>
                                <span class="flex w-full h-[40px] text-[16px] justify-end text-black ">${new Intl.NumberFormat().format(item.price.selling_price)} Rials</span>
                            </div>
                        </a>
                    </div>
                    `
                    document.getElementsByClassName('main_product')[0].appendChild(art)
                })
            }
            if (product_type == 'home_5') {
                val.result.home_5.products.map((item) => {
                    let art = document.createElement('div')
                    art.innerHTML = `
                    <div class="product  border-2 w-[320px] p-2 font-semibold mt-8 rounded-[20px] overflow-hidden" data-id='${item.id}'>
                    <a class=" w-full h-full flex flex-wrap " href="assets/ProductInformation-Page/ProductInformation.html">
                        <figure class="w-[100%]">
                             <img class="w-full h-full object-cover" src="${item.images.main}" alt="">
                        </figure>
                        <div class="w-full">
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-[#A74818] ">${item.brand.title_fa}</span>
                            <span class="flex w-full h-[100px] text-[16px] text-[#707072] justify-end text-right ">${item.title_fa}</span>
                            <span class="flex w-full h-[40px]  text-[16px] text-[#707072] justify-end ">${item.product_badge.text}</span>
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-black ">${new Intl.NumberFormat().format(item.price.selling_price)} Rials</span>
                        </div>
                    </a>
                 </div>
                    `
                    document.getElementsByClassName('main_product')[0].appendChild(art)
                })
            }
            if (product_type == 'home_4') {
                val.result.home_4.products.map((item) => {
                    let art = document.createElement('div')
                    art.innerHTML = `
                    <div class="product  border-2 w-[320px] p-2 font-semibold mt-8 rounded-[20px] overflow-hidden" data-id='${item.id}'>
                    <a class=" w-full h-full flex flex-wrap " href="assets/ProductInformation-Page/ProductInformation.html">
                        <figure class="w-[100%]">
                             <img class="w-full h-full object-cover" src="${item.images.main}" alt="">
                        </figure>
                        <div class="w-full">
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-[#A74818] ">${item.brand.title_fa}</span>
                            <span class="flex w-full h-[100px] text-[16px] text-[#707072] justify-end text-right ">${item.title_fa}</span>
                            <span class="flex w-full h-[40px]  text-[16px] text-[#707072] justify-end ">${item.product_badge.text}</span>
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-black ">${new Intl.NumberFormat().format(item.price.selling_price)} Rials</span>
                        </div>
                    </a>
                </div>
                    `
                    document.getElementsByClassName('main_product')[0].appendChild(art)
                })
            }
            if (product_type == 'home_3') {
                val.result.home_3.products.map((item) => {
                    let art = document.createElement('div')
                    art.innerHTML = `
                    <div class="product  border-2 w-[320px] p-2 font-semibold mt-8 rounded-[20px] overflow-hidden" data-id='${item.id}'>
                    <a class=" w-full h-full flex flex-wrap " href="assets/ProductInformation-Page/ProductInformation.html">
                        <figure class="w-[100%]">
                             <img class="w-full h-full object-cover" src="${item.images.main}" alt="">
                        </figure>
                        <div class="w-full">
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-[#A74818] ">${item.brand.title_fa}</span>
                            <span class="flex w-full h-[100px] text-[16px] text-[#707072] justify-end text-right ">${item.title_fa}</span>
                            <span class="flex w-full h-[40px]  text-[16px] text-[#707072] justify-end ">${item.product_badge.text}</span>
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-black ">${new Intl.NumberFormat().format(item.price.selling_price)} Rials</span>
                        </div>
                    </a>
                </div>
                    `
                    document.getElementsByClassName('main_product')[0].appendChild(art)
                })
            }
            if (product_type == 'home_7') {
                val.result.home_7.products.map((item) => {
                    let art = document.createElement('div')
                    art.innerHTML = `
                    <div class="product  border-2 w-[320px] p-2 font-semibold mt-8 rounded-[20px] overflow-hidden" data-id='${item.id}'>
                    <a class=" w-full h-full flex flex-wrap " href="assets/ProductInformation-Page/ProductInformation.html">
                        <figure class="w-[100%]">
                             <img class="w-full h-full object-cover" src="${item.images.main}" alt="">
                        </figure>
                        <div class="w-full">
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-[#A74818] ">${item.brand.title_fa}</span>
                            <span class="flex w-full h-[100px] text-[16px] text-[#707072] justify-end text-right ">${item.title_fa}</span>
                            <span class="flex w-full h-[40px]  text-[16px] text-[#707072] justify-end ">${item.product_badge.text}</span>
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-black ">${new Intl.NumberFormat().format(item.price.selling_price)} Rials</span>
                        </div>
                    </a>
                </div>
                    `
                    document.getElementsByClassName('main_product')[0].appendChild(art)
                })
            }
            if (product_type == 'trending') {
                val.result.trending.products.map((item) => {
                    let art = document.createElement('div')
                    art.innerHTML = `
                    <div class="product  border-2 w-[320px] p-2 font-semibold mt-8 rounded-[20px] overflow-hidden" data-id='${item.id}'>
                    <a class=" w-full h-full flex flex-wrap " href="assets/ProductInformation-Page/ProductInformation.html">
                        <figure class="w-[100%]">
                             <img class="w-full h-full object-cover" src="${item.images.main}" alt="">
                        </figure>
                        <div class="w-full">
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-[#A74818] ">${item.brand.title_fa}</span>
                            <span class="flex w-full h-[100px] text-[16px] text-[#707072] justify-end text-right ">${item.title_fa}</span>
                            <span class="flex w-full h-[40px]  text-[16px] text-[#707072] justify-end ">${item.product_badge.text}</span>
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-black ">${new Intl.NumberFormat().format(item.price.selling_price)} Rials</span>
                        </div>
                    </a>
                </div>
                    `
                    document.getElementsByClassName('main_product')[0].appendChild(art)
                })
            }
            if (product_type == 'selling_and_sales') {
                val.result.selling_and_sales.products.map((item) => {
                    let art = document.createElement('div')
                    art.innerHTML = `
                    <div class="product  border-2 w-[320px] p-2 font-semibold mt-8 rounded-[20px] overflow-hidden" data-id='${item.id}'>
                    <a class=" w-full h-full flex flex-wrap " href="assets/ProductInformation-Page/ProductInformation.html">
                        <figure class="w-[100%]">
                             <img class="w-full h-full object-cover" src="${item.images.main}" alt="">
                        </figure>
                        <div class="w-full">
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-[#A74818] ">${item.brand.title_fa}</span>
                            <span class="flex w-full h-[100px] text-[16px] text-[#707072] justify-end text-right ">${item.title_fa}</span>
                            <span class="flex w-full h-[40px]  text-[16px] text-[#707072] justify-end ">${item.product_badge.text}</span>
                            <span class="flex w-full h-[40px] text-[16px] justify-end text-black ">${new Intl.NumberFormat().format(item.price.selling_price)} Rials</span>
                        </div>
                    </a>
                </div>
                    `
                    document.getElementsByClassName('main_product')[0].appendChild(art)
                })
            }
            let _product = document.querySelectorAll('.product')
            _product.forEach((item) => {
                item.addEventListener('click', () => {
                    let id_product = item.getAttribute('data-id')
                    localStorage.setItem('myValue', id_product);
                    window.location.href = 'assets/ProductInformation-Page/ProductInformation.html';
                })
                item.addEventListener('mouseenter', (e) => {
                    item.style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                    item.style.transition = '.4s'
                })
                item.addEventListener('mouseleave', (e) => {
                    item.style.boxShadow = 'rgba(0, 0, 0, 0) 0px 0px 0px'
                    item.style.transition = '.4s'
                })
            });
        })
}

// localStorage.removeItem('CountBasket')
// localStorage.removeItem('BasketInformation')