import { createGlobalStyle } from 'styled-components';
/*
    221115 선우
    공통으로 적용되는 스타일은 여기에 기재.
    현재 css 초기화만 적용되어있음.
*/
const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }
  
    li {
        list-style: none;
    }
  
    a {
        text-decoration: none;
        color: black;
        cursor: pointer;
    }
    
    img {
        border: 0;
    }
    
    ul {
        padding-left: 0px;
    }
    
    section {
        height: auto;
    }
    .updownSpace{
        width:100%;
        height:20px;
    }
`;
export default GlobalStyles;
