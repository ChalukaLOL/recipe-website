import fs from 'fs';
import path from 'path';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  let recipes = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    recipes = JSON.parse(fileContent);
  }

  const recipe = recipes.find((r) => String(r.id) === String(id));

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
  };
}
