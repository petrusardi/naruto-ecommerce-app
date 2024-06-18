const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function openAI(search) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Please send the possible name of the Naruto anime character with the key name is "${search}", send one most likely character name.
        Send the full name and you can use letters like this e.g., “Tōkyō”, “Ōsaka”. Answer by giving the character name only. If search not found, please search again until you get the result.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
};
