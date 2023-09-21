export type Modal<T> = {
	isOpen: boolean;
	data?: T;
};

export type Question = {
	id: string;
	title: string;
	description: string;
	category: string;
	complexity: string;
};

export type StatusType = 'DEFAULT' | 'LOADING' | 'SUCCESS' | 'ERROR';