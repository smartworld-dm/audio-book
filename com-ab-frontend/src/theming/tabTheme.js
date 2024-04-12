import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

// define the base component styles
const colorfulVariant  = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    // define the part you're going to style
    tab: {
      fontWeight: 'semibold', // change the font weight
      borderColor: 'transparent',
      // bg: mode(`${c}.300`, `${c}.600`)(props),
      border: '1px solid',
      borderLeftWidth: '0px',
      borderRightWidth: '0px',
      borderTopWidth: '0px',
      borderBottomColor: mode(`${c}.400`, `${c}.300`)(props),
      _selected: {
        color: mode(`${c}.400`, `${c}.300`)(props),
        border: '1px solid',
        borderTopRadius: 'lg',
        borderBottomWidth: '0px'
      },
    },
    tabpanel: {
      // fontFamily: 'mono', // change the font family
    },
  }
})

const variants = {
  colorful: colorfulVariant ,
}

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ variants })