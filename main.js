window.onload =()=>{
  
    //get all data from api
    const getAllApiData = async()=>{
     try{
         const response =await fetch('data.json');
         const data = await response.json();
         
        //  showCategory(data);   //send fetched data
        //  showProductType(data);  //send fetched data
         return data;
        }catch(err){
            console.log("error: ", err);
            
        }
    }
        
    // getAllApiData();   //load fetched data 
 

    //------------------- working on 1st filter-category

    let allCategories = [];   //initialize array to hold catagories to be received

    // get all categories
    function showCategory(apiData){
         apiData.map((item)=>{
            allCategories.push(item.category);     //append catagories in array
            })

         const uniqueCategoriesObj = new Set(allCategories);  //object of unique categories
         const uniqueCategoriesArr = [...uniqueCategoriesObj];   //convert object into array

             // display unique categories
        let liHtml = "";
        uniqueCategoriesArr.map((uniqueCategory,index)=>{
            liHtml += `
            <li id='cat-${index}'>${uniqueCategory} <span class="hide"> > </span></li>
            `           
          })

        categoryEl.innerHTML= liHtml;    //append lis in ul
         
    } 


     // get all product types
    function showProductTypes(apiData, selectedCategory){
        let allTypes = []; //initialize array to hold types to be received
        // get filtered category types
        apiData.filter((item)=>{
            return item.category.toLowerCase() === selectedCategory;         
        }).map((item)=>{
            allTypes.push(item.type);  //append related types in array
        })       

         const uniquetypesObj = new Set(allTypes);  //object of unique types
         const uniqueTypesArr = [...uniquetypesObj];   //convert object into array

             // display unique types
        let liHtml = "";
        uniqueTypesArr.map((uniqueType,index)=>{
            liHtml += `
            <li id='type-${index}'>${uniqueType} <span class="hide"> > </span></li>
            `           
          })

        typeEl.innerHTML= liHtml;    //append lis in ul
         
    } 


    const categoryEl= document.getElementById("category"); 
    categoryEl.addEventListener("mouseover", async function(){
        const apiData = await getAllApiData();
        showCategory(apiData);  //send api data

         categoryEl.querySelectorAll("li").forEach((item,index)=> {
            const span= item.querySelector("span");
            span.classList.remove("hide");
            
             item.addEventListener("click", ()=>{
                // get clicked category name
                 const selectedCategory = item.textContent.replace(">", "").trim().toLowerCase();
                showProductTypes(apiData, selectedCategory);  //show related types
        })
             
             
        })
        
        
         
         })
  


    
      //------------------- working on 2 filter-product type

    //get product types
    const typeEl= document.getElementById("product-type"); 
    typeEl.addEventListener("mouseover", async function(){
        const apiData = await getAllApiData();
        showProductTypes(apiData);  //send api data

        typeEl.querySelectorAll("li").forEach((item,index)=> {
            const span= item.querySelector("span");
            span.classList.remove("hide");
            
             item.addEventListener("click",()=>{
                console.log(item,index);
        })
             
             
        })
        
        
         
         })


}

