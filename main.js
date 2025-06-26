const categoryEl = document.getElementById("category");
const typeEl = document.getElementById("product-type");

//get all data from api
const getAllApiData = async () => {
  try {
    const response = await fetch("data.json");
    return await response.json();
  } catch (err) {
    console.log("error: ", err);
  }
};

(async () => {
  // load the api data
  const data = await getAllApiData();

  //------------------- working on 1st filter-category

  // get all categories
  let allCategories = [...new Set(data.map((item) => item.category))]; //initialize array to hold catagories to be received

  function showCategory(parent) {
    // display All categories
    allCategories.forEach((category, i) => {
      const li = document.createElement("li");
      li.id = `cat-${i}`;
      li.textContent = `${category} >`;

      parent.appendChild(li);
    });
  }

  // get all product types
  function showProductTypes(selectedCategory, parent) {
    // get filtered category types
    let allTypes = [
      ...new Set(
        data
          .filter(
            (item) => item.category?.trim()?.toLowerCase() === selectedCategory
          )
          .map((item) => item.type)
      ),
    ];

    // display unique types
    allTypes.forEach((type, i) => {
      const li = document.createElement("li");
      li.id = `type-${i}`;
      li.textContent = `${type} >`;

      parent.appendChild(li);
    });
  }

  let isCategoryOpen = false;
  categoryEl.addEventListener("mouseenter", () => {
    if (!isCategoryOpen) {
      showCategory(categoryEl);
      isCategoryOpen = true;

      categoryEl.addEventListener("click", (e) => {
        if (e.target?.tagName === "LI") {
          const selectedCategory = e.target.textContent.split(">")[0].trim();

          e.target.textContent = `${selectedCategory} <`;
          showProductTypes(selectedCategory.toLowerCase(), typeEl);
        }
      });
    }
  });

  //------------------- working on 2 filter-product type

  typeEl.addEventListener("click", (e) => {
    if (e.target?.tagName === "LI") {
      const selectedType = e.target.textContent.split(">")[0].trim();

      e.target.textContent = `${selectedType} <`;

      const filteredData = data.filter(
        (item) =>
          item.type?.trim()?.toLowerCase() === selectedType.toLowerCase()
      );

      console.log(filteredData);
    }
  });
})();
