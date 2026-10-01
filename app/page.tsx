import Image from 'next/image';
import * as C from './Page.styles';
import logoImage from './assets/devmemory_logo.png';
import { InfoItem } from './components/InfoItem';

const Page = () => {
	return (
		<C.Container>
			<C.Info>
				<C.LogoLink href="">
					<Image 
						src={logoImage}
						width="200"
						alt="DevMemory"
						loading="eager"
					/>
				</C.LogoLink>

				<C.InfoArea>
					<InfoItem label="Tempo" value="00:00" />
					<InfoItem label="Movimentos" value="0" />
				</C.InfoArea>

				<button>Reiniciar</button>
			</C.Info>
			<C.GridArea>
				...
			</C.GridArea>
		</C.Container>
	);
}

export default Page;