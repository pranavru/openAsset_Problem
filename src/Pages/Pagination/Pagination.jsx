import React, { useState, useEffect } from 'react'
import Styles from './Pagination.module.css';

function Pagination({ postsData, numberOfPosts, changeDisplayPostsOnPaginate }) {
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPages(Array.from({ length: Math.ceil((postsData.length ) / numberOfPosts) }, (_, i) => i + 1))
  }, [postsData.length, numberOfPosts])

  const handleCurrentPageChange = (stepChange) => {
    if (stepChange === "Previous" && currentPage > 1) {
      const prevPage = currentPage - 1
      setCurrentPage(prevPage);
      changeDisplayPostsOnPaginate(prevPage)

    } else if (stepChange === "Next" && currentPage < pages.length) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage);
      changeDisplayPostsOnPaginate(nextPage);
    } else if (typeof stepChange === 'number') {
      setCurrentPage(stepChange);
      changeDisplayPostsOnPaginate(stepChange);
    }
  }

  return (
    <div className={Styles.pageContainer}>
      <div className={Styles.endOfList}>
        {/* End of the List. Displaying: {numberOfPosts.length} */}
      </div>
      {pages
        ? (
          <div className={Styles.pages}>
            <button style={{ marginRight: "6px" }} onClick={() => handleCurrentPageChange("Previous")}>Previous</button>
            {pages.map((page) => (
              <div>
                <button onClick={() => handleCurrentPageChange(page)}> <span className={currentPage === page ? Styles.pageDiv : ""}>{page}</span></button>
              </div>
            ))}
            <button style={{ marginLeft: "6px" }} onClick={() => handleCurrentPageChange("Next")}>Next</button>
          </div>
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default Pagination;
