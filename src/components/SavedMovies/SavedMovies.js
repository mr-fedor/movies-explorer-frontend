import React from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props){
    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <Search onSearchFilms={props.onSearchFilms} page={props.page} handleShortFilms={props.handleShortFilms} />
            <MoviesCardList 
                isLoadingCards={props.isLoadingCards}
                cards={props.cards}
                showCards={props.showCards} 
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

export default SavedMovies;
