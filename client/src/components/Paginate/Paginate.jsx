import React from 'react'
import styles from './Paginate.module.css'
import prev from '../../assets/img/prev.png'
import next from '../../assets/img/next.png'

const Paginate = ({ actualPage, minPage, maxPage, dogs, dogsPerPage, pages }) => {  
    const pageNums = [];
    const indexPageNums = Math.ceil(dogs / dogsPerPage);
    for (let i = 1; i <= indexPageNums; i++) {
      pageNums.push(i);
    }
  
    const handlePrev = () => (actualPage-1) && pages(actualPage - 1)
    const handleNext = () => (actualPage !== pageNums.length) && pages(actualPage + 1)
  
    return (
      <nav>
        <div className={styles.pages}>
          <img src={prev} alt="Prev Pag" className= {actualPage === 1 ? `${styles.pageNumber} ${styles.page_disabled}` : styles.pageNumber} onClick={handlePrev} /> 
          {pageNums && pageNums.slice(minPage, maxPage).map((num) => (
            <li className={actualPage === num ? `${styles.pageNumber} ${styles.activePage}` : styles.pageNumber} key={num} onClick={() => pages(num)}>
              {num}
            </li>
          ))}
          <img src={next} alt="Prev Pag" className={actualPage === pageNums.length ? `${styles.pageNumber} ${styles.page_disabled}` : styles.pageNumber} onClick={handleNext}/>
        </div>
      </nav>
    );
  };
  
  export default Paginate;
