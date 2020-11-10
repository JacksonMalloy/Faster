import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  /* source-sans-pro-200 - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 200;
    src: url('../fonts/source-sans-pro-v13-latin-200.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro ExtraLight'), local('SourceSansPro-ExtraLight'),
         url('../fonts/source-sans-pro-v13-latin-200.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../fonts/source-sans-pro-v13-latin-200.woff2') format('woff2'), /* Super Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-200.woff') format('woff'), /* Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-200.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-200.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-200italic - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: italic;
    font-weight: 200;
    src: url('../fonts/source-sans-pro-v13-latin-200italic.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro ExtraLight Italic'), local('SourceSansPro-ExtraLightItalic'),
         url('../fonts/source-sans-pro-v13-latin-200italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../fonts/source-sans-pro-v13-latin-200italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-200italic.woff') format('woff'), /* Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-200italic.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-200italic.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-300 - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 300;
    src: url('../fonts/source-sans-pro-v13-latin-300.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro Light'), local('SourceSansPro-Light'),
         url('../fonts/source-sans-pro-v13-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         /* url('../fonts/source-sans-pro-v13-latin-300.woff2') format('woff2'),  */
         /* url('../fonts/source-sans-pro-v13-latin-300.woff') format('woff'), /* Modern Browsers */
         /* url('../fonts/source-sans-pro-v13-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-300.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-300italic - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: italic;
    font-weight: 300;
    src: url('../fonts/source-sans-pro-v13-latin-300italic.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro Light Italic'), local('SourceSansPro-LightItalic'),
         url('../fonts/source-sans-pro-v13-latin-300italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../fonts/source-sans-pro-v13-latin-300italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-300italic.woff') format('woff'), /* Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-300italic.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-300italic.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-italic - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: italic;
    font-weight: 400;
    src: url('../fonts/source-sans-pro-v13-latin-italic.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro Italic'), local('SourceSansPro-Italic'),
         url('../fonts/source-sans-pro-v13-latin-italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../fonts/source-sans-pro-v13-latin-italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-italic.woff') format('woff'), /* Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-italic.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-italic.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-regular - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    src: url('../fonts/source-sans-pro-v13-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
         url('../fonts/source-sans-pro-v13-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         /* url('../fonts/source-sans-pro-v13-latin-regular.woff2') format('woff2'), Super Modern Browsers */
         /* url('../fonts/source-sans-pro-v13-latin-regular.woff') format('woff'),  */
         /* url('../fonts/source-sans-pro-v13-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-regular.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-600 - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 600;
    src: url('../fonts/source-sans-pro-v13-latin-600.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro SemiBold'), local('SourceSansPro-SemiBold'),
         url('../fonts/source-sans-pro-v13-latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../fonts/source-sans-pro-v13-latin-600.woff2') format('woff2'), /* Super Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-600.woff') format('woff'), /* Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-600.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-600italic - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: italic;
    font-weight: 600;
    src: url('../fonts/source-sans-pro-v13-latin-600italic.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro SemiBold Italic'), local('SourceSansPro-SemiBoldItalic'),
         url('../fonts/source-sans-pro-v13-latin-600italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../fonts/source-sans-pro-v13-latin-600italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-600italic.woff') format('woff'), /* Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-600italic.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-600italic.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-700 - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    src: url('../fonts/source-sans-pro-v13-latin-700.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
         url('../fonts/source-sans-pro-v13-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         /* url('../fonts/source-sans-pro-v13-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
         /* url('../fonts/source-sans-pro-v13-latin-700.woff') format('woff'), /* Modern Browsers */
         /* url('../fonts/source-sans-pro-v13-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-700.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-700italic - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: italic;
    font-weight: 700;
    src: url('../fonts/source-sans-pro-v13-latin-700italic.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro Bold Italic'), local('SourceSansPro-BoldItalic'),
         url('../fonts/source-sans-pro-v13-latin-700italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../fonts/source-sans-pro-v13-latin-700italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-700italic.woff') format('woff'), /* Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-700italic.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-700italic.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-900italic - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: italic;
    font-weight: 900;
    src: url('../fonts/source-sans-pro-v13-latin-900italic.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro Black Italic'), local('SourceSansPro-BlackItalic'),
         url('../fonts/source-sans-pro-v13-latin-900italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('../fonts/source-sans-pro-v13-latin-900italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-900italic.woff') format('woff'), /* Modern Browsers */
         url('../fonts/source-sans-pro-v13-latin-900italic.ttf') format('truetype'), /* Safari, Android, iOS */
         url('../fonts/source-sans-pro-v13-latin-900italic.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }
  /* source-sans-pro-900 - latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 900;
    src: url('../fonts/source-sans-pro-v13-latin-900.eot'); /* IE9 Compat Modes */
    src: local('Source Sans Pro Black'), local('SourceSansPro-Black'),
         url('../fonts/source-sans-pro-v13-latin-900.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         /* url('../fonts/source-sans-pro-v13-latin-900.woff2') format('woff2'),  */
         /*url('../fonts/source-sans-pro-v13-latin-900.woff') format('woff'),  Modern Browsers */
         /* url('../fonts/source-sans-pro-v13-latin-900.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../fonts/source-sans-pro-v13-latin-900.svg#SourceSansPro') format('svg'); /* Legacy iOS */
  }

  /* Include padding and border in all elements' total width and height. */
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
  }

  html {
    min-height: 100%;
  }

  h1 {
    font-weight: 900;
    letter-spacing: 0.001rem;
    font-size: 3rem;
    text-align: center;
  }

  a, u {
    color: black;
    text-decoration: none;
  }

  body {
    min-height: 100%;
  }

  #__next {
    min-height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  /* Make clicks pass-through */
#nprogress {
  pointer-events: none;
  z-index: 99;
}
/*
#nprogress .bar {
  background: #29d;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 50px;

  width: 100%;
  height: 5px;
} */

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #000000;
  border-left-color: #000000;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`
