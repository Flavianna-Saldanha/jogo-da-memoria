"use client";

import Image from "next/image";
import * as C from "./Page.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/InfoItem";
import { Button } from "./components/Button";
import { useEffect, useState } from "react";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { GridItem } from "./components/GridItem";

const Page = () => {
	const [playing, setPlaying] = useState<boolean>(false);
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	const [moveCount, setMoveCount] = useState<number>(0);
	const [shownCount, setShownCount] = useState<number>(0);
	const [gridItems, setGridItems] = useState<GridItemType[]>([]);

	const resetAndCreateGrid = () => {
		setTimeElapsed(0);
		setMoveCount(0);
		setShownCount(0);
		
		// eslint-disable-next-line prefer-const
		let tmpGrid: GridItemType[] = [];
		for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
				item: null,
				shown: false,
				permanentShown: false
			});

		for(let w = 0; w < 2; w++) {
			for(let i = 0; i < items.length; i++) {
					let pos = -1;
				while(pos < 0 || tmpGrid[pos].item !== null) {
					pos = Math.floor(Math.random() * (items.length * 2));
				}
				tmpGrid[pos].item = i;
			}
		}

		setGridItems(tmpGrid);

		setPlaying(true);
	};

	useEffect(() => resetAndCreateGrid(), []);

	const handleItemClick = (index: number) => {
		
	}

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
				<C.Grid>
					{gridItems.map((item, index) => (
						<GridItem 
							key={index}
							item={item}
							onClick={() => handleItemClick(index)}
						/>
					))}
				</C.Grid>
			</C.GridArea>
		</C.Container>
	);
};

export default Page;