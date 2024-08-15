import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import ErrorText from './ui/error-text';

interface InputFieldProps {
	label: string;
	id: string;
	name: string;
	type: React.HTMLInputTypeAttribute;
	registerFn: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
}

export default function InputField({
	label,
	id,
	registerFn,
	name,
	type,
	errors,
}: InputFieldProps) {
	return (
		<div className='flex flex-col gap-1'>
			<Label htmlFor={id}>{label}</Label>
			<Input
				type={type}
				{...registerFn(name)}
				className='bg-dark-200 text-dark-500'
				id={id}
			/>
			{errors[name] && errors[name].message && (
				<ErrorText message={errors[name].message?.toString()} />
			)}
		</div>
	);
}
