import React from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import VoiceList from "./VoiceList";
import Sections from "./Sections";

function EditorSidebar(props) {
	return (
		<Box w={'full'} pl={0} pt={4}>
			<Tabs variant='colorful' align='center' isFitted colorScheme="orange">
                <TabList>
                    <Tab>
                        Sections
                    </Tab>
                    <Tab >
                        Voices
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Sections saveBook={props.saveBook}/>
                    </TabPanel>
                    <TabPanel>
                        <VoiceList/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
		</Box>
	);
}

export default EditorSidebar;
