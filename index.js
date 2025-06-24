window.onload =()=>{
 const categoryEl= document.getElementById("category");

 categoryEl.addEventListener("focus", function(){

  const getData=async()=>{
    try{
        const response =await fetch('data.json');
        const data = await response.json();
  
        
        // get all categories
        const allCategories = data.map((item)=>{
          return item.category;
        })

        // console.log(allCategories);    //array of all categories
        

       const uniqueCategoriesObj = new Set(allCategories);  //object of unique categories
       const uniqueCategoriesArr = [...uniqueCategoriesObj];   //convert object into array
      // console.log(uniqueCategoriesArr);     
        
      // display unique categories
      let optionHtml = "";
      uniqueCategoriesArr.map((uniqueCategory,index)=>{
        optionHtml += `
            <option id='cat-${index}' value=${uniqueCategory}>${uniqueCategory}</option>
            `           
          })

      categoryEl.innerHTML += optionHtml;    //append options in select
          // console.log(categoryEl.options);  //HTMLOptionsCollection(5)
          // console.log(categoryEl.selectedIndex);  //HTMLOptionsCollection(5)

      categoryEl.addEventListener("change", function(){
        const selectedOptionIndex = categoryEl.selectedIndex;  //index
        const selectedOption = categoryEl.options[selectedOptionIndex];  //option 
        console.log(selectedOption.index, selectedOption.textContent);    //2,electronics
        
      })    
    
      // working on 2 filter-product type
      
        
    }catch(err){
        console.log("error: ", err);
        
    }

  } 
  

    

 
  getData();
 }
 )
}
