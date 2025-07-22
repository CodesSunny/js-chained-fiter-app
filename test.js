window.onload = () => {
  const categoryEl = document.getElementById("category");
  const typeEl = document.getElementById("product-type");
  const brandEl = document.getElementById("brand");
  const priceEl = document.getElementById("price");

  let apiDataCache = null;

  const getAllApiData = async () => {
    if (apiDataCache) return apiDataCache;
    try {
      const response = await fetch("data.json");
      const data = await response.json();
      apiDataCache = data;
      return data;
    } catch (err) {
      console.log("error:", err);
    }
  };

  const renderList = (ul, items, callback) => {
    ul.innerHTML = ul.id.replace("-", " "); // reset header
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item;
      const arrow = document.createElement("span");
      arrow.className = "hide";
      arrow.textContent = ">";
      li.appendChild(arrow);

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        callback(item);
      });

      ul.appendChild(li);
    });
  };

  categoryEl.addEventListener("mouseover", async () => {
    const data = await getAllApiData();
    const categories = [...new Set(data.map(item => item.category))];
    renderList(categoryEl, categories, selectedCategory => {
      const filtered = data.filter(d => d.category === selectedCategory);
      const types = [...new Set(filtered.map(d => d.type))];
      renderList(typeEl, types, selectedType => {
        const filtered2 = filtered.filter(d => d.type === selectedType);
        const brands = [...new Set(filtered2.map(d => d.brand))];
        renderList(brandEl, brands, selectedBrand => {
          const filtered3 = filtered2.filter(d => d.brand === selectedBrand);
          const prices = [...new Set(filtered3.map(d => d.price))];
          renderList(priceEl, prices, () => {});
        });
      });
    });
  });

  // Hide on mouseout
  categoryEl.addEventListener("mouseout", () => {
    if (!categoryEl.contains(document.activeElement)) {
      categoryEl.querySelectorAll("li").forEach(li => li.remove());
    }
  });

  typeEl.addEventListener("mouseout", () => {
    typeEl.querySelectorAll("li").forEach(li => li.remove());
  });

  brandEl.addEventListener("mouseout", () => {
    brandEl.querySelectorAll("li").forEach(li => li.remove());
  });

  priceEl.addEventListener("mouseout", () => {
    priceEl.querySelectorAll("li").forEach(li => li.remove());
  });
};
