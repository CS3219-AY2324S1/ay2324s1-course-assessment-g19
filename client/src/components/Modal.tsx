import { useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from './Button';

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}) => {
	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}

		onClose();
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}

		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}

		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div
				className="
          justify-center
          items-center
          flex
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
        "
			>
				<div
					className="
            relative
            w-full
            md:w-2xl
            lg:w-2xl
            xl:w-2xl
						max-w-2xl
            my-6
            mx-auto
						h-full
						lg:h-auto
						md:h-auto
					"
				>
					{/* CONTENT */}
					<div
						className={`
              translate
							transition
              duration-500
              h-full
              ${isOpen ? 'transform scale-x-100' : 'transform -scale-x-50'}
              ${isOpen ? 'opacity-100' : 'opacity-0'}
            `}
					>
						<div
							className={`
                translate
            		h-full
								lg:h-auto
								md:h-auto
								lg:max-h-[90vh]
								md:max-h-[90vh]
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
							`}
						>
							{/* HEADER */}
							<div
								className="
                  flex
                  items-center
                  p-6
                  rounded-tgg
                  justify-center
                  relative
                  border-b-[1px]
                "
							>
								<button
									onClick={handleClose}
									className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
								>
									<IoMdClose size={18} />
								</button>
								<div className="text-lg font-semibold">{title}</div>
							</div>
							{/* BODY */}
							<div className="relative flex-auto overflow-y-auto p-8">
								{body}
							</div>
							{/* FOOTER */}
							<div className="flex flex-col gap-2 p-6 border-t-[1px]">
								<div
									className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  "
								>
									{secondaryAction && secondaryActionLabel && (
										<Button
											outline
											disabled={disabled}
											label={secondaryActionLabel}
											onClick={handleSecondaryAction}
										/>
									)}
									<Button
										disabled={disabled}
										label={actionLabel}
										onClick={handleSubmit}
									/>
								</div>
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
