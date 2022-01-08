export interface PutRecipeDto {
	authorDisplayName: String;
	authorAvatarImageUrl: String;
	authorId: String;
	title: String;
	titleCustomized: String;
	imageOriginalPath: String;
	imageThumbnailPath: String;
	recipeIngredient: [String];
	recipeInstruction: [String];
	description: String;
	label: String;
	labelColor: String;
	labelColorHexCode: String;
	recipeCategory: [String];
	recipeMealType: [String];
	recipeCookType: [String];
	recipeOrderTime: String;
	recipePrepTime: String;
	date: Date;
	recipeRatingOrderPoint: Number;
	viewCount: Number;
	favoriteCount: Number;
	fromUsers: Boolean;
}
