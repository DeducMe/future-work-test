import React, {useState, useEffect, Component} from 'react';
import TableRow from './TableRow'
import Loader from './../Loader/Loader'
import { connect } from 'react-redux'
import {getTableData} from '../../actions/serverConnections'
import {loaderActivate, loaderDeactivate, setMaxPages} from '../../actions/application'
import clearIcon from '../../img/close.svg'
import searchIcon from '../../img/search.svg'


class Table extends Component{
    getData = (rowsAmount) => {
      this.props.onCurPageNullify()
      this.props.onSelectedElementNullify()

      this.props.onGetTableData(rowsAmount)
    }

    searchValue = () =>{
      const final = this.props.tableData.filter((item)=>{
          console.log()
          return Object.values(item).includes(this.props.tableState.searchValue);
      })
      this.props.onChangeFilteredData(final)
    }

    changeSearchInput = (e) =>{
      this.props.onChangeSearchInput(e.target.value)
    }

    nullifySearchValue = () =>{
      this.props.onSearchDataNullify()
    }

    sortColumn = (columnName) => {
      let newData = this.props.tableData.slice()
      this.props.onColumnFilterStateToggle(columnName)
      this.props.onSelectedElementNullify()
      
      if (this.props.columnFilterState[columnName] === 'increase'){
        newData.sort((a, b) => {
          if (a[columnName] < b[columnName]) {
            return -1;
          }
          if (a[columnName] > b[columnName]) {
            return 1;
          }
          return 0;
        });
      }
      else{
        newData.sort((a, b) => {
          if (b[columnName] < a[columnName]) {
            return -1;
          }
          if (b[columnName] > a[columnName]) {
            return 1;
          }
          return 0;
        });
      }
      this.props.onUpdateTableData(newData)
    }

    getTableValues(){
      let maxItems = 50;
      const tableState = this.props.tableState;
      let final = [];
      let tableData = []

      if (this.props.tableState.filteredData.length !== 0){
        tableData = this.props.tableState.filteredData;
      }
      else{
        tableData = this.props.tableData;
      }

      
      if (tableData.length - tableState.curPage * maxItems < maxItems) maxItems = tableData.length - tableState.curPage * maxItems;

      for (let i = tableState.curPage * 50; i < tableState.curPage * 50 + maxItems; i++){
        final.push(<TableRow data = {tableData[i]} key = {i} index = {i}/>)
      }

      return final
    }

