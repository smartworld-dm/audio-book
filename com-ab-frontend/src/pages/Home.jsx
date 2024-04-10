import { Box, VStack, Text, Image, Button } from "@chakra-ui/react";
import audiobook from "../assets/imgs/audiobook.webp";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    return (
        <Box>
            <VStack>
                <Image src={audiobook}/>
                <Text fontSize={24} align={'center'}>You can get your favorite books in audio format here</Text>
                <Button colorScheme="orange" onClick={()=>navigate('/edit')}>Get Started</Button>
            </VStack>
        </Box>
    )
}

export default Home;

