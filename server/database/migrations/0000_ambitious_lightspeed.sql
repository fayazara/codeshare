CREATE TABLE `snippets` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`language` text DEFAULT 'plaintext' NOT NULL,
	`created_at` integer NOT NULL
);
