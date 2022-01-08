import mongooseService from '../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';
import { CreateRecipeDto } from '../dto/create.recipe.dto';
import { PatchRecipeDto } from '../dto/patch.recipe.dto';
import { PutRecipeDto } from '../dto/put.recipe.dto';

const log: debug.IDebugger = debug('app:recipes-dao');

class RecipesDao {
	Schema = mongooseService.getMongoose().Schema;

	recipeSchema = new this.Schema({
		_id: String,
		authorDisplayName: String,
		authorAvatarImageUrl: String,
		authorId: String,
		title: String,
		titleCustomized: String,
		imageOriginalPath: String,
		imageThumbnailPath: String,
		recipeIngredient: [String],
		recipeInstruction: [String],
		description: String,
		label: String,
		labelColor: String,
		labelColorHexCode: String,
		recipeCategory: [String],
		recipeMealType: [String],
		recipeCookType: [String],
		recipeOrderTime: Number,
		recipePrepTime: Number,
		date: { type: Date, default: Date.now },
		recipeRatingOrderPoint: { type: Number, default: 0 },
		viewCount: { type: Number, default: 0 },
		favoriteCount: { type: Number, default: 0 },
		fromUsers: { type: Boolean, default: false },
	}, { _id: false });

	Recipe = mongooseService.getMongoose().model('Recipes', this.recipeSchema);

	constructor() {
		log('Created new instance of RecipesDao');
	}

	async addRecipe(recipeFields: any) {
		const recipeId = shortid.generate();
		const recipe = new this.Recipe({
			_id: recipeId,
			...recipeFields,
		});
		await recipe.save();
		return recipeId;
	}

	async getRecipeByAuthorId(authorId: string) {
		return this.Recipe.find({ authorId: authorId }).exec();
	}

	async getRecipeById(recipeId: string) {
		return this.Recipe.findOne({ _id: recipeId }).populate('Recipe').exec();
	}

	async getRecipeByExactTitle(title: string) {
		return this.Recipe.findOne({ title: title }).exec();
	}

	async removeRecipeById(recipeId: string) {
		return this.Recipe.deleteOne({ _id: recipeId }).exec();
	}

	async getRecipes(limit = 10, page = 0) {
		return this.Recipe.find()
			.limit(limit)
			.skip(limit * page)
			.exec();
	}

	async getRecipesBySearchKey(searchKey: string, limit = 10, page = 0) {
		return this.Recipe.find(
			{ $text: { $search: searchKey } },
			{ score: { $meta: "textScore" } }
		).sort({ score: { $meta: "textScore" } })
			.limit(limit)
			.skip(limit * page)
			.exec();
	}

	async updateRecipeById(
		recipeId: string,
		recipeFields: PatchRecipeDto | PutRecipeDto
	) {
		const existingRecipe = await this.Recipe.findOneAndUpdate(
			{ _id: recipeId },
			{ $set: recipeFields },
			{ new: true }
		).exec();

		return existingRecipe;
	}
}

export default new RecipesDao();
