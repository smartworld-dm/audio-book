import { extendTheme } from '@chakra-ui/react'
import { tabsTheme } from './tabTheme'

const theme = extendTheme({
  components: {
    Tabs: tabsTheme,
  },
})

export default theme