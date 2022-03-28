import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from "./context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/EditBook/EditBook.module.css';
import { BsPencil } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import Button from  './UI/Button';
import UserFormField from './UI/BookFormField';
import Axios from "axios";
import SelectCategory from './UI/SelectCategory';

const EditBook = (props) => {
    const [selectedBook, setSelectedBook] = useState({
        bookName: '',
        bookAuthor: '',
        bookPrice: 0,
        bookCategory: ''
    })
    const { books, editBook } = useContext(GlobalContext);
    const history = useHistory();
    const currentBookId = props.match.params.id;

    useEffect(() => {
        const bookId = currentBookId;
        const selectedBook = books.find(book => book._id === bookId)
        setSelectedBook(selectedBook);
    }, [currentBookId, books])

    const updateFood = function (id) {
        const {bookName, bookAuthor, bookPrice, bookCategory} = selectedBook

        Axios.put("http://localhost:3004/update", {
            id: id,
            bookName: bookName,
            bookAuthor: bookAuthor,
            bookPrice: Number(bookPrice),
            bookCategory: bookCategory
        });
    };

    const onSubmit = function(e){

        editBook(selectedBook)
        history.push('/')
        updateFood(currentBookId)
    }

    const onBookNameChange = function(e){
        setSelectedBook({...selectedBook,[e.target.name]: e.target.value})
    }

    const onBookAuthorChange = function(e){
        setSelectedBook({...selectedBook,[e.target.name]: e.target.value})
    }

    const onBookPriceChange = function(e){
        setSelectedBook({...selectedBook,[e.target.name]: e.target.value})
    }

    const onBookCategoryChange = function(e){
        setSelectedBook({...selectedBook,[e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={onSubmit} className={styles.form}>
            <UserFormField
                label="Book Title"
                name="bookName"
                value={selectedBook.bookName}
                type="text"
                placeholder="enter book title"
                onChange={onBookNameChange}
            />

            <UserFormField
                label="Author"
                name="bookAuthor"
                value={selectedBook.bookAuthor}
                type="text"
                placeholder="enter book Author"
                onChange={onBookAuthorChange}

            />

            <UserFormField
                label="Price"
                name="bookPrice"
                value={selectedBook.bookPrice}
                type="number"
                placeholder="enter book price"
                onChange={onBookPriceChange}

            />
            <SelectCategory name="bookCategory" onChange={onBookCategoryChange} value={selectedBook.bookCategory}/>

            <div className={styles.buttons}>
                <Button type="submit" className={styles.edit_book}> <BsPencil/> Done</Button>
                <Link to="/" className={styles.link}> <GiCancel/> Cancel</Link>
            </div>
        </form>
    )
}

export default EditBook