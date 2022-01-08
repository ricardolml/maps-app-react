
import logoReact from '../logo.svg';

export const ReactLogo = () => {
    return (
        <img src={logoReact} alt="React Logo" style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '130px'
        }}/>
    )
}

export default ReactLogo;