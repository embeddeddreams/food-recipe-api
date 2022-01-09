import express from 'express';
import recipesService from '../services/recipes.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:recipes-controller');

class RecipesController {
	async listRecipes(req: express.Request, res: express.Response) {
		const recipes = await recipesService.list(req.query.limit as unknown as number ?? 25, req.query.page as unknown as number ?? 0);
		res.status(200).send(recipes);
	}
	async searchInRecipes(req: express.Request, res: express.Response) {
		const recipes = await recipesService.search(req.query.searchKey as unknown as string, 10, 0);
		res.status(200).send(recipes);
	}

	async getRecipeById(req: express.Request, res: express.Response) {
		const recipe = await recipesService.readById(req.body.id);
		res.status(200).send(recipe);
	}

	async createRecipe(req: express.Request, res: express.Response) {
		const recipeId = await recipesService.create(req.body);
		res.status(201).send({ id: recipeId });
	}

	async patch(req: express.Request, res: express.Response) {
		log(await recipesService.patchById(req.body.id, req.body));
		res.status(204).send();
	}

	async put(req: express.Request, res: express.Response) {
		log(await recipesService.putById(req.body.id, req.body));
		res.status(204).send();
	}

	async removeRecipe(req: express.Request, res: express.Response) {
		log(await recipesService.deleteById(req.body.id));
		res.status(204).send();
	}
}

export default new RecipesController();
