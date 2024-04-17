import {
	Box,
	FormControl,
	FormHelperText,
	FormLabel,
	VStack,
	Input,
	Card,
	Container,
	InputGroup,
	InputRightElement,
	useColorModeValue,
	Text,
	Button,
	Link as ChakraLink,
	HStack,
	useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../providers/AuthProvider";
import axios from 'axios';

function Login() {
	const themeColor = useColorModeValue("orange.400", "orange.300");
	const toast = useToast();
    const navigate = useNavigate();
	const {login} = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [emailValid, setEmailValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const validEmailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

	const [showPwd, setShowPwd] = useState(false);
	const handleShowPassword = () => setShowPwd(!showPwd);

	const handleChangeEmail = (e) => {
		if (e.target.value && e.target.value.match(validEmailReg)) {
			setEmailValid(true);
			setEmail(e.target.value);
		} else {
			setEmailValid(false);
		}
	};

	const handleChangePwd = (e) => {
		setPwd(e.target.value);
	};

	const handleLogin = async () => {
		
		if (pwd.length === 0 || !emailValid) {
			console.log("Email and password must be valid for login");
			return;
		}

		const apiUrl = process.env.REACT_APP_API_URL;
		try {
			setIsLoading(true);
			const response = await axios.post(`${apiUrl}login`, {
				email,
				password: pwd,
			});

			if (response.data.success){
				navigate("/");
				toast({
					title: 'Login Success',
					description: `${response.data.message}.`,
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
                login({email, token: response.data.token})
			} else {
				toast({
					title: 'Login Error',
					description: `${response.data.message}. Please try again.`,
					status: 'error',
					duration: 3000,
					isClosable: true,
				});
			}
			setIsLoading(false);
				
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box
			className="App-login"
			alignItems={"center"}
			mt={8}
		>
			<Container w={"full"}>
				<Card
					w={420}
					maxW={420}
					p={4}
					m={"auto"}
				>
					<VStack spacing={4}>
						<Text
							color={themeColor}
							fontSize={24}
							fontWeight={700}
						>
							Login
						</Text>
						<FormControl isRequired>
							<FormLabel>Email</FormLabel>
							<Input
								type="Email"
								placeholder="Enter email"
								defaultValue={email}
								onChange={handleChangeEmail}
								{...(emailValid
									? { borderColor: "green.500" }
									: { borderColor: "red.500" })}
							/>
							{!emailValid ? (
								<FormHelperText color="red.500">
									Input valid email address
								</FormHelperText>
							) : (
								<></>
							)}
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type={showPwd ? "text" : "password"}
									placeholder="Enter password"
									defaultValue={pwd}
									onChange={handleChangePwd}
								/>
								<InputRightElement width="4.5rem">
									<Button
										h="1.75rem"
										size="sm"
										onClick={handleShowPassword}
									>
										{showPwd ? (
											<AiFillEye />
										) : (
											<AiFillEyeInvisible />
										)}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormHelperText>
								{/* <Link>Forgot Password</Link> */}
								{/* Set your password strong */}
							</FormHelperText>
						</FormControl>

						<Button
							colorScheme="orange"
							width="100%"
							onClick={handleLogin}
							isLoading={isLoading}
						>
							Login
						</Button>
						<HStack>
							<Text>Don't have an account?</Text>
							<ChakraLink
								as={ReactRouterLink}
								to="/register"
								_hover={{ color: themeColor }}
							>
								<Text>Register</Text>
							</ChakraLink>
						</HStack>
					</VStack>
				</Card>
			</Container>
		</Box>
	);
}

export default Login;
