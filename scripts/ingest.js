
import movies from '../scripts/sample_movies.js';

async function main(movies) {
  const data = await Promise.all(
    movies.map(async (movie) => {
        const { data } = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: movie.content
        });
        return {
          title: movie.title,
          release_year:movie.releaseYear,
          content: movie.content,
          embedding:data[0].embedding
        };
    })
  );

  // Insert content, embedding and movie data into Supabase
  console.log(data)
    const { error } = await supabase.from("movies").insert(data);
  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
  console.log('Embedding and Storing complete!');
}

main(movies).catch((error) => {
  console.error(error);
});