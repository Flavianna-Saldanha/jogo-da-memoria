
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
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

const createGrid = (): GridItemType[] => {
	const tmpGrid: GridItemType[] = [];

	for(let i = 0; i < (items.length * 2); i++) {
		tmpGrid.push({
			item: null,
			shown: false,
			permanentShown: false
		});
	}

	for(let w = 0; w < 2; w++) {
		for(let i = 0; i < items.length; i++) {
			let pos = -1;

			while(pos < 0 || tmpGrid[pos].item !== null) {
				pos = Math.floor(Math.random() * (items.length * 2));
			}

			tmpGrid[pos].item = i;
		}
	}

	return tmpGrid;
};

const Page = () => {
	const [playing, setPlaying] = useState<boolean>(true);
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	const [moveCount, setMoveCount] = useState<number>(0);
	const [shownCount, setShownCount] = useState<number>(0);
	const [gridItems, setGridItems] = useState<GridItemType[]>(() => createGrid());

	const resetAndCreateGrid = () => {
		setTimeElapsed(0);
		setMoveCount(0);
		setShownCount(0);
		setGridItems(createGrid());
		setPlaying(true);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			if(playing) {
				setTimeElapsed(prev => prev + 1);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [playing]);

	useEffect(() => {
		if(shownCount === 2) {
			const opened = gridItems.filter(item => item.shown === true);

			if(opened.length === 2) {

				if(opened[0].item === opened[1].item) {
					const tmpGrid = [...gridItems];

					for(const i in tmpGrid) {
						if(tmpGrid[i].shown) {
							tmpGrid[i].permanentShown = true;
							tmpGrid[i].shown = false;
						}
					}

					const finished = tmpGrid.every(
						item => item.permanentShown === true
					);

					const timeout = setTimeout(() => {
						setGridItems(tmpGrid);
						setShownCount(0);
						setMoveCount(moveCount => moveCount + 1);

						if(finished) {
							setPlaying(false);
						}
					}, 0);

					return () => clearTimeout(timeout);

				} else {
					const timeout = setTimeout(() => {
						const tmpGrid = [...gridItems];

						for(const i in tmpGrid) {
							tmpGrid[i].shown = false;
						}

						setGridItems(tmpGrid);
						setShownCount(0);
						setMoveCount(moveCount => moveCount + 1);
					}, 900);

					return () => clearTimeout(timeout);
				}
			}
		}
	}, [shownCount, gridItems]);

	const handleItemClick = (index: number) => {
		if(playing && index !== null && shownCount < 2) {
			const tmpGrid = [...gridItems];

			if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
				tmpGrid[index].shown = true;
				setShownCount(shownCount + 1);
			}

			setGridItems(tmpGrid);
		}
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
					<InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
					<InfoItem label="Movimentos" value={moveCount.toString()} />
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
