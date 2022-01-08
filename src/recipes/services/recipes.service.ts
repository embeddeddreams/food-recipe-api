import RecipesDao from '../daos/recipes.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateRecipeDto } from '../dto/create.recipe.dto';
import { PutRecipeDto } from '../dto/put.recipe.dto';
import { PatchRecipeDto } from '../dto/patch.recipe.dto';

class RecipesService implements CRUD {
	async create(resource: any) {
		return RecipesDao.addRecipe(resource);
	}

	async deleteById(id: string): Promise<any> {
		return RecipesDao.removeRecipeById(id);
	}

	async list(limit: number, page: number) {
		return RecipesDao.getRecipes(limit, page);
	}

	async search(searchKey: string, limit: number, page: number) {
		return RecipesDao.getRecipesBySearchKey(searchKey, limit, page);
	}

	async patchById(id: string, resource: PatchRecipeDto): Promise<any> {
		return RecipesDao.updateRecipeById(id, resource);
	}

	async putById(id: string, resource: PutRecipeDto): Promise<any> {
		return RecipesDao.updateRecipeById(id, resource);
	}

	async readById(id: string) {
		return RecipesDao.getRecipeById(id);
	}

	async getRecipeByAuthorId(authorId: string) {
		return RecipesDao.getRecipeByAuthorId(authorId);
	}

	async getRecipeByExactTitle(title: string) {
		return RecipesDao.getRecipeByExactTitle(title);
	}
}

export default new RecipesService();
