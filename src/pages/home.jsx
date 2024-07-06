import React from 'react'
import { Header } from '../components/header';
import { BooksComponent } from '../components/books/books';

const Home = () => {
  return (
    <div className=''>
      <Header />
      <BooksComponent />
    </div>
  )
}

export default Home;