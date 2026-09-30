import Image from 'next/image';
import * as C from './Page.styles';
import logoImage from './assets/devmemory_logo.png'

const Page = () => {
	return (
		<C.Container>
			<C.Info>
				<C.LogoLink href="">
					<Image 
						src={logoImage}
						width="200"
						height="200"
						alt=""
					/>
				</C.LogoLink>

				<C.InfoArea>
					...
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