export interface BlockHero {
	/** @primaryKey */
	id: string;
	translations?: BlockHeroTranslation[] | null;
}

export interface BlockHeroTranslation {
	/** @primaryKey */
	id: number;
	block_hero_id?: BlockHero | string | null;
	languages_code?: Language | string | null;
	headline?: string | null;
	text?: string | null;
	buttons?: Array<{ label: string; href: string }> | null;
	title?: string | null;
}

export interface BlockPage {
	/** @primaryKey */
	id: string;
	with_margin_bottom?: boolean | null;
	blocks?: BlockPageBlock[] | string[];
}

export interface BlockPageBlock {
	/** @primaryKey */
	id: number;
	block_page_id?: BlockPage | string | null;
	item?: BlockProject | BlockSvg | BlockParagraph | BlockProjectList | BlockPostList | string | null;
	collection?: string | null;
	sort?: number | null;
}

export interface BlockParagraph {
	/** @primaryKey */
	id: string;
	direction?: 'left' | 'right' | null;
	scroll_hint?: boolean | null;
	flow?: 'row' | 'col' | null;
	translations?: BlockParagraphTranslation[] | null;
}

export interface BlockParagraphTranslation {
	/** @primaryKey */
	id: number;
	block_paragraph_id?: BlockParagraph | string | null;
	languages_code?: Language | string | null;
	title?: string | null;
	text?: string | null;
	link_type?: 'url' | 'file' | null;
	link_file?: DirectusFile | string | null;
	link_url?: string | null;
	link_name?: string | null;
	figure_visible?: boolean | null;
	figure_svg?: 'computer' | 'companies' | 'chip' | 'camera' | null;
	figure_type?: 'svg' | 'image' | null;
	figure_image?: DirectusFile | string | null;
	figure_social?: boolean | null;
}

export interface BlockParagraphTranslationsFile {
	/** @primaryKey */
	id: number;
	block_paragraph_translations_id?: BlockParagraphTranslation | string | null;
	directus_files_id?: DirectusFile | string | null;
}

export interface BlockPost {
	/** @primaryKey */
	id: string;
	translations?: BlockPostTranslation[] | null;
}

export interface BlockPostList {
	/** @primaryKey */
	id: string;
	posts?: 'json' | null;
}

export interface BlockPostTranslation {
	/** @primaryKey */
	id: number;
	block_post_id?: BlockPost | string | null;
	languages_code?: Language | string | null;
	title?: string | null;
	info?: string | null;
	article?: string | null;
	published_on?: string | null;
	last_updated_on?: string | null;
}

export interface BlockProject {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	code_url?: string | null;
	/** @required */
	name: string;
	image?: DirectusFile | string | null;
	tags?: string[] | null;
	live_url?: string | null;
	list?: BlockProjectList | string | null;
	translations?: BlockProjectTranslation[] | null;
}

export interface BlockProjectList {
	/** @primaryKey */
	id: string;
	blocks?: BlockProjectListBlocks1[] | string[];
}

export interface BlockProjectListBlocks1 {
	/** @primaryKey */
	id: number;
	block_project_list_id?: BlockProjectList | string | null;
	item?: BlockProject | string | null;
	sort?: number | null;
	collection?: string | null;
}

export interface BlockProjectTranslation {
	/** @primaryKey */
	id: number;
	block_project_id?: BlockProject | string | null;
	languages_code?: Language | string | null;
	title?: string | null;
	description?: string | null;
}

export interface BlockSvg {
	/** @primaryKey */
	id: string;
	name?: string | null;
}

export interface Config {
	/** @primaryKey */
	id: number;
	index_page?: Page | string | null;
	navbar?: ConfigPage[] | string[];
}

export interface ConfigPage {
	/** @primaryKey */
	id: number;
	config_id?: Config | string | null;
	pages_id?: Page | string | null;
	sort?: number | null;
}

export interface Language {
	/** @primaryKey */
	code: string;
	name?: string | null;
	direction?: 'ltr' | 'rtl' | null;
	sort?: number | null;
}

export interface Page {
	/** @primaryKey */
	id: string;
	last_updated_at?: string;
	sort?: number | null;
	/** @required */
	icon_name: 'home' | 'folder' | 'camera' | 'book' | 'user';
	/** @required */
	name: string;
	translations?: PagesTranslation[] | null;
	blocks?: PagesBlock[] | string[];
	navbar?: ConfigPage[] | string[];
}

