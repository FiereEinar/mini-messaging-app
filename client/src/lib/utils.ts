import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function removeWhitespace(string: string): string {
	return string.replace(/\s/g, '');
}

export function isDateEqual(date1: Date, date2: Date): boolean {
	return date1.toString().split('T')[0] === date2.toString().split('T')[0];
}
