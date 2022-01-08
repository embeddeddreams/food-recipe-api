import express from 'express';
import recipeService from '../services/recipes.service';

class RecipesMiddleware {
	async validateSameTitleDoesntExist(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const recipe = await recipeService.getRecipeByExactTitle(req.body.title);
		if (recipe) {
			res.status(400).send({ errors: ['Recipe title already exists'] });
		} else {
			next();
		}
	}

	async validateRecipeExists(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const recipe = await recipeService.readById(req.params.recipeId);
		if (recipe) {
			next();
		} else {
			res.status(404).send({
				errors: [`Recipe ${req.params.recipeId} not found`],
			});
		}
	}

	async extractRecipeId(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		req.body.id = req.params.recipeId;
		next();
	}
}

export default new RecipesMiddleware();
