declare module '*.scss' {
	const content: { [key: string]: any };
	export = content;
}

declare module '*.sass' {
	const content: { [key: string]: any };
	export = content;
}

declare module '*.svg' {
	const content: string;
	export = content;
}

declare module '*.png';
