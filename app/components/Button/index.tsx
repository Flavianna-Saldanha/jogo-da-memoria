"use client";

import { type StaticImageData } from "next/image";
import * as C from "./styles";

type Props = {
	label: string;
	icon?: StaticImageData;
	onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ label, icon, onClick }: Props) => {
	return (
		<C.Container onClick={onClick}>
			{icon && (
				<C.IconArea>
					<C.Icon src={icon.src} alt="Icon" />
				</C.IconArea>
			)}

			<C.Label>{label}</C.Label>
		</C.Container>
	);
};
