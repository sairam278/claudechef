

require("dotenv").config();



console.log("Using key:", process.env.OPENROUTER_API_KEY?.slice(0, 10) + "...");

async function getRecipeFromMistral(ingredients) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://startling-hotteok-4a31d9.netlify.app",
        "X-Title": "ChefClaude Recipe Generator",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",

        messages: [
          {
            role: "system",
            content:
              "You are an expert chef who writes structured Markdown recipes with clear sections: ## Title, ## Ingredients, ## Instructions, and ## Tips.",
          },
          {
            role: "user",
            content: `Create a delicious Markdown recipe using these ingredients: ${ingredients.join(", ")}.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API returned ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No recipe generated.";
  } catch (error) {
    console.error("Error in getRecipeFromMistral:", error);
    throw new Error("Failed to generate recipe: " + error.message);
  }
}

module.exports = { getRecipeFromMistral };
