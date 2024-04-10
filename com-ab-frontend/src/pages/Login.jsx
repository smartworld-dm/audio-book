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
	Link,
} from "@chakra-ui/react";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
	const themeColor = useColorModeValue("orange.400", "orange.300");

	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [emailValid, setEmailValid] = useState(false);

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
    }

	const handleLogin = () => {
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

						<Button
							colorScheme="orange"
							width="100%"
							onClick={handleLogin}
						>
							Login
						</Button>
					</VStack>
				</Card>
			</Container>
		</Box>
	);
}

export default Login;
