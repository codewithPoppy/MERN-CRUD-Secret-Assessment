export const AppReducer =  (state, action) => {

    switch (action.type) {
        case 'INITIAL_DATA':
            const data = []
            action.payload.forEach((app) => {
                data.unshift(app);
            })
            return {
                books: data
            }

        case 'REMOVE_BOOK':
            return {
                books: state.books.filter(book => {
                    return(
                        book._id !== action.payload
                    )
                })
            }
        case 'ADD_BOOK':
            return{
                books: [action.payload, ...state.books]
            }

        case 'EDIT_BOOK':
            const updateBook = action.payload;
            const updateBooks = state.books.map(book => {
                if(book._id === updateBook._id){
                    return updateBook; 
                }

                return book
            })
            return{
                books: updateBooks
            }
        default:
            return state
    }
}; 