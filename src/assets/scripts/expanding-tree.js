document.addEventListener("DOMContentLoaded", function () {
  const treeItems = document.querySelectorAll(".tree-item-content");

  treeItems.forEach(itemContent => {
    const treeItem = itemContent.parentElement;
    const childrenContainer = treeItem.querySelector(".tree-item-children");

    if (!childrenContainer) {
      itemContent.classList.add("leaf-node");
      return;
    }

    itemContent.addEventListener("click", function (e) {
      e.stopPropagation();

      const toggle = this.querySelector(".tree-item-toggle");
      const isExpanded = toggle.classList.contains("expanded");

      if (isExpanded) {
        // Collapse
        toggle.classList.remove("expanded");
        childrenContainer.classList.remove("expanded");
      } else {
        // Expand this item
        toggle.classList.add("expanded");
        childrenContainer.classList.add("expanded");
      }
    });
  });
});
