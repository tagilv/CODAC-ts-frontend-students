// ** MUI Theme Provider
import { deepmerge } from '@mui/utils'
import { ThemeOptions } from '@mui/material'

// ** Type Import

// ** Theme Override Imports
import palette from './palette'
import spacing from './spacing'
import shadows from './shadows'
import breakpoints from './breakpoints'
import { Settings } from '../contexts/settingsContext'
import "@fontsource/vt323"

const themeOptions = (settings: Settings): ThemeOptions => {
  // ** Vars
  const { mode, themeName } = settings

  const themeConfig = {
    palette: palette(themeName),
    typography: {
      fontFamily: themeName === "gag" 
      ? [
        'VT323', 
        'monospace', 
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',') 
      : [
        'Inter',
        'sans-serif',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    },
    shadows: shadows(themeName),
    ...spacing,
    breakpoints: breakpoints(),
    shape: {
      borderRadius: themeName === "gag" ? 1 : 6,
    },
    mixins: {
      toolbar: {
        minHeight: 64
      }
    }
  }

  return themeConfig
  // return deepmerge(themeConfig, {
  //   palette: {
  //     primary: {
  //       ...themeConfig.palette['primary']
  //     }
  //   }
  // })
}

export default themeOptions
