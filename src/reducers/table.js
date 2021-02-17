const initialState = {
  maxPages:0,
  curPage:0,
  selectedElementId: -1,
  searchValue:"",
  loaderActive:false,
  formErrorInput:false,
  columnFilterState:{
    id:'decrease',
    firstName:'decrease',
    lastName:'decrease',
    email:'decrease',
    phone:'decrease',
  },
  dataForm:{
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  },
  bufDataObj:{
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    address:{
      streetAddress:"",
      city:"",
      state:"",
      zip:""
    },
    description:''
  },
  data:[],
  filteredData:[],
  selectedElement:{}
};


export default function userState(state = initialState, action){
  
    if (action.type === 'CHANGE_SEARCH_INPUT'){
        state.searchValue = action.payload;
        return {
          ...state
        };
    }
    if (action.type === 'NULLIFY_SEARCH_DATA'){
      state.filteredData = [];
      return {
        ...state
      };
    }
    if (action.type === 'CHANGE_FILTERED_DATA'){
      state.filteredData = action.payload;
      return {
        ...state
      };
    }   
    if (action.type === 'SELECT_ELEMENT'){
        state.selectedElement = action.payload.item;
        state.selectedElementId = action.payload.id;
        return {
          ...state
        };
    }
    if (action.type === 'SET_TABLE_DATA'){
      state.data = action.payload;
      state.data = Object.assign([], state.data, [...state.data]);

      return {
        ...state
      };
    }
    if (action.type === 'LOADER_ACTIVATE'){
      state.loaderActive = true;
      return {
        ...state
      };
    }
    if (action.type === 'LOADER_DEACTIVATE'){
      state.loaderActive = false;
      return {
        ...state
      };
    }
    if (action.type === 'SET_MAX_PAGES'){
      const data = action.payload
      state.maxPages = Math.floor(state[data].length % 50 === 0 ? state[data].length / 50 - 1 : state[data].length / 50)
      return {
        ...state
      };
    }
    if (action.type === 'INCREMENT_PAGE'){
      state.curPage += 1;
      return {
        ...state
      };
    }
    if (action.type === 'DECREMENT_PAGE'){
      state.curPage -= 1;
      return {
        ...state
      };
    }
    if (action.type === 'NULLIFY_CURRENT_PAGE'){
      state.curPage = 0;
      return {
        ...state
      };
    }
    if (action.type === 'NULLIFY_SELECTED_ELEMENT'){
      state.selectedElementId = -1;
      state.selectedElement = {};
      return {
        ...state
      };
    }
    if (action.type === 'COLUMN_FILTER_STATE_TOGGLE'){
      const columnName = action.payload;
      const initalColumnState = state.columnFilterState[columnName]

      Object.keys(state.columnFilterState).map(function(objectKey) {
        return state.columnFilterState[objectKey] = 'decrease';
      });

      state.columnFilterState[columnName] = (initalColumnState === 'decrease' ? ('increase') : ('decrease'))
      return {
        ...state
      };
    }
    if (action.type === 'UPDATE_TABLE_DATA'){
      state.data = action.payload;
      state.data = Object.assign([], state.data, [...state.data]);

      return {
        ...state
      };
    }
    if (action.type === 'CHANGE_FORM_INPUT'){
      state.dataForm[action.payload.name] = action.payload.value;
      return {
        ...state
      };
    }
    if (action.type === 'FORM_ERROR_INPUT'){
      state.formErrorInput = true;
      return {
        ...state
      };
    }
    if (action.type === 'FORM_ERROR_INPUT_NULLIFY'){
      state.formErrorInput = false;
      return {
        ...state
      };
    }
    
    if (action.type === 'ADD_FORM_INPUT'){

      state.data.unshift(Object.assign(state.bufDataObj, state.dataForm));
      return {
        ...state
      };
    }
    
    return state;
}