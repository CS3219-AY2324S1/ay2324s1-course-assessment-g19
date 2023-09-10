import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface TextAreaProps {
	id: string;
	label: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
	id,
	label,
	disabled,
	formatPrice,
	required,
	register,
	errors,
}) => {
	return (
		<div className="w-full relative">
			{formatPrice && (
				<BiDollar
					size={22}
					className="
            text-neutral-700
            absolute
            top-5
            left-3
          "
				/>
			)}
			<textarea
				id={id}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=" "
				className={`
          peer
          w-full
          h-[200px]
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
					text-left
					align-top
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
			/>
			<label
				className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
					${label ? 'scale-75' : 'scale-100'}
					${label ? '-translate-y-4' : 'translate-y-0'}
          ${formatPrice ? 'left-9' : 'left-4'}
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
			>
				{label}
			</label>
		</div>
	);
};

export default TextArea;
