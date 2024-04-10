import { Box, HStack, Heading, Image, Spacer } from "@chakra-ui/react";
import commune from "../assets/imgs/commune.webp";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useColorModeValue } from "@chakra-ui/react";
function Header(props) {

    const logoColor = useColorModeValue( 'orange.400','gray.50');

    return (
        <Box className="App-header" p={4} >
            <HStack>
                <Image src={commune} w={20}/>
                <Heading color={logoColor}>Audio Book</Heading>
                <Spacer/>
                <ThemeSwitcher justifySelf="flex-end"/>
            </HStack>
            
        </Box>
    )
}

export default Header;