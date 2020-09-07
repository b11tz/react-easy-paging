import * as React from 'react'

const listPages = (
    pages: number,
    page: number,
    leftEdge: number,
    leftCurrent: number,
    rightCurrent: number,
    rightEdge: number
) => {
    let result = [];
    let last = 0;
    for (let num = 1; num < pages + 1; num++) {
        if (
            num <= leftEdge ||
            (num > page - leftCurrent - 1 && num < page + rightCurrent + 1) ||
            num > pages - rightEdge
        ) {
            if (last + 1 !== num) {
                result.push(false);
            }
            result.push(num);
            last = num;
        }
    }
    return result;
};

const Pagination: React.FC<{
    currentPage: number,
    maxPage: number,
    onPageClick: Function,
    textColor?: string,
    bgColor?: string,
}> = ({ currentPage, maxPage, onPageClick, textColor = "white", bgColor = "#33D" }) => {
    const styles = {
        root: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap" as const,
            width: "100%"
        },
        page: {
            padding: "8px",
            borderRadius: "4px",
            background: bgColor,
            color: textColor,
            opacity: 0.5,
            cursor: "pointer",
        },
        currentPage: {
            padding: "8px",
            borderRadius: "4px",
            background: bgColor,
            color: textColor,
        }
    }

    const pageList = listPages(maxPage, currentPage, 2, 2, 2, 2);
    const pagaListDom = pageList.map((page, index) => {
        const key = "page-" + index;
        if (page === false) {
            return <div key={key}>...</div>
        } else if (page === currentPage) {
            return <div style={styles.currentPage} key={key}>{page}</div>
        } else {
            return <div onClick={() => onPageClick(page)} style={styles.page} key={key}>{page}</div>
        }
    });
    return (
        <div style={styles.root}>
            {pagaListDom}
        </div>
    )
}

export default Pagination;