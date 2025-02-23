import { openai } from './openai';

interface PlantFact {
  fact: string;
  question: string;
  choices: string[];
  correctAnswer: string;
}

export async function getPlantFacts(plantName: string): Promise<PlantFact[]> {
  const prompt = `Generate 3 interesting facts about ${plantName}, each with a multiple choice question. Return ONLY the raw JSON array without any markdown formatting or additional text. Format as JSON array with objects containing: fact (string), question (string), choices (array of 4 strings), correctAnswer (string matching one of the choices). Example:
  [
    {
      "fact": "The Venus Flytrap can count! It only closes when two trigger hairs are touched within 20 seconds.",
      "question": "How long does a Venus Flytrap wait between trigger hair touches before resetting?",
      "choices": ["5 seconds", "20 seconds", "1 minute", "5 minutes"],
      "correctAnswer": "20 seconds"
    }
  ]`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a knowledgeable botanist creating an engaging plant learning experience. 
          For each fact, create a question that requires critical thinking or inference rather than direct recall.
          The question should make students think about why something is true or connect different pieces of information.
          
          Examples of good questions:
          Fact: "Cacti have thick, fleshy stems that store water."
          Question: "Why might cacti thrive in areas where it only rains a few times per year?"
          
          Fact: "Maple trees produce helicopter-like seeds that spin as they fall."
          Question: "How does this spinning motion benefit the maple tree's survival?"
          
          Format each response as a JSON array with exactly 3 objects, each containing:
          - fact: An interesting fact about the plant
          - question: An engaging question that requires thinking beyond the fact
          - choices: Array of 4 possible answers
          - correctAnswer: The correct answer (must be one of the choices)
          
          Make sure facts and questions are diverse and cover different aspects of the plant.`
        },
        {
          role: "user",
          content: `Generate 3 interesting facts and related questions about ${plantName}. Make the questions require inference or critical thinking rather than just repeating the fact.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content received from OpenAI");

    // Clean the response by removing any markdown formatting
    const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      const facts: PlantFact[] = JSON.parse(cleanedContent);
      return facts;
    } catch (parseError) {
      console.error("Failed to parse JSON:", cleanedContent);
      throw new Error("Invalid JSON response from OpenAI");
    }
  } catch (error) {
    console.error("Error getting plant facts:", error);
    throw error;
  }
}
