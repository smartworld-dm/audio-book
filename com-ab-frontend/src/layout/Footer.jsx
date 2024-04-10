import { Box, Center, Text} from "@chakra-ui/react";

function Footer(){

    return (
        <Box className="App-footer" minH={20} p={4}>
            <Center>
                <Text>Copyright@2024 CommuneAi</Text>
            </Center>
        </Box>
    )
}

export default Footer;