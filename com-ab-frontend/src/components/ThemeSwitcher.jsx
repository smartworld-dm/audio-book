import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

function ThemeSwitcher() {
	const { toggleColorMode } = useColorMode();
	const modeText = useColorModeValue("Light", "Dark");
	return (
		<IconButton
			size={"sm"}
			onClick={toggleColorMode}
			icon={useColorModeValue(<FaSun />, <FaMoon />)}
			aria-label={`Switch to ${modeText} Mode`}
			color={"current"}
		/>
	);
}

export default ThemeSwitcher;
