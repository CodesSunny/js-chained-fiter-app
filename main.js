window.onload =()=>{
     const categoryEl = document.getElementById("category");
     const productTypeEl = document.getElementById("product-type");

    //get all data from api
    const getAllApiData = async()=>{
     try{
         const response =await fetch('data.json');
         const data = await response.json();
         return data;
        }catch(err){
            console.log("error: ", err);
            
        }
    }


    //   display categories
    const showCategories = (apiData,selectedCategory,e)=>{
           //console.log(apiData );   //array of objects having duplicate categories
            const allCategories = apiData.map((item)=>item.category) ;           //array of duplicate categories
            const uniqueCats =[...new Set(allCategories)];    //['Electronics', 'Clothing', 'Stationery', 'Grocery']
            

            // display unique cats on hover
            uniqueCats.forEach((uniqueCat,index )=>{
                const allCatLis= categoryEl.querySelectorAll("li");  //nodelist but not an array
                const allCatLisArr = [...allCatLis];
                //check duplicate category before adding to ul
                const duplicateCat = allCatLisArr.some((li)=> li.textContent === uniqueCat);  //check duplicate category

                if(duplicateCat){   //duplicate true exit 
                    return ;
                }

                const catLi = document.createElement("li");
                catLi.textContent = uniqueCat;
                catLi.id = `cat-${index+1}`;
                categoryEl.append(catLi);  
            })
                    
        }



    //display Product Types    
    const showProductTypes=(apiData,selectedCategory)=>{
        console.log("selected li is: ", selectedCategory  );
        const uniqueProductTypes = [...new Set(apiData.map(item => item.type))]
        console.log(uniqueProductTypes);

        uniqueProductTypes.forEach((uniqueType,index )=>{
            const allTypeLis= productTypeEl.querySelectorAll("li");
            const allTypeLisArr = [...allTypeLis];
            const duplicateType = allTypeLisArr.some(li => li.textContent === uniqueType)
            if(duplicateType){
                return;
            }

                const typeLi = document.createElement("li");
                typeLi.textContent = uniqueType;
                typeLi.id = `type-${index+1}`;
                productTypeEl.append(typeLi);  
        })
    }

        

















   
    let selectedCategory ="";
    categoryEl.addEventListener("mouseover", async(e)=>{
        const apiData = await getAllApiData();    

        if(e.target.tagName === 'LI'){
           //selected category:li
           selectedCategory = e.target;       
        }
        
        showCategories(apiData,e);

        showProductTypes(apiData,selectedCategory);
    })



    categoryEl.addEventListener("mouseleave", ()=>{
        categoryEl.textContent = ` Category ` ;   
        
    })




}

