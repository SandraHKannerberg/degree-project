import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { useParams } from "react-router-dom";

function ProductByCategory() {
  const { getCategory, categories, getAllCategories } = useProductContext();

  const { id } = useParams();

  // Get the category from the id in the URL
  useEffect(() => {
    getCategory();
  }, [id]);

  // Get all categories to search after matching id
  useEffect(() => {
    getAllCategories();
  }, []);

  // Find the category with the matching ID
  const selectedCategory = categories.find((category) => category._id === id);

  return (
    <div>
      {selectedCategory ? (
        <h1>{selectedCategory.title}</h1>
      ) : (
        <p>Category not found</p>
      )}
    </div>
  );
}

export default ProductByCategory;
