"use client";

import Image from "next/image";
import * as C from "./Page.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/InfoItem";
import { Button } from "./components/Button";

const Page = () => {
	const resetAndCreateGrid = () => {
		// lógica para reiniciar o jogo
	};

	return (
		<C.Container>
			<C.Info>
				<C.LogoLink href="">
					<Image
						src={logoImage}
						width={200}
						alt="DevMemory"
						loading="eager"
					/>
				</C.LogoLink>

				<C.InfoArea>
					<InfoItem label="Tempo" value="00:00" />
					<InfoItem label="Movimentos" value="0" />
				</C.InfoArea>

				<Button
					label="Reiniciar"
					icon={RestartIcon}
					onClick={resetAndCreateGrid}
				/>
			</C.Info>

			<C.GridArea>
				...
			</C.GridArea>
		</C.Container>
	);
};

export default Page;
