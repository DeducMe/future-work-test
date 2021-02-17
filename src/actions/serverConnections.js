const tableDataUrl =  'http://www.filltext.com'
const tableDataInitialOptions = '&id={number|1000}&firstName={firstName}&delay=1&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

function getDataFetchSucces(tableData){
    return{
        type:'SET_TABLE_DATA',
        payload:tableData
    }
}

export const getTableData = (rowsAmount) => (dispatch) => {
    return fetch(tableDataUrl + '/?rows=' + rowsAmount + tableDataInitialOptions,{
        method: 'GET',
        headers:{
        'Content-Type': 'application/json'
      }
    })  
    .then(response => response.json())
    .then(data => dispatch(getDataFetchSucces(data)))
}

