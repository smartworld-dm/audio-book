import {
	Box,
	FormControl,
	FormHelperText,
	FormLabel,
	VStack,
	HStack,
	Input,
	Card,
	Container,
	InputGroup,
	InputRightElement,
	useColorModeValue,
	Text,
	Button,
	Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Register() {
	const themeColor = useColorModeValue("orange.400", "orange.300");

	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [pwdConfirm, setPwdConfirm] = useState("");
	const [emailValid, setEmailValid] = useState(false);

	const validEmailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

	const [showPwd, setShowPwd] = useState(false);
	const [showPwdConfirm, setShowPwdConfirm] = useState(false);
	const handleShowPassword = () => setShowPwd(!showPwd);
	const handleShowPasswordConfirm = () => setShowPwdConfirm(!showPwdConfirm);

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

	const handleChangePwdConfirm = (e) => {
		setPwdConfirm(e.target.value);
	};

	const handleSignUp = () => {
		console.log(email);
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
							Register
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
							<FormHelperText>
								We'll never share your email.
							</FormHelperText>
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
								Set your password strong
							</FormHelperText>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Confirm Password</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type={showPwd ? "text" : "password"}
									placeholder="Enter password"
									defaultValue={pwdConfirm}
									onChange={handleChangePwdConfirm}
								/>
								<InputRightElement width="4.5rem">
									<Button
										h="1.75rem"
										size="sm"
										onClick={handleShowPasswordConfirm}
									>
										{showPwdConfirm ? (
											<AiFillEye />
										) : (
											<AiFillEyeInvisible />
										)}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormHelperText>
								{/* <Link>Forgot Password</Link> */}
								Confirm your password
							</FormHelperText>
						</FormControl>

						<Button
							colorScheme="orange"
							width="100%"
							onClick={handleSignUp}
						>
							Sign Up
						</Button>

						<HStack>
							<Text>Already have an account?</Text>
							<ChakraLink
								as={ReactRouterLink}
								to="/login"
								_hover={{ color: themeColor }}
							>
								<Text>Login</Text>
							</ChakraLink>
						</HStack>
					</VStack>
				</Card>
			</Container>
		</Box>
	);
}

export default Register;
