import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
// import printMe from './print.js'

const Header = styled.h1`
    color: red;
`

const Main = (<Header>Markdown Editor</Header>)

render(Main, document.getElementById('app'))

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         printMe();
//     })
// }