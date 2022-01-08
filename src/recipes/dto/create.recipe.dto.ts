export interface CreateRecipeDto {
	title: String;
	titleCustomized?: String;
	authorDisplayName?: String;
	authorAvatarImageUrl?: String;
	authorId?: String;
	imageOriginalPath?: String;
	imageThumbnailPath?: String;
	recipeIngredient: [String];
	recipeInstruction: [String];
	description: String;
	label?: String;
	labelColor?: String;
	labelColorHexCode?: String;
	recipeCategory: [String];
	recipeMealType: [String];
	recipeCookType: [String];
	recipeOrderTime: String;
	recipePrepTime: String;
	fromUsers?: Boolean;
}
