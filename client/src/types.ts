export type Modal<T> = {
	isOpen: boolean;
	data?: T;
};

export type Question = {
	id: number;
	title: string;
	description: string;
	category: string;
	complexity: string;
};
