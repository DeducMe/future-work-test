import React from 'react'
import { connect } from 'react-redux'

function TableRow({data, index, selectedId, onSelectElement}) {
    
    function selectElement(item, e) {
        onSelectElement(item, index)
    }

    return (
        <tr className={"table-row " + (index === selectedId ? ('selected') : (''))}>
            {Object.keys(data).map((item, index) => {
                if (item !== 'address' && item !== 'description')
                    return <td className={"td-" + item} key={index} onClick={selectElement.bind(this, data)}>{data[item]}</td>
                return null
            })}  
        </tr>
    )
}

const mapStateToProps = (state, ownProps) =>{
    return {
        data: ownProps.data,
        rowIndex: ownProps.index,
        selectedId: state.table.selectedElementId
    }
}
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onSelectElement: (item, id)=>{
            dispatch({type : 'SELECT_ELEMENT', payload:{'item':item, 'id':id}})
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TableRow);

