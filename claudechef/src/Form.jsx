import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "./ai.js";
export default function Form() {

    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");
   

    async function getRecipe() {
        try {
            const recipeMarkDown = await getRecipeFromMistral(ingredients);   
            setRecipe(recipeMarkDown);
        } catch (error) {
            console.error('Error getting recipe:', error);
            setRecipe('Error: ' + error.message);
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        
    }

    return (
        <main>
        <form action={addIngredient} className="add-ingredient-form" >
            
                <input
                    type="text"
                    name="ingredient"
                    placeholder="e.g oregano"
                    aria-label="Add ingredient"
                 />
            <button>Add Ingredient</button>
            </form>
            
            {ingredients.length > 0 &&<IngredientsList
                ingredients={ingredients}
                getRecipe={getRecipe}
            />}
            
            {recipe &&<ClaudeRecipe recipe={recipe} />}


       </main>
    )
}