    render() {
        return (
          <div className="main-container">
            {Object.keys(this.props.tableData).length !== 0 ? (
              <table className="users-table">
              <caption>Таблица Пользователей</caption>
      
              <thead>
                <tr>
                  <th 
                    className={"th-id users-table__column-name " + this.props.columnFilterState.id || ''}
                    onClick={this.sortColumn.bind(this, 'id')}
                  >id</th>
                  <th
                    className={"th-firstName users-table__column-name " + this.props.columnFilterState.firstName || ''} 
                    onClick={this.sortColumn.bind(this, 'firstName')}
                  >firstName</th>
                  <th
                    className={"th-lastName users-table__column-name " + this.props.columnFilterState.lastName || ''}
                    onClick={this.sortColumn.bind(this, 'lastName')}
                  >lastName</th>
                  <th 
                    className={"th-email users-table__column-name " + this.props.columnFilterState.email || ''}
                    onClick={this.sortColumn.bind(this, 'email')}
                  >email</th>
                  <th
                    className={"th-phone users-table__column-name " + this.props.columnFilterState.phone || ''}
                    onClick={this.sortColumn.bind(this, 'phone')}
                  >phone</th>
                </tr>
              </thead>
      
              <tbody>
              {
                this.getTableValues()
              }
              </tbody>
              
            </table>
            
            ):('')}
            
          
          <div className="side-block">
            {Object.keys(this.props.tableData).length !== 0 ? (
              <div className="search-block">
                <input className="underline" type="text" onChange={this.changeSearchInput.bind(this)} value={this.props.tableState.searchValue}/>
                <button className="close-btn" onClick={this.nullifySearchValue}>
                  <span>Убрать фильтр</span>
                  <img src={clearIcon} alt=""/>
                </button>
                <button className="search-btn" onClick={this.searchValue}>
                  <span>Найти</span>
                  <img src={searchIcon} alt=""/>
                </button>
              </div>
            ):('')}
            {Object.keys(this.props.selectedElement).length !== 0 ? (
              <div className="user-block">
                Выбран пользователь <b className="user-block__user-name">{this.props.selectedElement['firstName'] + ' ' + this.props.selectedElement['lastName']}</b>
      
                <p>Описание:</p>
                <textarea className="user-block__description" value={this.props.selectedElement['description']} readOnly></textarea>
      
                <div className="address">
                  <p>Адрес проживания: <b className="user-block__address">{this.props.selectedElement['address']['streetAddress']}</b></p>
                  <p>Город: <b className="user-block__city"></b>{this.props.selectedElement['address']['city']}</p>
                  <p>Провинция/штат: <b className="user-block__state"></b>{this.props.selectedElement['address']['city']}</p>
                  <p>Индекс: <b className="user-block__zip"></b>{this.props.selectedElement['address']['zip']}</p>
                </div>
                
              </div>
            ):('')}
            
            
    
            <div className="change-page-block">
              <div className="change-page-block__controls">
                <button 
                  className="change-page-block__controls__button" 
                  onClick={this.props.onDecrementPage}
                  disabled={this.props.tableState.curPage > 0 ? (false):(true)}
                >{"<"}</button>
                <button
                  className="change-page-block__controls__button" 
                  onClick={this.props.onIncrementPage}
                  disabled={this.props.tableState.curPage < this.props.tableState.maxPages ? (false):(true)}
                >{">"}</button>
              </div>
              <span>{this.props.tableState.curPage}/{this.props.tableState.maxPages}</span>
            </div>
    
            <div className="data-choose">
              <div className="data-choose__buttons">
                <button className="data-choose__button" onClick={() => this.getData(32)}>Get small data</button>
                <button className="data-choose__button" onClick={() => this.getData(1000)}>Get big data</button>
                <button className="data-choose__button" onClick={() => this.getData(Math.floor(Math.random() * Math.floor(1000)))}>Get random data</button>
              </div>
            
            </div>
            {this.props.tableState.loaderActive ? (<Loader></Loader>):('')}

            {Object.keys(this.props.tableData).length !== 0 ? (

            <form className="table-form">
              <div className="input-field">
                <label className="input-field__label" htmlFor="idInput">id</label>
                <input className="input-field__input underline" id="idInput" name="idInput" type="num"/>
              </div>

              <div className="input-field">
                <label className="input-field__label" htmlFor="firstNameInput">firstName</label>
                <input className="input-field__input underline" id="firstNameInput" name="firstNameInput" type="text"/>
              </div>

              <div className="input-field">
                <label className="input-field__label" htmlFor="lastNameInput">lastName</label>
                <input className="input-field__input underline" id="lastNameInput" name="lastNameInput" type="text"/>
              </div>

              <div className="input-field">
                <label className="input-field__label" htmlFor="emailInput">email</label>
                <input className="input-field__input underline" id="emailInput" name="emailInput" type="email"/>
              </div>

              <div className="input-field">
                <label className="input-field__label" htmlFor="phoneInput">phone</label>
                <input className="input-field__input underline" id="phoneInput" name="phoneInput" type="phone"/>
              </div>

              <button type="submit" className="form-submit-btn">Добавить</button>
            </form>) : ('')}
          </div>
        </div>
        )
    }
}


const mapStateToProps = (state) =>{
  return {
    tableState:state.table,
    tableData:state.table.data,
    columnFilterState:state.table.columnFilterState,
    selectedElement:state.table.selectedElement
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onLoaderActivate: () => {
        dispatch({type : 'LOADER_ACTIVATE', payload:null})
    },
    onLoaderDeactivate: () => {
        dispatch({type : 'LOADER_DEACTIVATE', payload:null})
    },
    onGetTableData: (rowsAmount) => {
      dispatch(loaderActivate())
      dispatch(getTableData(rowsAmount))
      .then((response) => dispatch(setMaxPages()))
      .then((response) => dispatch(loaderDeactivate()))
    },
    onUpdateTableData: (data) => {
        dispatch({type : 'UPDATE_TABLE_DATA', payload:data})
    },
    onIncrementPage: () => {
        dispatch({type : 'INCREMENT_PAGE', payload:null})
    },
    onDecrementPage: () => {
        dispatch({type : 'DECREMENT_PAGE', payload:null})
    },
    onColumnFilterStateToggle: (columnName) => {
        dispatch({type : 'COLUMN_FILTER_STATE_TOGGLE', payload:columnName})
    },
    onSetMaxPages: () => {
      dispatch({type : 'SET_MAX_PAGES', payload:null})
    },
    onCurPageNullify: () => {
      dispatch({type : 'NULLIFY_CURRENT_PAGE', payload:null})
    },
    onSelectedElementNullify: () =>{
      dispatch({type : 'NULLIFY_SELECTED_ELEMENT', payload:null})
    },
    onChangeSearchInput: (value) =>{
      dispatch({type : 'CHANGE_SEARCH_INPUT', payload:value})
    },
    onSearchDataNullify: () =>{
      dispatch({type : 'NULLIFY_SEARCH_DATA', payload:null})
    },
    onChangeFilteredData: (value) => {
      dispatch({type : 'CHANGE_FILTERED_DATA', payload:value})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
