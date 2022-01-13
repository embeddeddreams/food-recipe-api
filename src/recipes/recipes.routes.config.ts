import { CommonRoutesConfig } from '../common/common.routes.config';
import RecipesController from './controllers/recipes.controller';
import RecipesMiddleware from './middleware/recipes.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

import express from 'express';

export class RecipesRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, 'RecipesRoutes');
	}

	configureRoutes(): express.Application {
		this.app
			.route(`/recipes`)
			.get(
				jwtMiddleware.validJWTNeeded,
				RecipesController.listRecipes
			)
			.post(
				body('authorDisplayName').isString().optional(),
				body('authorAvatarImageUrl').isString().optional(),
				body('authorId').isString().optional(),
				body('title').isString(),
				body('titleCustomized').isString().optional(),
				body('imageOriginalPath').isString().optional(),
				body('imageThumbnailPath').isString().optional(),
				body('recipeIngredient').isArray(),
				body('recipeInstruction').isArray(),
				body('description').isString(),
				body('label').isString().optional(),
				body('labelColor').isString().optional(),
				body('labelColorHexCode').isString().optional(),
				body('recipeCategory').isArray(),
				body('recipeMealType').isArray(),
				body('recipeCookType').isArray(),
				body('recipeSpecialCase').isArray(),
				body('recipeOrderTime').isInt(),
				body('recipePrepTime').isInt(),
				body('fromUsers').isBoolean().optional(),
				BodyValidationMiddleware.verifyBodyFieldsErrors,
				RecipesMiddleware.validateSameTitleDoesntExist,
				RecipesController.createRecipe
			);

		this.app
			.route(`/recipes/search`)
			.get(
				jwtMiddleware.validJWTNeeded,
				RecipesController.searchInRecipes
			);

		this.app.param(`recipeId`, RecipesMiddleware.extractRecipeId);
		this.app
			.route(`/recipes/:recipeId`)
			.all(
				RecipesMiddleware.validateRecipeExists,
				jwtMiddleware.validJWTNeeded
			)
			.get(RecipesController.getRecipeById)
			.delete(
				permissionMiddleware.onlyAuthorizedUserOrAdminCanDoThisAction,
				RecipesController.removeRecipe);

		this.app.put(`/recipes/:recipeId`, [
			body('authorDisplayName').isString(),
			body('authorAvatarImageUrl').isString(),
			body('authorId').isString(),
			body('title').isString(),
			body('titleCustomized').isString(),
			body('imageOriginalPath').isString(),
			body('imageThumbnailPath').isString(),
			body('recipeIngredient').isArray(),
			body('recipeInstruction').isArray(),
			body('description').isString(),
			body('label').isString(),
			body('labelColor').isString(),
			body('labelColorHexCode').isString(),
			body('recipeCategory').isArray(),
			body('recipeMealType').isArray(),
			body('recipeCookType').isArray(),
			body('recipeOrderTime').isInt(),
			body('recipePrepTime').isInt(),
			body('date').isDate(),
			body('recipeRatingOrderPoint').isInt({ min: 0, max: 5 }),
			body('viewCount').isInt(),
			body('favoriteCount').isInt(),
			body('fromUsers').isBoolean(),
			BodyValidationMiddleware.verifyBodyFieldsErrors,
			permissionMiddleware.onlyAuthorizedUserOrAdminCanDoThisAction,
			RecipesController.put,
		]);

		this.app.patch(`/recipes/:recipeId`, [
			body('authorDisplayName').isString().optional(),
			body('authorAvatarImageUrl').isString().optional(),
			body('authorId').isString().optional(),
			body('title').isString().optional(),
			body('titleCustomized').isString().optional(),
			body('imageOriginalPath').isString().optional(),
			body('imageThumbnailPath').isString().optional(),
			body('recipeIngredient').isArray().optional(),
			body('recipeInstruction').isArray().optional(),
			body('description').isString().optional(),
			body('label').isString().optional(),
			body('labelColor').isString().optional(),
			body('labelColorHexCode').isString().optional(),
			body('recipeCategory').isArray().optional(),
			body('recipeMealType').isArray().optional(),
			body('recipeCookType').isArray().optional(),
			body('recipeOrderTime').isInt().optional(),
			body('recipePrepTime').isInt().optional(),
			body('date').isDate().optional(),
			body('recipeRatingOrderPoint').isInt({ min: 0, max: 5 }).optional(),
			body('viewCount').isInt().optional(),
			body('favoriteCount').isInt().optional(),
			body('fromUsers').isBoolean().optional(),
			BodyValidationMiddleware.verifyBodyFieldsErrors,
			permissionMiddleware.onlyAuthorizedUserOrAdminCanDoThisAction,
			RecipesController.patch,
		]);

		return this.app;
	}
}
