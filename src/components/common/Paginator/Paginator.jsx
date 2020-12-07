import React from 'react';
import styles from './Paginator.module.css';

function Paginator({totalUsersCount, pageSize, currentPage, onPageChanged}) {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            {pages.map((item) => {
                return (
                    <button
                        key={item}
                        className={
                            currentPage === item
                                ? styles.selectedPage
                                : ''
                        }
                        onClick={() => {
                            onPageChanged(item);
                        }}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

export default Paginator;
