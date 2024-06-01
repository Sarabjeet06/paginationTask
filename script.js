console.log("hello world");
const products=document.getElementById("allCards");
let pages=document.getElementsByClassName("number");
let currentPage=1;
let productOnEachPage=[];

const markUnActive = ()=>{
    for(let page of pages){
        page.classList.remove("active-page");
    }

    //in this function itself, will fetch the data as every time this function will be called when we change the page by any method
    // and also doing the skip calculations here itself

    fetchData();

}

const activePage =(event)=>{
    console.log("yes");

    //marking every page number as in active

    currentPage=event.target.getAttribute("value");

    markUnActive();

    // marking the active current page

    event.target.classList.add("active-page");
    
    
    console.log(currentPage);

}

const getPrevPage = () =>{
    if(currentPage>1){
        currentPage--;
        markUnActive();
        pages[currentPage-1].classList.add("active-page");
    }
}

const getNextPage = () =>{
    if(currentPage<pages.length){
        currentPage++;
        markUnActive();
        pages[currentPage-1].classList.add("active-page");
    }

}



const fetchData = async () => {
    try {
        let allProducts;
        if(productOnEachPage.length<currentPage){
            const itemsPerPage=10;
            const skipItemsCount=(currentPage-1)*itemsPerPage;
            const perPageUrl=`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skipItemsCount}`;
            const resposne = await fetch(perPageUrl);
            const data= await resposne.json();
            allProducts=data.products;
            productOnEachPage.push(allProducts);
        }else{
            allProducts=productOnEachPage[currentPage-1];
        }


        products.innerHTML='';

        allProducts.map((product)=>{
            const card= document.createElement("div");
            card.classList.add("card");

            const cardContent=document.createElement("div");
            cardContent.classList.add("card-content");

            const img=document.createElement("img");
            img.src=product.thumbnail;
            img.alt=product.title;

            const cardTitle=document.createElement("div");
            cardTitle.classList.add("card-title");
            cardTitle.innerText=product.title;

            const cardPrice=document.createElement("div");
            cardPrice.classList.add("card-price");
            cardPrice.innerText=`Price: ${product.price}`;

            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardPrice);

            card.appendChild(img);
            card.appendChild(cardContent);
            products.appendChild(card);  
        })
    } catch (error) {
        console.log(error);
    }
    
}

//for infinite scroll
window.addEventListener("scroll",(e)=>{
    let {clientHeight, scrollHeight,scrollTop}= e.target.documentElement;
    if(clientHeight+scrollTop===scrollHeight){
        getNextPage();
    }
})
fetchData();