export interface PagesBlock {
	/** @primaryKey */
	id: number;
	pages_id?: Page | string | null;
	item?: BlockHero | BlockPage | BlockParagraph | BlockPost | string | null;
	sort?: number | null;
	collection?: string | null;
}

export interface PagesTranslation {
	/** @primaryKey */
	id: number;
	pages_id?: Page | string | null;
	languages_code?: Language | string | null;
	title?: string | null;
	sort?: number | null;
	/** @required */
	slug: string;
	image?: DirectusFile | string | null;
	description?: string | null;
	total_count_text?: string | null;
}

export interface DirectusAccess {
	/** @primaryKey */
	id: string;
	role?: DirectusRole | string | null;
	user?: DirectusUser | string | null;
	policy?: DirectusPolicy | string;
	sort?: number | null;
}

export interface DirectusActivity {
	/** @primaryKey */
	id: number;
	action?: string;
	user?: DirectusUser | string | null;
	timestamp?: string;
	ip?: string | null;
	user_agent?: string | null;
	collection?: string;
	item?: string;
	origin?: string | null;
	revisions?: DirectusRevision[] | string[];
}

export interface DirectusCollection {
	/** @primaryKey */
	collection: string;
	icon?: string | null;
	note?: string | null;
	display_template?: string | null;
	hidden?: boolean;
	singleton?: boolean;
	translations?: Array<{ language: string; translation: string; singular: string; plural: string }> | null;
	archive_field?: string | null;
	archive_app_filter?: boolean;
	archive_value?: string | null;
	unarchive_value?: string | null;
	sort_field?: string | null;
	accountability?: 'all' | 'activity' | null | null;
	color?: string | null;
	item_duplication_fields?: 'json' | null;
	sort?: number | null;
	group?: DirectusCollection | string | null;
	collapse?: string;
	preview_url?: string | null;
	versioning?: boolean;
}

export interface DirectusComment {
	/** @primaryKey */
	id: string;
	collection?: DirectusCollection | string;
	item?: string;
	comment?: string;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
}

export interface DirectusField {
	/** @primaryKey */
	id: number;
	collection?: DirectusCollection | string;
	field?: string;
	special?: string[] | null;
	interface?: string | null;
	options?: 'json' | null;
	display?: string | null;
	display_options?: 'json' | null;
	readonly?: boolean;
	hidden?: boolean;
	sort?: number | null;
	width?: string | null;
	translations?: 'json' | null;
	note?: string | null;
	conditions?: 'json' | null;
	required?: boolean | null;
	group?: DirectusField | string | null;
	validation?: 'json' | null;
	validation_message?: string | null;
	searchable?: boolean;
}

export interface DirectusFile {
	/** @primaryKey */
	id: string;
	storage?: string;
	filename_disk?: string | null;
	filename_download?: string;
	title?: string | null;
	type?: string | null;
	folder?: DirectusFolder | string | null;
	uploaded_by?: DirectusUser | string | null;
	created_on?: string;
	modified_by?: DirectusUser | string | null;
	modified_on?: string;
	charset?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	duration?: number | null;
	embed?: string | null;
	description?: string | null;
	location?: string | null;
	tags?: string[] | null;
	metadata?: 'json' | null;
	focal_point_x?: number | null;
	focal_point_y?: number | null;
	tus_id?: string | null;
	tus_data?: 'json' | null;
	uploaded_on?: string | null;
}

export interface DirectusFolder {
	/** @primaryKey */
	id: string;
	name?: string;
	parent?: DirectusFolder | string | null;
}

export interface DirectusMigration {
	/** @primaryKey */
	version: string;
	name?: string;
	timestamp?: string | null;
}

export interface DirectusPermission {
	/** @primaryKey */
	id: number;
	collection?: string;
	action?: string;
	permissions?: 'json' | null;
	validation?: 'json' | null;
	presets?: 'json' | null;
	fields?: string[] | null;
	policy?: DirectusPolicy | string;
}

export interface DirectusPolicy {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	ip_access?: string[] | null;
	enforce_tfa?: boolean;
	admin_access?: boolean;
	app_access?: boolean;
	permissions?: DirectusPermission[] | string[];
	users?: DirectusAccess[] | string[];
	roles?: DirectusAccess[] | string[];
}

export interface DirectusPreset {
	/** @primaryKey */
	id: number;
	bookmark?: string | null;
	user?: DirectusUser | string | null;
	role?: DirectusRole | string | null;
	collection?: string | null;
	search?: string | null;
	layout?: string | null;
	layout_query?: 'json' | null;
	layout_options?: 'json' | null;
	refresh_interval?: number | null;
	filter?: 'json' | null;
	icon?: string | null;
	color?: string | null;
}

