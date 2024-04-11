import React from "react";
import {
	Box,
	HStack,
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
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function Header() {
	const logoColor = useColorModeValue("orange.400", "gray.50");
	const userIcon = useColorModeValue(<FaUser />, <FaUser />);
	const themeColor = useColorModeValue("orange.400", "orange.300");
	const theme2Color = useColorModeValue("orange.500", "orange.200");
	const profileColor = useColorModeValue("gray.100", "blue.900");
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/login");
	};

	return (
		<Box
			className="App-header"
			py={4}
			px={20}
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
						_hover={{ color: themeColor }}
					>
						<Text fontSize={24} fontWeight={800}>AudioBook</Text>
					</ChakraLink>
				</HStack>
				<Spacer />
				<HStack spacing={4}>
					<ChakraLink
						as={ReactRouterLink}
						to="/books"
						_hover={{ color: themeColor }}
					>
						<Text
							fontSize={18}
							fontWeight={600}
						>
							My Books
						</Text>
					</ChakraLink>
					{!user && (
						<Button
							leftIcon={userIcon}
							size={"sm"}
							colorScheme="orange"
							onClick={handleLogin}
						>
							Login
						</Button>
					)}

					{user && user.email ? (
						<Box>
							<HStack>
								<Circle
									bg={theme2Color}
									w={'40px'}
									h={'40px'}
									border={"1px"}
									borderColor={themeColor}
								>
									{/* <Image src={commune} /> */}
									<Text fontWeight={700} fontSize={20} color={profileColor}>{user.email.toUpperCase()[0]}</Text>
								</Circle>
								<Button colorScheme="orange" variant={'ghost'} onClick={()=>logout()}>Log out</Button>
							</HStack>
						</Box>
					) : (
						<></>
					)}
				</HStack>

				<ThemeSwitcher justifySelf="flex-end" />
			</HStack>
		</Box>
	);
}

export default Header;
