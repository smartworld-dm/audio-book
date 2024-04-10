import {
	Box,
	HStack,
	Heading,
	Image,
	Link as ChakraLink,
	Spacer,
	Text,
	Button,
	Circle,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import commune from "../assets/imgs/commune.webp";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Header(props) {
	const logoColor = useColorModeValue("orange.400", "gray.50");
	const userIcon = useColorModeValue(<FaUser />, <FaUser />);
	const themeColor = useColorModeValue("orange.400", "orange.300");
	const theme2Color = useColorModeValue("orange.500", "orange.200");
	const navigate = useNavigate();

	const handleLogin = () => {
		console.log('login')
		navigate('/login');
	}

	return (
		<Box
			className="App-header"
			p={4}
		>
			<HStack>
				<HStack>
					<Image
						src={commune}
						w={20}
					/>
					<ChakraLink
						as={ReactRouterLink}
						to="/"
						color={logoColor}
						_hover={{color: themeColor}}
					>
						<Heading>Audio Book</Heading>
					</ChakraLink>
				</HStack>
				<Spacer />
				<HStack spacing={4}>
					<ChakraLink
						as={ReactRouterLink}
						to="/books"
						_hover={{ color: themeColor }}
					>
						<Text fontSize={18} fontWeight={600}>My Books</Text>
					</ChakraLink>
					<Button
						leftIcon={userIcon}
						size={"sm"}
						colorScheme="orange"
						onClick={handleLogin}
					>
						Login
					</Button>

					<Box>
						<HStack>
							<Circle bg={theme2Color} w={30} h={30} border={'1px'} borderColor={themeColor}>
								<Image src={commune}/>
							</Circle>
							<Text>cool089877</Text>
						</HStack>
					</Box>
				</HStack>

				<ThemeSwitcher justifySelf="flex-end" />
			</HStack>
		</Box>
	);
}

export default Header;
