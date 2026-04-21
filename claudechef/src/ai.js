export async function getRecipeFromMistral(ingredientsArr) {
  try {
    // 👇 dynamically use backend URL (defined in .env)
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

    const response = await fetch(`${API_URL}/api/recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch {
        // In case the backend sent HTML instead of JSON
        throw new Error(`Server error: ${response.status}`);
      }
      throw new Error(errorData.error || "Failed to fetch recipe from backend.");
    }

    const data = await response.json();
    return data.recipe;
  } catch (err) {
    console.error("Error in getRecipeFromMistral:", err);
    if (err.message.includes("Failed to fetch")) {
      throw new Error(
        "Cannot connect to the recipe server. Please make sure the backend is running on port 3001."
      );
    }
    throw new Error(`Failed to get recipe: ${err.message}`);
  }
}
