import React from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props){
    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <Search onSearchFilms={props.onSearchFilms} handleShortFilms={props.handleShortFilms} page={props.page} />
            <MoviesCardList 
                isLoadingCards={props.isLoadingCards} 
                showCards={props.showCards} 
                foundCards={props.foundCards} 
                isNotFound={props.isNotFound} 
                handleMoreCards={props.handleMoreCards}
                handleSaveMovie={props.handleSaveMovie}
                handleDeleteMovie={props.handleDeleteMovie}
                savedMovies={props.savedMovies}
                isSavedPage={props.isSavedPage}
                page={props.page}
            />
            <Footer />
        </>
    );
}

export default Movies;