export interface DirectusRelation {
	/** @primaryKey */
	id: number;
	many_collection?: string;
	many_field?: string;
	one_collection?: string | null;
	one_field?: string | null;
	one_collection_field?: string | null;
	one_allowed_collections?: string[] | null;
	junction_field?: string | null;
	sort_field?: string | null;
	one_deselect_action?: string;
}

export interface DirectusRevision {
	/** @primaryKey */
	id: number;
	activity?: DirectusActivity | string;
	collection?: string;
	item?: string;
	data?: 'json' | null;
	delta?: 'json' | null;
	parent?: DirectusRevision | string | null;
	version?: DirectusVersion | string | null;
}

export interface DirectusRole {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	parent?: DirectusRole | string | null;
	children?: DirectusRole[] | string[];
	policies?: DirectusAccess[] | string[];
	users?: DirectusUser[] | string[];
}

export interface DirectusSession {
	/** @primaryKey */
	token: string;
	user?: DirectusUser | string | null;
	expires?: string;
	ip?: string | null;
	user_agent?: string | null;
	share?: DirectusShare | string | null;
	origin?: string | null;
	next_token?: string | null;
}

export interface DirectusSettings {
	/** @primaryKey */
	id: number;
	project_name?: string;
	project_url?: string | null;
	project_color?: string;
	project_logo?: DirectusFile | string | null;
	public_foreground?: DirectusFile | string | null;
	public_background?: DirectusFile | string | null;
	public_note?: string | null;
	auth_login_attempts?: number | null;
	auth_password_policy?: null | `/^.{8,}$/` | `/(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*\\s).*$/` | null;
	storage_asset_transform?: 'all' | 'none' | 'presets' | null;
	storage_asset_presets?: Array<{ key: string; fit: 'contain' | 'cover' | 'inside' | 'outside'; width: number; height: number; quality: number; withoutEnlargement: boolean; format: 'auto' | 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif'; transforms: 'json' }> | null;
	custom_css?: string | null;
	storage_default_folder?: DirectusFolder | string | null;
	basemaps?: Array<{ name: string; type: 'raster' | 'tile' | 'style'; url: string; tileSize: number; attribution: string }> | null;
	mapbox_key?: string | null;
	module_bar?: 'json' | null;
	project_descriptor?: string | null;
	default_language?: string;
	custom_aspect_ratios?: Array<{ text: string; value: number }> | null;
	public_favicon?: DirectusFile | string | null;
	default_appearance?: 'auto' | 'light' | 'dark';
	default_theme_light?: string | null;
	theme_light_overrides?: 'json' | null;
	default_theme_dark?: string | null;
	theme_dark_overrides?: 'json' | null;
	report_error_url?: string | null;
	report_bug_url?: string | null;
	report_feature_url?: string | null;
	public_registration?: boolean;
	public_registration_verify_email?: boolean;
	public_registration_role?: DirectusRole | string | null;
	public_registration_email_filter?: 'json' | null;
	visual_editor_urls?: Array<{ url: string }> | null;
	project_id?: string | null;
	mcp_enabled?: boolean;
	mcp_allow_deletes?: boolean;
	mcp_prompts_collection?: string | null;
	mcp_system_prompt_enabled?: boolean;
	mcp_system_prompt?: string | null;
	project_owner?: string | null;
	project_usage?: string | null;
	org_name?: string | null;
	product_updates?: boolean | null;
	project_status?: string | null;
	ai_openai_api_key?: string | null;
	ai_anthropic_api_key?: string | null;
	ai_system_prompt?: string | null;
	ai_google_api_key?: string | null;
	ai_openai_compatible_api_key?: string | null;
	ai_openai_compatible_base_url?: string | null;
	ai_openai_compatible_name?: string | null;
	ai_openai_compatible_models?: Array<{ id: string; name: string; context: number; output: number; attachment: boolean; reasoning: boolean; providerOptions: Record<string, any> }> | null;
	ai_openai_compatible_headers?: Array<{ header: string; value: string }> | null;
	ai_openai_allowed_models?: Array<`gpt-4o-mini` | `gpt-4.1-nano` | `gpt-4.1-mini` | `gpt-4.1` | `gpt-5-nano` | `gpt-5-mini` | `gpt-5` | `gpt-5.2` | `gpt-5.2-chat-latest` | `gpt-5.2-pro` | `gpt-5.4` | `gpt-5.4-pro`> | null;
	ai_anthropic_allowed_models?: Array<`claude-haiku-4-5` | `claude-sonnet-4-5` | `claude-opus-4-5` | `claude-sonnet-4-6` | `claude-opus-4-6`> | null;
	ai_google_allowed_models?: Array<`gemini-3-pro-preview` | `gemini-3-flash-preview` | `gemini-2.5-pro` | `gemini-2.5-flash` | `gemini-3.1-pro-preview` | `gemini-3.1-flash-lite-preview` | `gemini-2.5-flash-lite`> | null;
	collaborative_editing_enabled?: boolean;
}

export interface DirectusUser {
	/** @primaryKey */
	id: string;
	first_name?: string | null;
	last_name?: string | null;
	email?: string | null;
	password?: string | null;
	location?: string | null;
	title?: string | null;
	description?: string | null;
	tags?: string[] | null;
	avatar?: DirectusFile | string | null;
	language?: string | null;
	tfa_secret?: string | null;
	status?: 'draft' | 'invited' | 'unverified' | 'active' | 'suspended' | 'archived';
	role?: DirectusRole | string | null;
	token?: string | null;
	last_access?: string | null;
	last_page?: string | null;
	provider?: string;
	external_identifier?: string | null;
	auth_data?: 'json' | null;
	email_notifications?: boolean | null;
	appearance?: null | 'auto' | 'light' | 'dark' | null;
	theme_dark?: string | null;
	theme_light?: string | null;
	theme_light_overrides?: 'json' | null;
	theme_dark_overrides?: 'json' | null;
	text_direction?: 'auto' | 'ltr' | 'rtl';
	policies?: DirectusAccess[] | string[];
}

export interface DirectusDashboard {
	/** @primaryKey */
	id: string;
	name?: string;
	icon?: string;
	note?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	color?: string | null;
	panels?: DirectusPanel[] | string[];
}

export interface DirectusPanel {
	/** @primaryKey */
	id: string;
	dashboard?: DirectusDashboard | string;
	name?: string | null;
	icon?: string | null;
	color?: string | null;
	show_header?: boolean;
	note?: string | null;
	type?: string;
	position_x?: number;
	position_y?: number;
	width?: number;
	height?: number;
	options?: 'json' | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusNotification {
	/** @primaryKey */
	id: number;
	timestamp?: string | null;
	status?: string | null;
	recipient?: DirectusUser | string;
	sender?: DirectusUser | string | null;
	subject?: string;
	message?: string | null;
	collection?: string | null;
	item?: string | null;
}

export interface DirectusShare {
	/** @primaryKey */
	id: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	role?: DirectusRole | string | null;
	password?: string | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	date_start?: string | null;
	date_end?: string | null;
	times_used?: number | null;
	max_uses?: number | null;
}

export interface DirectusFlow {
	/** @primaryKey */
	id: string;
	name?: string;
	icon?: string | null;
	color?: string | null;
	description?: string | null;
	status?: string;
	trigger?: string | null;
	accountability?: string | null;
	options?: 'json' | null;
	operation?: DirectusOperation | string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	operations?: DirectusOperation[] | string[];
}

export interface DirectusOperation {
	/** @primaryKey */
	id: string;
	name?: string | null;
	key?: string;
	type?: string;
	position_x?: number;
	position_y?: number;
	options?: 'json' | null;
	resolve?: DirectusOperation | string | null;
	reject?: DirectusOperation | string | null;
	flow?: DirectusFlow | string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusTranslation {
	/** @primaryKey */
	id: string;
	/** @required */
	language: string;
	/** @required */
	key: string;
	/** @required */
	value: string;
}

export interface DirectusVersion {
	/** @primaryKey */
	id: string;
	key?: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	hash?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
	delta?: 'json' | null;
}

export interface DirectusExtension {
	enabled?: boolean;
	/** @primaryKey */
	id: string;
	folder?: string;
	source?: string;
	bundle?: string | null;
}

export interface DirectusDeployment {
	/** @primaryKey */
	id: string;
	provider?: string;
	credentials?: string | null;
	options?: 'json' | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	webhook_ids?: 'json' | null;
	webhook_secret?: string | null;
	last_synced_at?: string | null;
	projects?: DirectusDeploymentProject[] | string[];
}

export interface DirectusDeploymentProject {
	/** @primaryKey */
	id: string;
	deployment?: DirectusDeployment | string;
	external_id?: string;
	name?: string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	url?: string | null;
	framework?: string | null;
	deployable?: boolean;
	runs?: DirectusDeploymentRun[] | string[];
}

export interface DirectusDeploymentRun {
	/** @primaryKey */
	id: string;
	project?: DirectusDeploymentProject | string;
	external_id?: string;
	target?: string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	status?: string | null;
	url?: string | null;
	started_at?: string | null;
	completed_at?: string | null;
}

export interface Schema {
	block_hero: BlockHero[];
	block_hero_translations: BlockHeroTranslation[];
	block_page: BlockPage[];
	block_page_blocks: BlockPageBlock[];
	block_paragraph: BlockParagraph[];
	block_paragraph_translations: BlockParagraphTranslation[];
	block_paragraph_translations_files: BlockParagraphTranslationsFile[];
	block_post: BlockPost[];
	block_post_list: BlockPostList[];
	block_post_translations: BlockPostTranslation[];
	block_project: BlockProject[];
	block_project_list: BlockProjectList[];
	block_project_list_blocks_1: BlockProjectListBlocks1[];
	block_project_translations: BlockProjectTranslation[];
	block_svg: BlockSvg[];
	config: Config;
	config_pages: ConfigPage[];
	languages: Language[];
	pages: Page[];
	pages_blocks: PagesBlock[];
	pages_translations: PagesTranslation[];
	directus_access: DirectusAccess[];
	directus_activity: DirectusActivity[];
	directus_collections: DirectusCollection[];
	directus_comments: DirectusComment[];
	directus_fields: DirectusField[];
	directus_files: DirectusFile[];
	directus_folders: DirectusFolder[];
	directus_migrations: DirectusMigration[];
	directus_permissions: DirectusPermission[];
	directus_policies: DirectusPolicy[];
	directus_presets: DirectusPreset[];
	directus_relations: DirectusRelation[];
	directus_revisions: DirectusRevision[];
	directus_roles: DirectusRole[];
	directus_sessions: DirectusSession[];
	directus_settings: DirectusSettings;
	directus_users: DirectusUser[];
	directus_dashboards: DirectusDashboard[];
	directus_panels: DirectusPanel[];
	directus_notifications: DirectusNotification[];
	directus_shares: DirectusShare[];
	directus_flows: DirectusFlow[];
	directus_operations: DirectusOperation[];
	directus_translations: DirectusTranslation[];
	directus_versions: DirectusVersion[];
	directus_extensions: DirectusExtension[];
	directus_deployments: DirectusDeployment[];
	directus_deployment_projects: DirectusDeploymentProject[];
	directus_deployment_runs: DirectusDeploymentRun[];
}

export enum CollectionNames {
	block_hero = 'block_hero',
	block_hero_translations = 'block_hero_translations',
	block_page = 'block_page',
	block_page_blocks = 'block_page_blocks',
	block_paragraph = 'block_paragraph',
	block_paragraph_translations = 'block_paragraph_translations',
	block_paragraph_translations_files = 'block_paragraph_translations_files',
	block_post = 'block_post',
	block_post_list = 'block_post_list',
	block_post_translations = 'block_post_translations',
	block_project = 'block_project',
	block_project_list = 'block_project_list',
	block_project_list_blocks_1 = 'block_project_list_blocks_1',
	block_project_translations = 'block_project_translations',
	block_svg = 'block_svg',
	config = 'config',
	config_pages = 'config_pages',
	languages = 'languages',
	pages = 'pages',
	pages_blocks = 'pages_blocks',
	pages_translations = 'pages_translations',
	directus_access = 'directus_access',
	directus_activity = 'directus_activity',
	directus_collections = 'directus_collections',
	directus_comments = 'directus_comments',
	directus_fields = 'directus_fields',
	directus_files = 'directus_files',
	directus_folders = 'directus_folders',
	directus_migrations = 'directus_migrations',
	directus_permissions = 'directus_permissions',
	directus_policies = 'directus_policies',
	directus_presets = 'directus_presets',
	directus_relations = 'directus_relations',
	directus_revisions = 'directus_revisions',
	directus_roles = 'directus_roles',
	directus_sessions = 'directus_sessions',
	directus_settings = 'directus_settings',
	directus_users = 'directus_users',
	directus_dashboards = 'directus_dashboards',
	directus_panels = 'directus_panels',
	directus_notifications = 'directus_notifications',
	directus_shares = 'directus_shares',
	directus_flows = 'directus_flows',
	directus_operations = 'directus_operations',
	directus_translations = 'directus_translations',
	directus_versions = 'directus_versions',
	directus_extensions = 'directus_extensions',
	directus_deployments = 'directus_deployments',
	directus_deployment_projects = 'directus_deployment_projects',
	directus_deployment_runs = 'directus_deployment_runs'
}