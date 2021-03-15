import PropTypes from 'prop-types'
import Buton from './Buton'
import {useLocation} from 'react-router-dom'
//import Button from './Button'

// one of the way to declare props
//const Header = (props) => {
//     return (
//         <header>
//             <h1>{props.title}</h1>
//         </header>
//     )
// }

const Header = ({title, toggleAdd, showAddTask}) => {
    const location = useLocation();
    return (
        <header className='header'>
         {/* Inlines styles
          <h1 style={{color:'red', backgroundColor: 'yellow'}}>{title}</h1>
           
           below css in JSstyles used as variable 
          <h1 style={headerStyles}>{title}</h1>*/}
          <h1>{title}</h1>
         {location.pathname === '/' &&  <Buton 
            color={showAddTask ? 'red' : 'green'}
            onClick={toggleAdd}
            text={showAddTask ? 'Close' : 'Add'} /> }
        </header>
    )
}

Header.defaultProps = {
    title:'Task Tracker',
}

Header.propTypes = {
    title : PropTypes.string.isRequired,
}

//styles in JS
// const headerStyles = {
//     color:'red', backgroundColor: 'green'
// }
export default Header
