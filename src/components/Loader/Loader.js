import { connect } from 'react-redux'
import './loader.css'

import React from 'react'

const Loader = () => {
    return (
        <div className="loader">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

const mapStateToProps = () =>{
    return {
      
    }
}
  
const mapDispatchToProps = (dispatch) =>{
    return{

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Loader);
  